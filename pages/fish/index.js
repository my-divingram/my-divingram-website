import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { client } from "/libs/client";
import Layout from "/components/Layout";
import FishPageHeader from "/components/FishPageHeader";
import FishPageFooter from "/components/FishPageFooter";
import { fetchAllPages } from "/libs/fetch_all_pages"; // サーバー用
import { shuffleArray } from "/libs/utils"; // クライアント安全
import { categoryList } from "/constants/categories";

// SSG
export const getStaticProps = async() => {
    // 並列取得
    const [
        data_fish,
        data_fish_ja,
        data_fish_freshwater,
        data_fish_slider,
        allFishList
    ] = await Promise.all([
        client.get({ endpoint: "uwphoto", queries: { filters: `book[contains]魚`, orders: `-updatedAt`, limit: 1}}),
        client.get({ endpoint: "uwphoto", queries: { filters: `book[contains]魚[and]isOversea[equals]false`, orders: `-updatedAt`, limit: 1}}),
        client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]freshwaterfish` , limit: 1 }}),
        client.get({ endpoint: "uwphoto", queries: { filters: `book[contains]魚[and]isSpotlight[equals]true`, orders: `-updatedAt`, limit: 40}}),
        fetchAllPages("uwphoto", { // 共通関数を使用
            filters: `book[contains]魚`,
            fields: 'id,japaneseName,class,latinName,isOversea'
        })
    ]);

    return {
        props: {
            data_fish: data_fish.contents,
            data_fish_slider: shuffleArray(data_fish_slider.contents),
            data_num: data_fish.totalCount,
            data_num_ja: data_fish_ja.totalCount - data_fish_freshwater.totalCount,
            allFishList: allFishList,
        },
    };
};

function Home({data_fish, data_fish_slider, data_num, data_num_ja, allFishList}) {
    const description = '伊豆を中心に国内外を問わず未だ見ぬ魚を探して潜っているトラベルダイバーの"僕のだいびんぐらむ"です。個人で撮影した生態写真で魚図鑑を制作しています。'
    // 構造化データ(JSON-LD)の作成
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "TOP",
                "item": "https://www.my-divingram.com"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "僕らむの魚図鑑",
                "item": "https://www.my-divingram.com/fish"
            }
        ]
    };

    return (
        <Layout title="僕らむの魚図鑑" description={description} url="https://www.my-divingram.com/fish" imageUrl="https://www.my-divingram.com/img/logo/favicon_small.jpg">
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />
            </Head>

            <div className="px-3 md:px-20 font-sans">

                <FishPageHeader
                    data_fish_slider={data_fish_slider}
                    data_num={data_num}
                    data_num_ja={data_num_ja}
                    data_fish={data_fish} // 最終更新日用
                    allFishList={allFishList} // 検索用
                    showSearch={true} // 検索を表示
                    showIndex={true}  // 索引を表示
                />

                <div className="grid px-3 gap-3 grid-cols-3 md:grid-cols-6">
                    {categoryList.map((cat) => (
                        <div key={cat.name} className="flex justify-center hover:opacity-80">
                            <Link href={cat.href}>
                                <Image
                                    src={cat.img}
                                    alt={cat.alt}
                                    width={300}
                                    height={200}
                                    style={{objectFit:"contain"}}
                                />
                                <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">
                                    {cat.name}
                                </h2>
                            </Link>
                        </div>
                    ))}
                </div>

                <FishPageFooter />
            </div>
        </Layout>
    )
}

export default Home