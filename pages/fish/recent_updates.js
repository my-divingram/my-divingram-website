import Link from "next/link";
import Image from "next/image";
import { client } from "/libs/client";
import Layout from "/components/Layout";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";

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

// SSG
export const getStaticProps = async() => {

    const NUM_MONTHS_TO_FETCH = 6; // ここを「3」に変えれば3ヶ月分取得できる
    const months = []; // 月文字列 (YYYY-MM) を格納する配列
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
        data_fish,
        data_fish_ja,
        data_fish_freshwater,
        data_fish_slider,
        ...monthlyData
    ] = await Promise.all([
        ...commonRequests,
        ...monthlyRequests
    ]);

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

            // 共通データ
            data_fish_slider: shuffleArray(data_fish_slider.contents),
            data_num: data_fish.totalCount,
            data_num_ja: data_fish_ja.totalCount - data_fish_freshwater.totalCount,
        },
    };
};

function getJapaneseName(data) {
    if (data.isOversea){
        return `${data.japaneseName}*`
    } else {
        return data.japaneseName;
    }
}

function Home({monthsData, data_fish_slider, data_num, data_num_ja}) {

    const description = '伊豆を中心に国内外を問わず未だ見ぬ魚を探して潜っているトラベルダイバーの"僕のだいびんぐらむ"です。個人で撮影した生態写真で魚図鑑を制作しています。'

    return (
        <Layout title="僕らむの魚図鑑" description={description} url="https://www.my-divingram.com/fish/recent_updates" imageUrl="https://www.my-divingram.com/img/logo/favicon_small.jpg">

            <div className="px-3 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

                <h1 className="pt-10 pb-5 text-xl md:text-2xl text-center text-sky-800 font-black">僕らむの魚図鑑</h1>

                <Splide options={{type:"loop", gap:"24px", drag:"free", perPage:10, breakpoints:{640:{perPage:3}}, autoScroll:{pauseOnHover:true, pauseOnFocus:false, rewind:false, speed:0.3}}} extensions={{AutoScroll}}>
                    {data_fish_slider.map((data) => (
                        <SplideSlide key={data.id}>
                            <div className="hover:opacity-80">
                                <Link href={`/fish/${data.class}/${data.latinName}`.replace(" ", "_")}>
                                    <Image src={data.thumbImg.url} alt={data.japaneseName} width={300} height={200} style={{objectFit:"contain"}} unoptimized/>
                                    <h2 className="pt-3 pb-5 text-xs md:text-sm text-center text-gray-700 font-medium">{getJapaneseName(data)}</h2>
                                </Link>
                            </div>
                        </SplideSlide>
                    ))}
                </Splide>

                <p className="text-sm md:text-lg text-center text-gray-700 font-medium">掲載種 (海外種や淡水魚を含む) : {data_num}種</p>
                <p className="text-sm md:text-lg text-center text-gray-700 font-medium">うち日本産海水魚 : {data_num_ja}種</p>
                {/* <p className="pt-1 text-xs md:text-sm text-center text-gray-700 font-medium">学名および掲載順は「日本産魚類全種リスト(ver22)」に準拠する</p> */}
                <p className="pb-1 text-xs md:text-sm text-center text-gray-700 font-medium">周縁性淡水魚は海水魚とみなす</p>
                <p className="pb-10 text-xs md:text-sm text-center text-gray-700 font-medium">海外種は名称の末尾に*の注釈あり</p>

                {monthsData.map((monthData) => (
                    // `key` を指定することが重要
                    <div key={monthData.month}>
                        <h1 className="pt-10 pb-3 text-center text-xl md:text-2xl text-sky-800 font-black">
                            {monthData.month}
                        </h1>
                        <p className="pb-10 text-sm md:text-lg text-center text-gray-700 font-medium">
                            更新数 : {monthData.count}種
                        </p>
                        <div className="flex flex-wrap justify-center">
                            {monthData.items.map((data) => (
                                <div key={data.id} className="px-3 w-1/3 md:w-1/6 hover:opacity-80">
                                    <Link href={`${data.class}/${data.latinName}`.replace(" ", "_")}>
                                        <Image src={data.thumbImg.url} alt={data.japaneseName} width={300} height={200} style={{objectFit:"contain"}} unoptimized/>
                                        <h2 className="py-3 mb-2 text-xs md:text-base text-center text-gray-700 font-medium">{getJapaneseName(data)}</h2>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <p className="pt-8 text-xs md:text-sm text-center text-gray-700 font-medium">当サイトに掲載する魚種の同定にあたり，<Link href={"https://x.com/yuma_sakana"} className="underline hover:opacity-50">YUMA</Link>氏に数多のご教示を賜りました．ここに深謝いたします．</p>
                <p className="pt-1 text-xs md:text-sm text-center text-gray-700 font-medium">写真提供のご依頼，誤同定のご指摘などは各SNSのDMまでお願いします．</p>
            </div>
        </Layout>
    )
}

export default Home