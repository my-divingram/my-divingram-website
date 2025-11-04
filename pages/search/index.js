import Head from "next/head";
import { fetchAllPages } from "/libs/fetch_all_pages";
import { client } from "/libs/client";
import Layout from "/components/Layout";
import Link from "next/link";
import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import dynamic from 'next/dynamic';
import { locationData } from "/constants/locations";
import { getOptimizedMicroCMSImage, getJapaneseName } from "/libs/utils";

// --- ↓↓↓ データ解析ヘルパー関数 (getStaticProps 外に定義) ↓↓↓ ---

/**
 * 水深の数値から5段階の分類キーを返す
 * @param {string} depthValue - 水深の値 (例: "-10m", "40m+", "0.5m")
 * @returns {string|null} - 分類キー (例: "0-1m", "40m+", null)
 */
const classifyDepth = (depthValue) => {
    // 1. 数値部分を正確に抽出 (先頭の符号 '-' を無視)
    const numericMatch = depthValue.match(/(\d+\.?\d*)/);
    if (!numericMatch) {
        if (depthValue.toLowerCase().includes('40m+')) {
            return '40m+';
        }
        return null;
    }
    
    const depth = parseFloat(numericMatch[0]); 
    
    // 3. 超深場 (40m+) の判定を最優先
    if (depthValue.includes('+') || depth > 40) {
        return '40m+';
    }
    
    // 4. 5段階の分類
    if (depth <= 1) return '0-1m';
    if (depth <= 10) return '1.1-10m';
    if (depth <= 29) return '11-29m';
    if (depth <= 40) return '30-40m';
    
    return null;
};


/**
 * data.info または data.thumbInfo から月、場所、水深を解析し、マップを更新する
 */

// --- ↑↑↑ データ解析ヘルパー関数 (ここまで) ↑↑↑ ---


// --- ↓↓↓ SSG (getStaticProps) ↓↓↓ ---
export const getStaticProps = async () => {
    console.log("Generating depth search data...");

    const allFishData = await fetchAllPages("uwphoto", {
        filters: `book[contains]魚`, 
        fields: 'id,japaneseName,class,latinName,record,thumbInfo,thumbImg,isOversea' 
    });

    const allRecords = [];
    const locationMap = {}; // (これは地図ピン用に残す)

    const parseInfo = (info, speciesId, locationMap, allRecords) => {
        if (!info) return;

        // (ロジックを簡略化するため、parseInfo の中身をここに展開)
        const dateMatch = info.match(/\d{4}\.(\d{1,2})\./); 
        let monthKey = dateMatch ? parseInt(dateMatch[1], 10).toString() : null;

        const dateEndIndex = info.indexOf('. ') + 2; 
        let locationPart = dateEndIndex > 1 ? info.substring(dateEndIndex).trim() : info.trim();
        const depthRegex = /\s(-?\d+\.?\d*m\+*)$/i;
        let location = locationPart.replace(depthRegex, '').trim();
        const bracketMatch = info.match(/\((.*?)\)/);
        if (bracketMatch && bracketMatch[1].trim()) {
            location = bracketMatch[1].trim();
        } else {
            const dateRegex = /^\d{4}\.\d{1,2}\.\s?/;
            location = location.replace(dateRegex, '').trim();
            location = location.split(/\s/)[0] || location;
        }
        if (dateMatch === null && location.length > 10) { location = null; }

        const depthMatch = info.match(depthRegex);
        let depthRangeKey = null;
        if (depthMatch) {
            depthRangeKey = classifyDepth(depthMatch[1].trim());
        }

        // 抽出したデータを allRecords にプッシュ
        if (location && location.length > 1) {
            allRecords.push({
                id: speciesId,
                loc: location.toLowerCase(), // 検索用に小文字化
                month: monthKey,
                depth: depthRangeKey
            });
            
            // 地図ピン用の locationMap も作成
            if (!locationMap[location]) {
                locationMap[location] = new Set();
            }
            locationMap[location].add(speciesId);
        }
    };


    allFishData.forEach(fish => {
        const speciesId = fish.id;

        if (fish.record) {
            fish.record.forEach(photo => {
                parseInfo(photo.info, speciesId, locationMap, allRecords); 
            });
        }
        
        parseInfo(fish.thumbInfo, speciesId, locationMap, allRecords); 
    });

    const finalLocationMap = Object.entries(locationMap).reduce((acc, [loc, ids]) => {
        acc[loc] = Array.from(ids);
        return acc;
    }, {});

    const mapMarkers = Object.keys(finalLocationMap).map(locationName => {
        const latLng = locationData[locationName];
        if (!latLng) {
            return null;
        }

        const speciesIds = finalLocationMap[locationName]; // 種IDの配列を取得

        return {
            location: locationName,
            lat: latLng.lat,
            lng: latLng.lng,
            speciesCount: speciesIds.length, // ポップアップ用（重複ありの総数）
            speciesIds: speciesIds,       // クラスター計算用（重複なし計算用）
        };
    }).filter(Boolean); // null を除外


    // 最終更新日の取得
    const data_fish = await client.get({ endpoint: "uwphoto", queries: { filters: `book[contains]魚`, orders: `-updatedAt`, limit: 1}});


    return {
        props: {
            allRecords: allRecords,
            locationMap: finalLocationMap,
            speciesLookup: allFishData.map(f => ({ 
                id: f.id, 
                japaneseName: f.japaneseName, 
                class: f.class, 
                latinName: f.latinName,
                thumbImgUrl: f.thumbImg ? f.thumbImg.url : null,
                isOversea: f.isOversea // <-- この行を追加
            })),
            data_fish: data_fish.contents,
            mapMarkers: mapMarkers,
        },
        revalidate: 3600,
    };
};
// --- ↑↑↑ SSG (getStaticProps) ↑↑↑ ---

