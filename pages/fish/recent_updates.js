import Link from "next/link";
import Image from "next/image";
import { client } from "/libs/client";
import Layout from "/components/Layout";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";

// SSG
export const getStaticProps = async() => {
    const today = new Date()
    const month_1stLast = today.toLocaleDateString('sv-SE').substring(0,7)
    today.setMonth(today.getMonth() - 1)
    const month_2ndLast = today.toLocaleDateString('sv-SE').substring(0,7)
    today.setMonth(today.getMonth() - 1)
    const month_3rdLast = today.toLocaleDateString('sv-SE').substring(0,7)

    const data_fish = await client.get({ endpoint: "uwphoto", queries: { filters: `book[contains]魚`, orders: `-updatedAt`, limit: 1}});
    const data_fish_ja = await client.get({ endpoint: "uwphoto", queries: { filters: `book[contains]魚[and]isOversea[equals]false`, orders: `-updatedAt`, limit: 1}});
    const data_fish_freshwater = await client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]freshwaterfish` , limit: 1 }});
    const data_fish_slider = await client.get({ endpoint: "uwphoto", queries: { filters: `book[contains]魚[and]isSpotlight[equals]true`, orders: `-updatedAt`, limit: 40}});

    const data_fish_1stLast_100 = await client.get({ endpoint: "uwphoto", queries: { filters: `book[contains]魚[and]updatedAt[begins_with]${month_1stLast}`, orders: `-updatedAt`, limit: 100}});
    const data_fish_1stLast_200 = await client.get({ endpoint: "uwphoto", queries: { filters: `book[contains]魚[and]updatedAt[begins_with]${month_1stLast}`, orders: `-updatedAt`, limit: 100, offset: 100}});

    const data_fish_2ndLast_100 = await client.get({ endpoint: "uwphoto", queries: { filters: `book[contains]魚[and]updatedAt[begins_with]${month_2ndLast}`, orders: `-updatedAt`, limit: 100}});
    const data_fish_2ndLast_200 = await client.get({ endpoint: "uwphoto", queries: { filters: `book[contains]魚[and]updatedAt[begins_with]${month_2ndLast}`, orders: `-updatedAt`, limit: 100, offset: 100}});

    const data_fish_3rdLast_100 = await client.get({ endpoint: "uwphoto", queries: { filters: `book[contains]魚[and]updatedAt[begins_with]${month_3rdLast}`, orders: `-updatedAt`, limit: 100}});
    const data_fish_3rdLast_200 = await client.get({ endpoint: "uwphoto", queries: { filters: `book[contains]魚[and]updatedAt[begins_with]${month_3rdLast}`, orders: `-updatedAt`, limit: 100, offset: 100}});

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

    return {
        props: {
            data_fish_1stLast: data_fish_1stLast_100.contents.concat(data_fish_1stLast_200.contents),
            data_fish_2ndLast: data_fish_2ndLast_100.contents.concat(data_fish_2ndLast_200.contents),
            data_fish_3rdLast: data_fish_3rdLast_100.contents.concat(data_fish_3rdLast_200.contents),
            data_fish_slider: shuffleArray(data_fish_slider.contents),
            data_num: data_fish.totalCount,
            data_num_ja: data_fish_ja.totalCount - data_fish_freshwater.totalCount,
            data_num_1stLast: data_fish_1stLast_100.totalCount,
            data_num_2ndLast: data_fish_2ndLast_100.totalCount,
            data_num_3rdLast: data_fish_3rdLast_100.totalCount,
            month_1stLast: month_1stLast,
            month_2ndLast: month_2ndLast,
            month_3rdLast: month_3rdLast,
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

function Home({data_fish_1stLast, data_fish_2ndLast, data_fish_3rdLast, data_fish_slider, data_num, data_num_ja, data_num_1stLast, data_num_2ndLast, data_num_3rdLast, month_1stLast, month_2ndLast, month_3rdLast}) {

    const description = '伊豆を中心に国内外を問わず未だ見ぬ魚を探して潜っているトラベルダイバーの"僕のだいびんぐらむ"です。個人で撮影した生態写真で魚図鑑を制作しています。'

    return (
        <Layout title="僕らむの魚図鑑" description={description} url="https://www.my-divingram.com/fish/recent_updates" imageUrl="https://www.my-divingram.com/img/logo/ornate.png">

            <div className="px-3 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

                <h1 className="pt-10 pb-5 text-xl md:text-2xl text-center text-sky-800 font-black">僕らむの魚図鑑</h1>

                <Splide options={{type:"loop", gap:"24px", drag:"free", perPage:10, breakpoints:{640:{perPage:3}}, autoScroll:{pauseOnHover:true, pauseOnFocus:false, rewind:false, speed:0.3}}} extensions={{AutoScroll}}>
                    {data_fish_slider.map((data) => (
                        <SplideSlide key={data.id}>
                            <div className="hover:opacity-80">
                                <Link href={`/fish/${data.class}/${data.latinName}`.replace(" ", "_")}>
                                    <Image src={data.thumbImg.url} alt="thumbnail" width={300} height={200} style={{objectFit:"contain"}} unoptimized/>
                                    <h2 className="pt-3 pb-5 text-xs md:text-sm text-center text-gray-700 font-medium">{getJapaneseName(data)}</h2>
                                </Link>
                            </div>
                        </SplideSlide>
                    ))}
                </Splide>

                <p className="text-sm md:text-lg text-center text-gray-700 font-medium">掲載種 (未記載種やハイブリッドを含む) : {data_num}種</p>
                <p className="text-sm md:text-lg text-center text-gray-700 font-medium">うち日本産海水魚 : {data_num_ja}種</p>
                {/* <p className="pt-1 text-xs md:text-sm text-center text-gray-700 font-medium">学名および掲載順は「日本産魚類全種リスト(ver22)」に準拠する</p> */}
                <p className="pb-10 text-xs md:text-sm text-center text-gray-700 font-medium">海外種は名称の末尾に*の注釈あり</p>

                <h1 className="pb-3 text-center text-xl md:text-2xl text-sky-800 font-black">{month_1stLast}</h1>
                <p className="pb-10 text-sm md:text-lg text-center text-gray-700 font-medium">更新数 : {data_num_1stLast}種</p>
                <div className="flex flex-wrap justify-center">
					{data_fish_1stLast.map((data) => (
                        <div key={data.id} className="px-3 w-1/3 md:w-1/6 hover:opacity-80">
                            <Link href={`${data.class}/${data.latinName}`.replace(" ", "_")}>
                                <Image src={data.thumbImg.url} alt="thumbnail" width={300} height={200} style={{objectFit:"contain"}} unoptimized/>
                                <h2 className="py-3 mb-2 text-xs md:text-base text-center text-gray-700 font-medium">{getJapaneseName(data)}</h2>
                            </Link>
                        </div>
                    ))}
                </div>
                <h1 className="pt-10 pb-3 text-center text-xl md:text-2xl text-sky-800 font-black">{month_2ndLast}</h1>
                <p className="pb-10 text-sm md:text-lg text-center text-gray-700 font-medium">更新数 : {data_num_2ndLast}種</p>
                <div className="flex flex-wrap justify-center">
					{data_fish_2ndLast.map((data) => (
                        <div key={data.id} className="px-3 w-1/3 md:w-1/6 hover:opacity-80">
                            <Link href={`${data.class}/${data.latinName}`.replace(" ", "_")}>
                                <Image src={data.thumbImg.url} alt="thumbnail" width={300} height={200} style={{objectFit:"contain"}} unoptimized/>
                                <h2 className="py-3 mb-2 text-xs md:text-base text-center text-gray-700 font-medium">{getJapaneseName(data)}</h2>
                            </Link>
                        </div>
                    ))}
                </div>
                <h1 className="pt-10 pb-3 text-center text-xl md:text-2xl text-sky-800 font-black">{month_3rdLast}</h1>
                <p className="pb-10 text-sm md:text-lg text-center text-gray-700 font-medium">更新数 : {data_num_3rdLast}種</p>
                <div className="flex flex-wrap justify-center">
					{data_fish_3rdLast.map((data) => (
                        <div key={data.id} className="px-3 w-1/3 md:w-1/6 hover:opacity-80">
                            <Link href={`${data.class}/${data.latinName}`.replace(" ", "_")}>
                                <Image src={data.thumbImg.url} alt="thumbnail" width={300} height={200} style={{objectFit:"contain"}} unoptimized/>
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

export default Home