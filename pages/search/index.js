import Head from "next/head";
import Layout from "/components/Layout";
import Link from "next/link";
import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import dynamic from 'next/dynamic';
import { locationData } from "/constants/locations";
import { getOptimizedMicroCMSImage, getJapaneseName } from "/libs/utils";

const classifyDepth = (depthValue) => {
    if (depthValue.includes('+')) {
        return 'depth5';
    }
    const numericMatch = depthValue.match(/(\d+\.?\d*)/);
    if (!numericMatch) {
        return null;
    }
    const depth = parseFloat(numericMatch[0]);
    // 数値で分類 ( + がない場合)
    if (depth >= 30 && depth <= 40) return 'depth4';
    if (depth > 40) return null;
    if (depth > 10) return 'depth3';
    if (depth > 1) return 'depth2';
    if (depth <= 1) return 'depth1';
    return null;
};

/**
 * data.info または data.thumbInfo から月、場所、水深を解析し、allRecords と locationMap を更新する
 */
const parseInfo = (info, speciesId, locationMap, allRecords) => {
    if (!info) return;

    // 月の抽出
    const dateMatch = info.match(/\d{4}\.(\d{1,2})\./);
    let monthKey = dateMatch ? parseInt(dateMatch[1], 10).toString() : null;

    // 場所の抽出
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
    if (dateMatch === null && location.length > 10) {
         location = null;
    }

    // 水深の抽出と分類
    const depthMatch = info.match(depthRegex);
    let depthRangeKey = null;
    if (depthMatch) {
        depthRangeKey = classifyDepth(depthMatch[1].trim());
    }

    // マップとレコードの更新 (場所)
    if (location && location.length > 1) {
        if (!locationMap[location]) {
            locationMap[location] = new Set();
        }
        locationMap[location].add(speciesId);

        allRecords.push({
            id: speciesId,
            loc: location.toLowerCase(),
            month: monthKey,
            depth: depthRangeKey
        });
    }
};

// SSG
export const getStaticProps = async () => {
    const { fetchAllPages } = await import("/libs/fetch_all_pages");
    const { client } = await import("/libs/client");

    console.log("Generating search data...");

    const allFishData = await fetchAllPages("uwphoto", {
        filters: `book[contains]魚`,
        fields: 'id,japaneseName,class,latinName,record,thumbInfo,thumbImg,isOversea'
    });

    const locationMap = {};
    const allRecords = [];

    allFishData.forEach(fish => {
        const speciesId = fish.id;

        if (fish.record) {
            fish.record.forEach(photo => {
                parseInfo(photo.info, speciesId, locationMap, allRecords);
            });
        }
        parseInfo(fish.thumbInfo, speciesId, locationMap, allRecords);
    });

    // locationMap のみ Set を Array に変換 (地図ピン用)
    const finalLocationMap = Object.entries(locationMap).reduce((acc, [loc, ids]) => {
        acc[loc] = Array.from(ids);
        return acc;
    }, {});

    // mapMarkers の生成
    const mapMarkers = Object.keys(finalLocationMap).map(locationName => {
        const latLng = locationData[locationName];
        const speciesIds = finalLocationMap[locationName];
        if (!latLng) {
            // 緯度経度データ(locations.js)に見つからなかった場所をログに出力
            // (locationName === "某所" など、意図的に除外するものは除く)
            if (locationName !== "某所") {
                console.warn(`[Location Mismatch] 緯度経度が見つかりません: "${locationName}" "${speciesIds}"`);
            }
            return null;
        }
        return {
            location: locationName,
            lat: latLng.lat,
            lng: latLng.lng,
            speciesCount: speciesIds.length,
            speciesIds: speciesIds,
        };
    }).filter(Boolean);

    return {
        props: {
            allRecords: allRecords,
            // locationMap: finalLocationMap,
            speciesLookup: allFishData.map(f => ({
                id: f.id,
                japaneseName: f.japaneseName,
                isOversea: f.isOversea,
                class: f.class,
                latinName: f.latinName,
                thumbImgUrl: f.thumbImg ? f.thumbImg.url : null
            })),
            mapMarkers: mapMarkers,
        },
        revalidate: 3600,
    };
};
// --- 動的インポート (クライアントサイドのみ) ---
const LocationMap = dynamic(
  () => import('/components/LocationMap'),
  {
    loading: () => <p>地図を読み込み中...</p>,
    ssr: false
  }
);

