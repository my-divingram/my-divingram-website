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

// SSG
export const getStaticProps = async() => {

    // 既存のAPIリクエストと、新しい全魚リスト取得を並列で実行
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

        // ★全魚リストを取得（魚図鑑データのみ、かつ必要最小限のフィールド）
        fetchAllPages("uwphoto", {
            filters: `book[contains]魚`,
            fields: 'id,japaneseName,class,latinName,isOversea'
        })
    ]);

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
            data_fish: data_fish.contents,
            data_fish_slider: shuffleArray(data_fish_slider.contents),
            data_num: data_fish.totalCount,
            data_num_ja: data_fish_ja.totalCount - data_fish_freshwater.totalCount,
            allFishList: allFishList,
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

function Home({data_fish, data_fish_slider, data_num, data_num_ja, allFishList}) {

    const kanaList = ["ア", "カ", "サ", "タ", "ナ", "ハ", "マ", "ヤ", "ラ", "ワ"];
    const description = '伊豆を中心に国内外を問わず未だ見ぬ魚を探して潜っているトラベルダイバーの"僕のだいびんぐらむ"です。個人で撮影した生態写真で魚図鑑を制作しています。'

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
        <Layout title="僕らむの魚図鑑" description={description} url="https://www.my-divingram.com/fish" imageUrl="https://www.my-divingram.com/img/logo/favicon_small.jpg">

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
                <p className="pt-1 pb-1 text-xs md:text-sm text-center text-gray-700 font-medium">最近の更新一覧は<Link href={"/fish/recent_updates"} className="underline hover:opacity-50">こちら</Link> (最終更新 : {data_fish[0].updatedAt.substr(0,10)})</p>
                {/* <p className="pb-1 text-xs md:text-sm text-center text-gray-700 font-medium">学名および掲載順は「日本産魚類全種リスト(ver22)」に準拠する</p> */}
                <p className="pb-1 text-xs md:text-sm text-center text-gray-700 font-medium">周縁性淡水魚は海水魚とみなす</p>
                <p className="pb-10 text-xs md:text-sm text-center text-gray-700 font-medium">海外種は名称の末尾に*の注釈あり</p>

                {/* --- ★検索ボックスと結果表示を追加 --- */}
                <div className="pb-5 max-w-xs md:max-w-sm mx-auto relative">
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

                <div className="grid px-3 gap-3 grid-cols-3 md:grid-cols-6">
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/shark">
                            <Image src="/img/class/shark.jpeg" alt="shark" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">サメの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/ray">
                            <Image src="/img/class/ray.png" alt="ray" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">エイの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/moray">
                            <Image src="/img/class/moray.jpeg" alt="moray" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">ウツボの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/seasnake">
                            <Image src="/img/class/seasnake.jpeg" alt="seasnake" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">ウミヘビの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/eel">
                            <Image src="/img/class/eel.jpeg" alt="eel" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">アナゴの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/lizardfish">
                            <Image src="/img/class/lizardfish.jpeg" alt="lizardfish" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">エソの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/monkfish">
                            <Image src="/img/class/monkfish.jpeg" alt="monkfish" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">アンコウの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/squirrelfish">
                            <Image src="/img/class/squirrelfish.jpeg" alt="squirrelfish" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">イットウダイの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/seahorse">
                            <Image src="/img/class/seahorse.jpeg" alt="seahorse" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">トゲウオの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/rockfish">
                            <Image src="/img/class/rockfish.jpeg" alt="rockfish" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">カサゴ・メバルの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/stonefish">
                            <Image src="/img/class/stonefish.jpeg" alt="stonefish" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">オコゼの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/flathead">
                            <Image src="/img/class/flathead.jpeg" alt="flathead" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">コチの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/sculpin">
                            <Image src="/img/class/sculpin.jpeg" alt="sculpin" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">カジカの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/grouper">
                            <Image src="/img/class/grouper.jpeg" alt="grouper" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">ハタの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/anthias">
                            <Image src="/img/class/anthias.jpeg" alt="anthias" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">ハナダイの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/dottyback">
                            <Image src="/img/class/dottyback.jpeg" alt="dottyback" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">メギスの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/longfin">
                            <Image src="/img/class/longfin.jpeg" alt="longfin" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">タナバタウオの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/jawfish">
                            <Image src="/img/class/jawfish.jpeg" alt="jawfish" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">アゴアマダイの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/bigeye">
                            <Image src="/img/class/bigeye.jpeg" alt="bigeye" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">キントキダイの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/cardinalfish">
                            <Image src="/img/class/cardinalfish.jpeg" alt="cardinalfish" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">テンジクダイの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/tilefish">
                            <Image src="/img/class/tilefish.jpeg" alt="tilefish" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">アマダイの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/horsemackerel">
                            <Image src="/img/class/horsemackerel.png" alt="anthias" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">アジの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/snapper">
                            <Image src="/img/class/snapper.jpeg" alt="snapper" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">フエダイの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/fusilier">
                            <Image src="/img/class/fusilier.png" alt="fusilier" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">タカサゴの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/sweetlips">
                            <Image src="/img/class/sweetlips.jpeg" alt="sweetlips" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">イサキの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/threadfinbream">
                            <Image src="/img/class/threadfinbream.jpeg" alt="threadfinbream" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">イトヨリダイの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/seabream">
                            <Image src="/img/class/seabream.jpeg" alt="seabream" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">タイの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/emperor">
                            <Image src="/img/class/emperor.jpeg" alt="emperor" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">フエフキダイの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/goatfish">
                            <Image src="/img/class/goatfish.jpeg" alt="goatfish" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">ヒメジの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/sweeper">
                            <Image src="/img/class/sweeper.jpeg" alt="sweeper" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">ハタンポの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/butterflyfish">
                            <Image src="/img/class/butterflyfish.jpeg" alt="butterflyfish" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">チョウチョウウオの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/angelfish">
                            <Image src="/img/class/angelfish.jpeg" alt="angelfish" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">キンチャクダイの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/hawkfish">
                            <Image src="/img/class/hawkfish.jpeg" alt="hawkfish" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">ゴンべの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/trumpeter">
                            <Image src="/img/class/trumpeter.jpeg" alt="trumpeter" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">タカノハダイの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/damselfish">
                            <Image src="/img/class/damselfish.jpeg" alt="damselfish" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">スズメダイの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/seachub">
                            <Image src="/img/class/seachub.jpeg" alt="seachub" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">イスズミ・メジナの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/wrasse">
                            <Image src="/img/class/wrasse.jpeg" alt="wrasse" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">ベラの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/parrotfish">
                            <Image src="/img/class/parrotfish.jpeg" alt="parrotfish" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">ブダイの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/sandperch">
                            <Image src="/img/class/sandperch.jpeg" alt="sandperch" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">ワニギスの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/triplefin">
                            <Image src="/img/class/triplefin.jpeg" alt="triplefin" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">ヘビギンポの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/blenny">
                            <Image src="/img/class/blenny.jpeg" alt="blenny" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">コケギンポ・イソギンポの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/clingfish">
                            <Image src="/img/class/clingfish.jpeg" alt="clingfish" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">ウバウオの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/dragonet">
                            <Image src="/img/class/dragonet.jpeg" alt="dragonet" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">ネズッポの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/goby">
                            <Image src="/img/class/goby.jpeg" alt="goby" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">ハゼの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/batfish">
                            <Image src="/img/class/batfish.jpeg" alt="batfish" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">ツバメウオの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/rabbitfish">
                            <Image src="/img/class/rabbitfish.jpeg" alt="rabbitfish" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">アイゴの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/surgeonfish">
                            <Image src="/img/class/surgeonfish.png" alt="surgeonfish" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">ニザダイの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/barracuda">
                            <Image src="/img/class/barracuda.jpeg" alt="barracuda" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">カマスの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/mackerel">
                            <Image src="/img/class/mackerel.png" alt="mackerel" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">サバの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/flatfish">
                            <Image src="/img/class/flatfish.jpeg" alt="flatfish" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">カレイの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/filefish">
                            <Image src="/img/class/filefish.jpeg" alt="filefish" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">カワハギの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/puffer">
                            <Image src="/img/class/puffer.jpeg" alt="puffer" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">フグの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/others">
                            <Image src="/img/class/others.jpeg" alt="others" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">その他の海水魚</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/freshwaterfish">
                            <Image src="/img/class/freshwaterfish.jpeg" alt="freshwaterfish" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">淡水魚</h2>
                        </Link>
                    </div>
                </div>
                <p className="pt-8 text-xs md:text-sm text-center text-gray-700 font-medium">当サイトに掲載する魚種の同定にあたり，<Link href={"https://x.com/yuma_sakana"} className="underline hover:opacity-50">YUMA</Link>氏に数多のご教示を賜りました．ここに深謝いたします．</p>
                <p className="pt-1 text-xs md:text-sm text-center text-gray-700 font-medium">写真提供のご依頼，誤同定のご指摘などは各SNSのDMまでお願いします．</p>
            </div>
        </Layout>
    )
}

export default Home