// --- ↓↓↓ 動的インポート (クライアントサイドのみ) ↓↓↓ ---
const LocationMap = dynamic(
  () => import('/components/LocationMap'),
  { 
    loading: () => <p>地図を読み込み中...</p>,
    ssr: false
  }
);

const SearchDashboard = dynamic(
  () => import('/components/SearchDashboard'),
  { 
    loading: () => <p>グラフを読み込み中...</p>,
    ssr: false
  }
);
// --- ↑↑↑ 動的インポート (ここまで) ↑↑↑ ---


// --- ↓↓↓ Reactコンポーネント (LocationSearchPage) ↓↓↓ ---
export default function LocationSearchPage({ allRecords, locationMap, speciesLookup, data_fish, mapMarkers }) {

    // --- パスワード認証 State ---
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [inputPassword, setInputPassword] = useState("");
    const [error, setError] = useState("");
    
    const CORRECT_PASSWORD = "genicanthus"; 
    
    // --- 検索フィルター State (複数選択対応) ---
    const [searchTerm, setSearchTerm] = useState("");
    // 修正: selectedMonth を配列に変更
    const [selectedMonth, setSelectedMonth] = useState([]); 
    // 修正: selectedDepth を配列に変更
    const [selectedDepth, setSelectedDepth] = useState([]); 

    // --- 認証チェック (SessionStorage) ---
    useEffect(() => {
        if (sessionStorage.getItem("search-auth") === "true") {
            setIsAuthenticated(true);
        }
    }, []);

    // --- フィルター用データ ---
    const months = useMemo(() => Array.from({ length: 12 }, (_, i) => (i + 1).toString()), []); 
    const depthRanges = [
        { key: '0-1m', label: '超浅場 (1m以浅)' },
        { key: '1.1-10m', label: '浅場 (1-10m)' },
        { key: '11-29m', label: '普通 (10-30m)' },
        { key: '30-40m', label: '深場 (30-40m)' },
        { key: '40m+', label: '超深場 (40m以深)' },
    ];

    // --- 種IDと種名のマッピング (高速化用) ---
    const speciesMap = useMemo(() => {
        return speciesLookup.reduce((acc, species) => {
            acc[species.id] = species;
            return acc;
        }, {});
    }, [speciesLookup]);

    // --- 複数選択フィルター用のヘルパー関数 ---
    const handleFilterToggle = (value, state, setState) => {
        // "All" が押されたらリセット
        if (value === "All") {
            setState([]);
            return;
        }
        
        const currentIndex = state.indexOf(value);
        const newSelection = [...state];

        if (currentIndex === -1) {
            newSelection.push(value); // なければ追加
        } else {
            newSelection.splice(currentIndex, 1); // あれば削除
        }
        setState(newSelection);
    };


    const searchResults = useMemo(() => {
        const isFilterApplied = searchTerm || selectedMonth.length > 0 || selectedDepth.length > 0;
        if (!isFilterApplied) return []; 

        const lowerTerm = searchTerm.toLowerCase();

        // 1. 全レコード (10,000+件) をフィルタリング
        const filteredRecords = allRecords.filter(record => {
            // A. ポイント (場所) フィルター
            if (searchTerm && !record.loc.includes(lowerTerm)) {
                return false;
            }
            // B. 月フィルター (複数選択対応)
            if (selectedMonth.length > 0 && !selectedMonth.includes(record.month)) {
                return false;
            }
            // C. 水深フィルター (複数選択対応)
            if (selectedDepth.length > 0 && !selectedDepth.includes(record.depth)) {
                return false;
            }
            // 全てのAND条件を通過
            return true;
        });

        // 2. フィルタリングされたレコードから、重複を除いた「種ID」を取得
        const finalIds = new Set(filteredRecords.map(record => record.id));

        // 3. 種IDをspeciesMapを使って完全な種情報に変換
        const results = Array.from(finalIds)
            .map(id => speciesMap[id])
            .filter(Boolean); 

        return results.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName, "ja"));

    }, [searchTerm, selectedMonth, selectedDepth, allRecords, speciesMap]);

    // --- ★ マップの動的フィルタリング (ご要望3) ---
    const filteredMapMarkers = useMemo(() => {
        const isFilterApplied = searchTerm || selectedMonth.length > 0 || selectedDepth.length > 0;
        
        // フィルターがなければ、元の全マーカーを返す
        if (!isFilterApplied) {
            return mapMarkers;
        }

        const dynamicLocationMap = {};
        const lowerTerm = searchTerm.toLowerCase();

        allRecords.forEach(record => {
            // フィルター条件に合致するかチェック
            if (searchTerm && !record.loc.includes(lowerTerm)) {
                return;
            }
            if (selectedMonth.length > 0 && !selectedMonth.includes(record.month)) {
                return;
            }
            if (selectedDepth.length > 0 && !selectedDepth.includes(record.depth)) {
                return;
            }

            // 条件を通過したら、場所ごとのSetに追加
            if (record.loc) {
                if (!dynamicLocationMap[record.loc]) {
                    dynamicLocationMap[record.loc] = new Set();
                }
                dynamicLocationMap[record.loc].add(record.id);
            }
        });

        // マーカーを生成
        const newMapMarkers = [];
        for (const marker of mapMarkers) {
             const locationNameLower = marker.location.toLowerCase();
             
             if (dynamicLocationMap[locationNameLower]) {
                 const speciesIds = Array.from(dynamicLocationMap[locationNameLower]);
                 newMapMarkers.push({
                    ...marker,
                    speciesCount: speciesIds.length,
                    speciesIds: speciesIds,
                });
             }
             // フィルター適用時、0件の場所は newMapMarkers に追加しない
        }
        return newMapMarkers;

    }, [searchTerm, selectedMonth, selectedDepth, allRecords, mapMarkers]);

    const mapKey = useMemo(() => {
        // フィルター条件が変わるたびに、異なるキー (ランダムな文字列) を生成
        return searchTerm + selectedMonth.join(',') + selectedDepth.join(',') + Math.random();
    }, [searchTerm, selectedMonth, selectedDepth]);

    // --- イベントハンドラ ---
    const handleMarkerClick = (locationName) => {
        // 1. クリックされた場所が、既に「ポイント」欄に入力されているか確認
        if (searchTerm === locationName) {
            // 2. 一致する場合：フィルターをリセット（トグルオフ）
            setSearchTerm("");
        } else {
            // 3. 一致しない場合：新しくフィルターを設定（トグルオン）
            setSearchTerm(locationName);
        }
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (inputPassword === CORRECT_PASSWORD) {
            setIsAuthenticated(true);
            sessionStorage.setItem("search-auth", "true");
            setError("");
        } else {
            setError("パスワードが違います。");
        }
    };


    // --- 1. パスワード認証前の表示 ---
    if (!isAuthenticated) {
        return (
            <Layout title="認証 | 僕らむの魚図鑑" description="アクセスが制限されています" url="https://www.my-divingram.com/search" imageUrl="https://www.my-divingram.com/img/logo/favicon_small.jpg">
                <Head>
                    <meta name="robots" content="noindex" />
                </Head>
                <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-sky-100">
                    <form 
                        onSubmit={handlePasswordSubmit} 
                        className="p-8 bg-white rounded-lg shadow-xl"
                    >
                        <h1 className="text-lg font-bold text-gray-700 mb-4">パスワードを入力してください</h1>
                        <input
                            type="password"
                            value={inputPassword}
                            onChange={(e) => setInputPassword(e.target.value)}
                            className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        <button 
                            type="submit" 
                            className="w-full mt-4 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
                        >
                            認証
                        </button>
                    </form>
                </div>
            </Layout>
        );
    }

    // --- 2. 認証後の通常のページ表示 ---
    return (
        <Layout title="SEARCH | 僕らむの魚図鑑" description="撮影場所・水深から魚種を検索できます" url="https://www.my-divingram.com/search" imageUrl="https://www.my-divingram.com/img/logo/favicon_small.jpg">

            <Head>
                <meta name="robots" content="noindex" />
            </Head>

            <div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans min-h-screen">
                <h1 className="pt-10 pb-8 text-xl md:text-2xl text-center text-sky-800 font-black">データベース</h1>

                {/* グラフ */}
                {/* <SearchDashboard 
                    locationMap={locationMap}
                    monthMap={monthMap}
                    depthMap={depthMap}
                    depthRanges={depthRanges}
                /> */}


                {/* --- フィルターUI (順序変更、複数選択対応) --- */}
                <div className="max-w-xl mx-auto mb-10 p-5 bg-white rounded-lg shadow-xl">
                    
                    {/* 1. ポイント (場所名) */}
                    <div className="mb-6">
                        <label htmlFor="location-search" className="block text-sm font-medium text-gray-700 mb-2">ポイント</label>
                        <input
                            id="location-search"
                            type="search"
                            placeholder="ポイント名を入力 または 地図から選択"
                            className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    {/* 2. 撮影月 (複数選択) */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">撮影月</label>
                        <div className="flex flex-wrap gap-2">
                            <button
                                type="button"
                                onClick={() => handleFilterToggle("All", selectedMonth, setSelectedMonth)}
                                className={`px-3 py-2 text-sm font-medium rounded-full shadow-sm ${
                                    selectedMonth.length === 0 // 選択がなければ "All" がアクティブ
                                        ? 'bg-sky-600 text-white'
                                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                All
                            </button>
                            {months.map(m => (
                                <button
                                    key={m}
                                    type="button"
                                    onClick={() => handleFilterToggle(m, selectedMonth, setSelectedMonth)}
                                    className={`px-3 py-2 text-sm font-medium rounded-full shadow-sm ${
                                        selectedMonth.includes(m) // 配列に含まれていればアクティブ
                                            ? 'bg-sky-600 text-white'
                                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                    }`}
                                >
                                    {m}月
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 3. 水深 (複数選択) */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">水深</label>
                        <div className="flex flex-wrap gap-2">
                            <button
                                type="button"
                                onClick={() => handleFilterToggle("All", selectedDepth, setSelectedDepth)}
                                className={`px-4 py-2 text-sm font-medium rounded-full shadow-sm ${
                                    selectedDepth.length === 0 // 選択がなければ "All" がアクティブ
                                        ? 'bg-sky-600 text-white'
                                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                All
                            </button>
                            {depthRanges.map(range => (
                                <button
                                    key={range.key}
                                    type="button"
                                    onClick={() => handleFilterToggle(range.key, selectedDepth, setSelectedDepth)}
                                    className={`px-4 py-2 text-sm font-medium rounded-full shadow-sm ${
                                        selectedDepth.includes(range.key) // 配列に含まれていればアクティブ
                                            ? 'bg-sky-600 text-white'
                                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                    }`}
                                >
                                    {range.label}
                                </button>
                            ))}
                        </div>
                    </div>

                </div>

                {/* 地図 */}
                <div className="max-w-4xl mx-auto mb-10 shadow-lg rounded-lg overflow-hidden">
                    <LocationMap
                        key={mapKey} 
                        markers={filteredMapMarkers} // ★ 修正: mapMarkers -> filteredMapMarkers
                        onMarkerClick={handleMarkerClick} 
                    />
                </div>

                {/* 検索結果 (サムネイル付き) */}
                {(searchTerm || selectedMonth.length > 0 || selectedDepth.length > 0) && (
                <div className="pt-5">
                    <h2 className="text-lg font-bold text-gray-700 mb-4 text-center">
                        検索結果: {searchResults.length}種
                    </h2>
                    
                    {/* [kana].js と同じグリッドレイアウトに変更 */}
                    <div className="flex flex-wrap justify-center">
                        {searchResults.length > 0 ? (
                            searchResults.map(fish => (
                                <div key={fish.id} className="px-3 w-1/3 md:w-1/6 hover:opacity-80">
                                    <Link 
                                        href={`/fish/${fish.class}/${fish.latinName}`.replace(" ", "_")}
                                    >
                                        {fish.thumbImgUrl ? (
                                            <Image
                                                src={getOptimizedMicroCMSImage(fish.thumbImgUrl, 300)}
                                                alt={fish.name}
                                                width={300} // [kana].js に倣う
                                                height={200} // [kana].js に倣う
                                                style={{objectFit:"contain"}} // [kana].js に倣う
                                                unoptimized
                                            />
                                        ) : (
                                            // 画像がない場合は 300x200 のプレースホルダー
                                            <div 
                                                className="bg-gray-200 rounded" 
                                                style={{width: '300px', height: '200px'}}
                                            ></div> 
                                        )}
                                        {/* getJapaneseName を使って * を表示 */}
                                        <h2 className="py-3 mb-2 text-xs md:text-base text-center text-gray-700 font-medium">
                                            {getJapaneseName(fish)}
                                        </h2>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p className="p-4 text-center text-sm text-gray-500">該当する魚種は見つかりませんでした。</p>
                        )}
                    </div>
                </div>
            )}
            </div>
        </Layout>
    );
}