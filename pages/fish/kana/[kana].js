import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { client } from "/libs/client";
import Layout from "/components/Layout";
// 共通コンポーネントと関数をインポート
import FishPageHeader from "/components/FishPageHeader";
import FishPageFooter from "/components/FishPageFooter";
import { fetchAllPages } from "/libs/fetch_all_pages"; // サーバー用
import { shuffleArray } from "/libs/utils"; // クライアント安全
import { getOptimizedMicroCMSImage } from "/libs/utils";

// SSG
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

    const charsInRow = kana50[kana].filter(char => char !== "-");
    const kanaFilters = charsInRow.map(char => `japaneseName[begins_with]${char}`).join("[or]");

    // 並列実行
    const [
        allKanaData,
        data_fish,
        data_fish_ja,
        data_fish_freshwater,
        data_fish_slider,
        allFishList
    ] = await Promise.all([
        fetchAllPages("uwphoto", { filters: kanaFilters }), // 共通関数
        client.get({ endpoint: "uwphoto", queries: { filters: `book[contains]魚`, orders: `-updatedAt`, limit: 1}}),
        client.get({ endpoint: "uwphoto", queries: { filters: `book[contains]魚[and]isOversea[equals]false`, orders: `-updatedAt`, limit: 1}}),
        client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]freshwaterfish` , limit: 1 }}),
        client.get({ endpoint: "uwphoto", queries: { filters: `book[contains]魚[and]isSpotlight[equals]true`, orders: `-updatedAt`, limit: 40}}),
        fetchAllPages("uwphoto", { // 共通関数
            filters: `book[contains]魚`,
            fields: 'id,japaneseName,class,latinName,isOversea'
        })
    ]);

    const sortedKanaData = allKanaData.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName, "ja"));

    return {
        props: {
            kana: kana,
            kanaData: sortedKanaData,
            data_fish: data_fish.contents,
            data_fish_slider: shuffleArray(data_fish_slider.contents), // 共通関数
            data_num: data_fish.totalCount,
            data_num_ja: data_fish_ja.totalCount - data_fish_freshwater.totalCount,
            allFishList: allFishList,
        },
    };
};

export const getStaticPaths = async() => {
    const kanaList = ["ア", "カ", "サ", "タ", "ナ", "ハ", "マ", "ヤ", "ラ", "ワ"];
    const paths = kanaList.map((data) => ({params: { kana: data },}));
    return {
        paths,
        fallback: false,
    };
};

export default function KanaList({
    kana,
    kanaData,
    data_fish,
    data_fish_slider,
    data_num,
    data_num_ja,
    allFishList
}){
    const description = '伊豆を中心に国内外を問わず未だ見ぬ魚を探して潜っているトラベルダイバーの"僕のだいびんぐらむ"です。個人で撮影した生態写真で魚図鑑を制作しています。'
    const url = `https://www.my-divingram.com/fish/${kana}`

    return (
        <Layout title="僕らむの魚図鑑" description={description} url={url} imageUrl="https://www.my-divingram.com/img/logo/favicon_small.jpg">
            <div className="px-3 md:px-20 font-sans">

                <Head>
                    <meta name="robots" content="noindex" />
                </Head>

                <FishPageHeader
                    data_fish_slider={data_fish_slider}
                    data_num={data_num}
                    data_num_ja={data_num_ja}
                    data_fish={data_fish} // 最終更新日用
                    allFishList={allFishList} // 検索用
                    showSearch={true} // 検索を表示
                    showIndex={true}  // 索引を表示
                />

                <h1 className="pb-10 text-center text-xl md:text-2xl text-sky-800 font-black">{kana}行</h1>
                <div className="flex flex-wrap justify-center">
					{kanaData.map((data) => (
                        <div key={data.id} className="px-3 w-1/3 md:w-1/6 hover:opacity-80">
                            <Link href={`/fish/${data.class}/${data.latinName}`.replace(" ", "_")} className="relative block">
                                {data.isOversea && (
                                    <div className="absolute top-0 right-0 w-[30%] max-w-[60px] bg-gray-800/50 z-10 shadow-sm pointer-events-none">
                                        <div className="w-full h-auto px-[10%] py-[10%]">
                                            <svg viewBox="0 0 30 10" className="w-full h-auto block fill-white">
                                                <text
                                                    x="50%"
                                                    y="50%"
                                                    dy=".35em"
                                                    textAnchor="middle"
                                                    fontSize="9"
                                                    fontWeight="bold"
                                                    style={{dominantBaseline: "auto"}}
                                                >
                                                    海外種
                                                </text>
                                            </svg>
                                        </div>
                                    </div>
                                )}

                                <Image src={getOptimizedMicroCMSImage(data.thumbImg.url, 300)} alt={data.japaneseName} width={300} height={200} style={{objectFit:"contain"}} unoptimized={true} priority={true} className="w-full h-auto"/>

                                <h2 className="py-3 mb-2 text-xs md:text-base text-center text-gray-700 font-medium">{data.japaneseName}</h2>
                            </Link>
                        </div>
                    ))}
				</div>

                <FishPageFooter />
            </div>
        </Layout>
    )
}