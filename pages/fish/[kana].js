import Link from "next/link";
import Image from "next/image";
import { client } from "/libs/client";
import Layout from "/components/Layout";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import { useState, useMemo } from "react";

/**
 * microCMSから全ページのデータを取得する（汎用版）
 * @param {string} endpoint - エンドポイント名
 * @param {object} baseQueries - 基本となるクエリ（fields, filtersなど）
 */
const fetchAllPages = async (endpoint, baseQueries = {}) => {
    const limit = 100; // 1リクエストの最大件数
    let allContents = [];

    // 1. 最初のページを取得
    const firstQueries = { ...baseQueries, limit: limit, offset: 0 };
    const firstResponse = await client.get({
        endpoint: endpoint,
        queries: firstQueries
    });

    allContents = firstResponse.contents;
    const totalCount = firstResponse.totalCount;

    // 2. 2ページ目以降を取得
    if (totalCount > limit) {
        const remainingRequests = [];
        for (let offset = limit; offset < totalCount; offset += limit) {
            const queries = { ...baseQueries, limit: limit, offset: offset };
            remainingRequests.push(
                client.get({ endpoint: endpoint, queries: queries })
            );
        }

        // 3. 残りのリクエストを並列で実行
        const additionalResponses = await Promise.all(remainingRequests);
        additionalResponses.forEach(response => {
            allContents.push(...response.contents);
        });
    }

    return allContents;
};

