import Link from "next/link";
import Image from "next/image";
import { client } from "/libs/client";
import Layout from "/components/Layout";
import FishPageHeader from "/components/FishPageHeader";
import FishPageFooter from "/components/FishPageFooter";
import { fetchAllPages } from "/libs/fetch_all_pages"; // サーバー用
import { shuffleArray, getJapaneseName } from "/libs/utils"; // クライアント安全

// SSG
export const getStaticProps = async() => {
    const NUM_MONTHS_TO_FETCH = 6; //ここを変更
    const months = [];
    const today = new Date();

    for (let i = 0; i < NUM_MONTHS_TO_FETCH; i++) {
        const targetDate = new Date(today.getFullYear(), today.getMonth() - i, 1);
        const monthString = targetDate.toLocaleDateString('sv-SE').substring(0, 7); // "YYYY-MM"
        months.push(monthString);
    }

    // 月別リクエストを動的に生成 ---
    const commonRequests = [
        client.get({ endpoint: "uwphoto", queries: { filters: `book[contains]魚`, orders: `-updatedAt`, limit: 1}}),
        client.get({ endpoint: "uwphoto", queries: { filters: `book[contains]魚[and]isOversea[equals]false`, orders: `-updatedAt`, limit: 1}}),
        client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]freshwaterfish` , limit: 1 }}),
        client.get({ endpoint: "uwphoto", queries: { filters: `book[contains]魚[and]isSpotlight[equals]true`, orders: `-updatedAt`, limit: 40}}),
    ];

    // `months` 配列から `fetchAllPages` のリクエスト配列を作る
    const monthlyRequests = months.map(month => {
        return fetchAllPages("uwphoto", {
            filters: `book[contains]魚[and]updatedAt[begins_with]${month}`,
            orders: `-updatedAt`
        });
    });

    const [
        data_fish, data_fish_ja, data_fish_freshwater, data_fish_slider, ...monthlyData
    ] = await Promise.all([...commonRequests, ...monthlyRequests]);

    const monthsDataForProps = months.map((month, index) => {
        const items = monthlyData[index];
        const [year, monthNum] = month.split('-');
        const displayString = `${year}年${parseInt(monthNum, 10)}月`;

        return {
            month: displayString, // 例: "2025年 11月"
            items: items,         // アイテムの配列
            count: items.length   // 件数
        };
    });

    return {
        props: {
            monthsData: monthsDataForProps,
            data_fish_slider: shuffleArray(data_fish_slider.contents), // 共通関数
            data_num: data_fish.totalCount,
            data_num_ja: data_fish_ja.totalCount - data_fish_freshwater.totalCount,
        },
    };
};

function Home({monthsData, data_fish_slider, data_num, data_num_ja}) {

    const description = '伊豆を中心に国内外を問わず未だ見ぬ魚を探して潜っているトラベルダイバーの"僕のだいびんぐらむ"です。個人で撮影した生態写真で魚図鑑を制作しています。'

    return (
        <Layout title="僕らむの魚図鑑" description={description} url="https://www.my-divingram.com/fish/recent_updates" imageUrl="https://www.my-divingram.com/img/logo/favicon_small.jpg">
            <div className="px-3 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

                <FishPageHeader
                    data_fish_slider={data_fish_slider}
                    data_num={data_num}
                    data_num_ja={data_num_ja}
                    data_fish={null} // 最終更新日 (不要)
                    allFishList={null} // 検索 (不要)
                    showSearch={false} // 検索を非表示
                    showIndex={false}  // 索引を非表示
                />

                {monthsData?.map((monthData) => (
                    <div key={monthData.month}>
                        <h1 className="pt-5 pb-3 text-center text-xl md:text-2xl text-sky-800 font-black">
                            {monthData.month}
                        </h1>
                        <p className="pb-10 text-sm md:text-lg text-center text-gray-700 font-medium">
                            更新数 : {monthData.count}種
                        </p>
                        <div className="flex flex-wrap justify-center">
                            {monthData.items.map((data) => (
                                <div key={data.id} className="px-3 w-1/3 md:w-1/6 hover:opacity-80">
                                    <Link href={`/fish/${data.class}/${data.latinName}`.replace(" ", "_")}>
                                        <Image src={data.thumbImg.url} alt={data.japaneseName} width={300} height={200} style={{objectFit:"contain"}} unoptimized/>
                                        <h2 className="py-3 mb-2 text-xs md:text-base text-center text-gray-700 font-medium">{getJapaneseName(data)}</h2>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <FishPageFooter />
            </div>
        </Layout>
    )
}

export default Home