export default function LocationSearchPage({ allRecords, speciesLookup, mapMarkers }) {
    // --- パスワード認証 State ---
    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const [inputPassword, setInputPassword] = useState("");
    // const [error, setError] = useState("");
    // const CORRECT_PASSWORD = "genicanthus";

    // --- 検索フィルター State (複数選択対応) ---
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMonth, setSelectedMonth] = useState([]);
    const [selectedDepth, setSelectedDepth] = useState([]);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [isMapClick, setIsMapClick] = useState(false);

    // --- 認証チェック (SessionStorage) ---
    // useEffect(() => {
    //     // 認証チェックが通った後、保存されたフィルターを読み込む
    //     if (isAuthenticated) {
    //         const savedTerm = sessionStorage.getItem('searchTerm');
    //         const savedMonth = sessionStorage.getItem('selectedMonth');
    //         const savedDepth = sessionStorage.getItem('selectedDepth');

    //         if (savedTerm) {
    //             setSearchTerm(savedTerm);
    //         }
    //         if (savedMonth) {
    //             setSelectedMonth(JSON.parse(savedMonth)); // 配列はJSONとして保存されている
    //         }
    //         if (savedDepth) {
    //             setSelectedDepth(JSON.parse(savedDepth)); // 配列はJSONとして保存されている
    //         }
    //     }
    // }, [isAuthenticated]); // 認証が完了した時に一度だけ実行

    // useEffect(() => {
    //     if (isAuthenticated) {
    //         sessionStorage.setItem('searchTerm', searchTerm);
    //         sessionStorage.setItem('selectedMonth', JSON.stringify(selectedMonth));
    //         sessionStorage.setItem('selectedDepth', JSON.stringify(selectedDepth));
    //     }
    // }, [searchTerm, selectedMonth, selectedDepth, isAuthenticated]); // フィルター値が変わるたびに実行

    useEffect(() => {
        // (認証チェック削除) 無条件で復元を試みる
        const savedTerm = sessionStorage.getItem('searchTerm');
        const savedMonth = sessionStorage.getItem('selectedMonth');
        const savedDepth = sessionStorage.getItem('selectedDepth');

        if (savedTerm) {
            setSearchTerm(savedTerm);
        }
        if (savedMonth) {
            setSelectedMonth(JSON.parse(savedMonth));
        }
        if (savedDepth) {
            setSelectedDepth(JSON.parse(savedDepth));
        }
    }, []);

    useEffect(() => {
        // (認証チェック削除) 無条件で保存
        sessionStorage.setItem('searchTerm', searchTerm);
        sessionStorage.setItem('selectedMonth', JSON.stringify(selectedMonth));
        sessionStorage.setItem('selectedDepth', JSON.stringify(selectedDepth));
    }, [searchTerm, selectedMonth, selectedDepth]);

    // --- フィルター用データ ---
    const months = useMemo(() => Array.from({ length: 12 }, (_, i) => (i + 1).toString()), []);
    const depthRanges = [
        { key: 'depth1', label: '超浅場 (1m以浅)' },
        { key: 'depth2', label: '浅場 (1-10m)' },
        { key: 'depth3', label: '標準 (10-30m)' },
        { key: 'depth4', label: '深場 (30-40m+)' },
        { key: 'depth5', label: '超深場 (40m+以深)' },
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
        if (value === "All") {
            setState([]);
            return;
        }
        const currentIndex = state.indexOf(value);
        const newSelection = [...state];
        if (currentIndex === -1) {
            newSelection.push(value);
        } else {
            newSelection.splice(currentIndex, 1);
        }
        setState(newSelection);
    };

    // --- 検索ロジック (useMemo) - allRecords を使用 ---
    const searchResults = useMemo(() => {
        const isFilterApplied = searchTerm || selectedMonth.length > 0 || selectedDepth.length > 0;
        if (!isFilterApplied) return [];

        const lowerTerm = searchTerm.toLowerCase();

        const filteredRecords = allRecords.filter(record => {
            if (searchTerm && !record.loc.includes(lowerTerm)) {
                return false;
            }
            if (selectedMonth.length > 0 && !selectedMonth.includes(record.month)) {
                return false;
            }
            if (selectedDepth.length > 0 && !selectedDepth.includes(record.depth)) {
                return false;
            }
            return true;
        });

        const finalIds = new Set(filteredRecords.map(record => record.id));

        const results = Array.from(finalIds)
            .map(id => speciesMap[id])
            .filter(Boolean);

        return results.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName, "ja"));

    }, [searchTerm, selectedMonth, selectedDepth, allRecords, speciesMap]);

    // --- マップの動的フィルタリング (useMemo) - allRecords を使用 ---
    const filteredMapMarkers = useMemo(() => {
        const isDateDepthFilterApplied = selectedMonth.length > 0 || selectedDepth.length > 0;
        const dynamicLocationMap = {};
        const lowerTerm = searchTerm.toLowerCase();

        allRecords.forEach(record => {
            if (selectedMonth.length > 0 && !selectedMonth.includes(record.month)) {
                return;
            }
            if (selectedDepth.length > 0 && !selectedDepth.includes(record.depth)) {
                return;
            }

            if (record.loc) {
                if (!dynamicLocationMap[record.loc]) {
                    dynamicLocationMap[record.loc] = new Set();
                }
                dynamicLocationMap[record.loc].add(record.id);
            }
        });

        const newMapMarkers = [];
        for (const marker of mapMarkers) {
             const locationNameLower = marker.location.toLowerCase();

             let speciesCount = marker.speciesCount;
             let speciesIds = marker.speciesIds;

             if (isDateDepthFilterApplied) {
                 if (dynamicLocationMap[locationNameLower]) {
                     const ids = Array.from(dynamicLocationMap[locationNameLower]);
                     speciesCount = ids.length;
                     speciesIds = ids;
                 } else {
                     continue;
                 }
             }
             const isMatch = !searchTerm || locationNameLower.includes(lowerTerm);

             newMapMarkers.push({
                ...marker,
                speciesCount: speciesCount,
                speciesIds: speciesIds,
                isDimmed: !isMatch
            });
        }
        return newMapMarkers;

    }, [searchTerm, selectedMonth, selectedDepth, allRecords, mapMarkers]);

    const mapKey = useMemo(() => {
        return "map-view";
    }, []);

    const defaultCenter = [35.6809591, 139.7673068]; // 日本の中心（初期値）
    const defaultZoom = 4;

    const mapConfig = useMemo(() => {
        if (searchTerm && locationData[searchTerm]) {
            return {
                center: [locationData[searchTerm].lat, locationData[searchTerm].lng],
                zoom: isMapClick ? null : 13
            };
        }
        if (isMapClick) {
            return { center: null, zoom: null };
        }
        return {
            center: defaultCenter,
            zoom: defaultZoom
        };
    }, [searchTerm, isMapClick]);

    // --- イベントハンドラ ---
    const handleMarkerClick = (locationName) => {
        setIsMapClick(true);
        if (searchTerm === locationName) {
            setSearchTerm("");
        } else {
            setSearchTerm(locationName);
        }
    };

    // const handlePasswordSubmit = (e) => {
    //     e.preventDefault();
    //     if (inputPassword === CORRECT_PASSWORD) {
    //         setIsAuthenticated(true);
    //         sessionStorage.setItem("search-auth", "true");
    //         setError("");
    //     } else {
    //         setError("パスワードが違います。");
    //     }
    // };


    // --- パスワード認証前の表示 ---
    // if (!isAuthenticated) {
    //     return (
    //         <Layout title="認証 | 僕らむの魚図鑑" description="アクセスが制限されています" url="https://www.my-divingram.com/search" imageUrl="https://www.my-divingram.com/img/logo/favicon_small.jpg">
    //             <Head>
    //                 <meta name="robots" content="noindex" />
    //             </Head>
    //             <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-sky-100">
    //                 <form
    //                     onSubmit={handlePasswordSubmit}
    //                     className="p-8 bg-white rounded-lg shadow-xl"
    //                 >
    //                     <h1 className="text-lg font-bold text-gray-700 mb-4">パスワードを入力してください</h1>
    //                     <input
    //                         type="password"
    //                         value={inputPassword}
    //                         onChange={(e) => setInputPassword(e.target.value)}
    //                         className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
    //                     />
    //                     {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    //                     <button
    //                         type="submit"
    //                         className="w-full mt-4 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
    //                     >
    //                         認証
    //                     </button>
    //                 </form>
    //             </div>
    //         </Layout>
    //     );
    // }

    // --- 認証後の通常のページ表示 ---
    return (
        <Layout title="Map | 僕らむの魚図鑑" description="撮影場所・水深から魚種を検索できます" url="https://www.my-divingram.com/search" imageUrl="https://www.my-divingram.com/img/logo/favicon_small.jpg">

            <Head>
                <meta name="robots" content="noindex" />
            </Head>

            <div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans min-h-screen">
                <h1 className="pt-10 pb-5 text-xl md:text-2xl text-center text-sky-800 font-black">データベースから検索</h1>

                <div className="max-w-xl mx-auto md:max-w-5xl mb-10 p-5 bg-white rounded-lg shadow-xl md:grid md:grid-cols-3 md:gap-8">
                    {/* --- 左カラム (ポイント + 地図) --- */}
                    <div className="md:col-span-2 flex flex-col">

                        {/* ポイント (場所名) */}
                        <div className="mb-6">
                            <label htmlFor="location-search" className="block text-sm font-medium text-gray-700 mb-2">ポイント</label>
                            <div className="relative">
                                <input
                                    id="location-search"
                                    type="text"
                                    placeholder="ポイント名を入力 または マップから選択"
                                    className="w-full p-3 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setIsMapClick(false);
                                        setSearchTerm(e.target.value);
                                    }}
                                />

                                {/* 入力がある時だけ ×ボタン を表示 */}
                                {searchTerm && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsMapClick(false);
                                            setSearchTerm("");
                                        }}
                                        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* 地図 */}
                        <div className="mb-6 md:mb-0 shadow-lg rounded-lg overflow-hidden">
                            <LocationMap
                                key={mapKey}
                                markers={filteredMapMarkers}
                                onMarkerClick={handleMarkerClick}
                                center={mapConfig.center}
                                zoom={mapConfig.zoom}
                            />
                        </div>
                    </div>

                    {/* --- 右カラム (月 + 水深) --- */}
                    <div className="flex flex-col">
                        <button
                            type="button"
                            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                            className="md:hidden w-full p-3 mb-4 text-sm font-medium text-gray-600 rounded-lg flex justify-start items-center hover:bg-gray-100 transition-colors"
                        >
                            <svg
                                className={`w-5 h-5 transition-transform ${isMobileFilterOpen ? 'rotate-180' : ''}`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            <span className="ml-2">撮影月 または 水深 でフィルタリング</span>
                        </button>

                        {/* フィルターのラッパー (折りたたみ対応) */}
                        <div className={`${isMobileFilterOpen ? 'block' : 'hidden'} md:block`}>
                            {/* 撮影月 (複数選択) */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">撮影月</label>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        type="button"
                                        onClick={() => handleFilterToggle("All", selectedMonth, setSelectedMonth)}
                                        className={`px-3 py-2 text-sm font-medium rounded-full shadow-sm ${
                                            selectedMonth.length === 0
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
                                                selectedMonth.includes(m)
                                                    ? 'bg-sky-600 text-white'
                                                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                            }`}
                                        >
                                            {m}月
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* 水深 (複数選択) */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">水深</label>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        type="button"
                                        onClick={() => handleFilterToggle("All", selectedDepth, setSelectedDepth)}
                                        className={`px-4 py-2 text-sm font-medium rounded-full shadow-sm ${
                                            selectedDepth.length === 0
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
                                                selectedDepth.includes(range.key)
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
                    </div>
                </div>

                {/* 検索結果 (サムネイル付き) */}
                {(searchTerm || selectedMonth.length > 0 || selectedDepth.length > 0) && (
                    <div className="pt-2">
                        <h2 className="pb-2 text-lg font-bold text-gray-700 mb-4 text-center">
                            検索結果: {searchResults.length}種
                        </h2>

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
                                                    alt={fish.japaneseName}
                                                    width={300}
                                                    height={200}
                                                    style={{objectFit:"contain"}}
                                                    unoptimized
                                                />
                                            ) : (
                                                <div
                                                    className="bg-gray-200 rounded"
                                                    style={{width: '300px', height: '200px'}}
                                                ></div>
                                            )}
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