// --- SSG (getStaticProps) ---
export const getStaticProps = async (context) => {
    const kana = context.params.kana;

    const kana50 = {
        "ア": ["ア", "イ", "ウ", "エ", "オ", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
        "カ": ["カ", "キ", "ク", "ケ", "コ", "ガ", "ギ", "グ", "ゲ", "ゴ", "-", "-", "-", "-", "-"],
        "サ": ["サ", "シ", "ス", "セ", "ソ", "ザ", "ジ", "ズ", "ゼ", "ゾ", "-", "-", "-", "-", "-"],
        "タ": ["タ", "チ", "ツ", "テ", "ト", "ダ", "ヂ", "ヅ", "デ", "ド", "-", "-", "-", "-", "-"],
        "ナ": ["ナ", "ニ", "ヌ", "ネ", "ノ", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
        "ハ": ["ハ", "ヒ", "フ", "ヘ", "ホ", "バ", "ビ", "ブ", "ベ", "ボ", "パ", "ピ", "プ", "ペ", "ポ"],
        "マ": ["マ", "ミ", "ム", "メ", "モ", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
        "ヤ": ["ヤ", "-", "ユ", "-", "ヨ", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
        "ラ": ["ラ", "リ", "ル", "レ", "ロ", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
        "ワ": ["ワ", "-", "ヲ", "-", "ン", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
    };

    // 1. 「-」を除外した、その行のカナ文字リストを作成 (例: ["カ", "キ", ..., "ゴ"])
    const charsInRow = kana50[kana].filter(char => char !== "-");

    // 2. microCMS用の [or] フィルター文字列を生成
    // (例: "japaneseName[begins_with]カ[or]japaneseName[begins_with]キ[or]...")
    const kanaFilters = charsInRow
        .map(char => `japaneseName[begins_with]${char}`)
        .join("[or]");

    const shuffleArray = (array) => {
        const cloneArray = [...array];
        for (let i = cloneArray.length - 1; 0 <= i; i--) {
            let randomNum = Math.floor(Math.random() * (i + 1));
            let tmpStorage = cloneArray[i];
            cloneArray[i] = cloneArray[randomNum];
            cloneArray[randomNum] = tmpStorage;
        }
        return cloneArray;
    };

    // 3. カナデータ取得と、その他のデータ取得を並列で実行
    const [
        allKanaData, // 新しい関数でカナデータを全て取得
        data_fish,
        data_fish_ja,
        data_fish_freshwater,
        data_fish_slider,
        allFishList
    ] = await Promise.all([
        fetchAllPages("uwphoto", { filters: kanaFilters }),

        client.get({ endpoint: "uwphoto", queries: { filters: `book[contains]魚`, orders: `-updatedAt`, limit: 1}}),
        client.get({ endpoint: "uwphoto", queries: { filters: `book[contains]魚[and]isOversea[equals]false`, orders: `-updatedAt`, limit: 1}}),
        client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]freshwaterfish` , limit: 1 }}),
        client.get({ endpoint: "uwphoto", queries: { filters: `book[contains]魚[and]isSpotlight[equals]true`, orders: `-updatedAt`, limit: 40}}),

        // ★全魚リストを取得（魚図鑑データのみ、かつ必要最小限のフィールド）
        fetchAllPages("uwphoto", {
            filters: `book[contains]魚`,
            fields: 'id,japaneseName,class,latinName,isOversea'
        })
    ]);

    // 4. すべて取得した後に、一度だけソートを実行
    const sortedKanaData = allKanaData.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName, "ja"));

    return {
        props: {
            kana: kana,
            // --- 15個のpropsを1個に集約 ---
            kanaData: sortedKanaData,

            // --- 他のデータ ---
            data_fish: data_fish.contents,
            data_fish_slider: shuffleArray(data_fish_slider.contents),
            data_num: data_fish.totalCount,
            data_num_ja: data_fish_ja.totalCount - data_fish_freshwater.totalCount,
            allFishList: allFishList,
        },
    };
};

export const getStaticPaths = async() => {
    const kanaList = ["ア", "カ", "サ", "タ", "ナ", "ハ", "マ", "ヤ", "ラ", "ワ"];
    const paths = kanaList.map((data) => `/fish/${data}`);

    return {
        paths,
        fallback: false,
    };
};

function getJapaneseName(data) {
    if (data.isOversea){
        return `${data.japaneseName}*`
    } else {
        return data.japaneseName;
    }
}

// --- Reactコンポーネント (propsとmap処理を修正) ---
export default function KanaList({
    kana,
    kanaData, // <-- 15個のpropsをこれ1つに集約
    data_fish,
    data_fish_slider,
    data_num,
    data_num_ja,
    allFishList
}){

    const kanaList = ["ア", "カ", "サ", "タ", "ナ", "ハ", "マ", "ヤ", "ラ", "ワ"];

    const description = '伊豆を中心に国内外を問わず未だ見ぬ魚を探して潜っているトラベルダイバーの"僕のだいびんぐらむ"です。個人で撮影した生態写真で魚図鑑を制作しています。'
    const url = `https://www.my-divingram.com/fish/${kana}`

    const [searchTerm, setSearchTerm] = useState("");

    // ひらがな・カタカナを区別せずに検索するためのヘルパー関数
    const katakanaToHiragana = (str) => {
        return str.replace(/[\u30a1-\u30f6]/g, (match) => {
            return String.fromCharCode(match.charCodeAt(0) - 0x60);
        });
    };

    // 検索結果を計算（useMemoで入力時のみ再計算）
    const searchResults = useMemo(() => {
        if (!searchTerm) {
            return []; // 検索語がなければ空
        }

        // 1. 検索語を各比較用に準備
        const termHira = katakanaToHiragana(searchTerm.toLowerCase()); // 和名比較用 (ひらがな)
        const termLower = searchTerm.toLowerCase();                 // 学名比較用 (小文字)

        return allFishList.filter(fish => {
            // 2. 和名での一致を確認
            const nameHira = katakanaToHiragana(fish.japaneseName.toLowerCase());
            const matchJapanese = nameHira.includes(termHira);

            // 3. 学名での一致を確認
            // (latinName が null や undefined の場合も考慮して ?. を使う)
            const nameLatin = fish.latinName?.toLowerCase() || ""; 
            const matchLatin = nameLatin.includes(termLower);

            // 4. どちらかが一致すれば true
            return matchJapanese || matchLatin;
        });

    }, [searchTerm, allFishList]);

    return (
        <Layout title="僕らむの魚図鑑" description={description} url={url} imageUrl="https://www.my-divingram.com/img/logo/favicon_small.jpg">

            <div className="px-3 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

                <h1 className="pt-10 pb-5 text-xl md:text-2xl text-center text-sky-800 font-black">僕らむの魚図鑑</h1>

                <Splide options={{type:"loop", gap:"24px", drag:"free", perPage:10, breakpoints:{640:{perPage:3}}, autoScroll:{pauseOnHover:true, pauseOnFocus:false, rewind:false, speed:0.3}}} extensions={{AutoScroll}}>
                    {data_fish_slider.map((data) => (
                        <SplideSlide key={data.id}>
                            <div className="hover:opacity-80">
                                <Link href={`/fish/${data.class}/${data.latinName}`.replace(" ", "_")}>
                                    <Image src={data.thumbImg.url} alt={data.japaneseName} width={300} height={200} style={{objectFit:"contain"}} unoptimized/>
                                    <h2 className="py-3 mb-2 text-xs md:text-sm text-center text-gray-700 font-medium">{getJapaneseName(data)}</h2>
                                </Link>
                            </div>
                        </SplideSlide>
                    ))}
                </Splide>

                <p className="text-sm md:text-lg text-center text-gray-700 font-medium">掲載種 (海外種や淡水魚を含む) : {data_num}種</p>
                <p className="text-sm md:text-lg text-center text-gray-700 font-medium">うち日本産海水魚 : {data_num_ja}種</p>
                <p className="pt-1 pb-1 text-xs md:text-sm text-center text-gray-700 font-medium">最近の更新一覧は<Link href={"/fish/recent_updates"} className="underline hover:opacity-50">こちら</Link> (最終更新 : {data_fish[0].updatedAt.substr(0,10)})</p>
                <p className="pb-1 text-xs md:text-sm text-center text-gray-700 font-medium">周縁性淡水魚は海水魚とみなす</p>
                <p className="pb-10 text-xs md:text-sm text-center text-gray-700 font-medium">海外種は名称の末尾に*の注釈あり</p>

                {/* --- ★検索ボックスと結果表示を追加 --- */}
                <div className="pb-10 max-w-xs md:max-w-sm mx-auto relative">
                    <p className="pb-2 text-center text-sm md:text-lg text-gray-700 font-medium">検索</p>
                    <input
                        type="search"
                        placeholder="和名 または 学名 を入力"
                        className="w-full p-3 text-xs md:text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {/* --- 検索結果表示（入力がある場合のみ） --- */}
                    {searchTerm && (
                        <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-80 overflow-y-auto z-10">
                            {searchResults.length > 0 ? (
                                <ul>
                                    {/* 検索結果が多すぎても重くならないよう、例えば50件に制限 */}
                                    {searchResults.slice(0, 50).map((fish) => (
                                        <li key={fish.id} className="border-b last:border-b-0">
                                            <Link
                                                href={`/fish/${fish.class}/${fish.latinName}`.replace(" ", "_")}
                                                className="block px-4 py-3 text-sm text-gray-700 hover:bg-sky-50 transition-colors"
                                                // リンククリックで検索ボックスを閉じる
                                                onClick={() => setSearchTerm("")}
                                            >
                                                {getJapaneseName(fish)}
                                                <span className="block text-xs text-gray-500 italic">{fish.latinName}</span>
                                            </Link>
                                        </li>
                                    ))}
                                    {searchResults.length > 50 && (
                                        <li className="px-4 py-3 text-center text-sm text-gray-500 italic">
                                            ...
                                        </li>
                                    )}
                                </ul>
                            ) : (
                                <p className="p-4 text-center text-sm text-gray-500">Not Found</p>
                            )}
                        </div>
                    )}
                </div>

                <p className="text-center text-sm md:text-lg text-gray-700 font-medium">索引</p>
                <div className="pt-2 pb-10 flex justify-center space-x-3 text-gray-700 font-medium">
                    {kanaList.map((data) => (
                        <p key={data} className="text-xs md:text-base underline hover:opacity-50">
                            <Link href={`/fish/${data}`}>
                                {data}
                            </Link>
                        </p>
                    ))}
                </div>

                <h1 className="pb-10 text-center text-xl md:text-2xl text-sky-800 font-black">{kana}行</h1>

                <div className="flex flex-wrap justify-center">
					{kanaData.map((data) => (
                        <div key={data.id} className="px-3 w-1/3 md:w-1/6 hover:opacity-80">
                            <Link href={`${data.class}/${data.latinName}`.replace(" ", "_")}>
                                <Image src={data.thumbImg.url} alt={data.japaneseName} width={300} height={200} style={{objectFit:"contain"}} unoptimized/>
                                <h2 className="py-3 mb-2 text-xs md:text-base text-center text-gray-700 font-medium">{getJapaneseName(data)}</h2>
                            </Link>
                        </div>
                    ))}
				</div>

                <p className="pt-8 text-xs md:text-sm text-center text-gray-700 font-medium">当サイトに掲載する魚種の同定にあたり，<Link href={"https://x.com/yuma_sakana"} className="underline hover:opacity-50">YUMA</Link>氏に数多のご教示を賜りました．ここに深謝いたします．</p>
                <p className="pt-1 text-xs md:text-sm text-center text-gray-700 font-medium">写真提供のご依頼，誤同定のご指摘などは各SNSのDMまでお願いします．</p>
            </div>
        </Layout>
    )
}