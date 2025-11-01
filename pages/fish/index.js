import Link from "next/link";
import Image from "next/image";
import { client } from "/libs/client";
import Layout from "/components/Layout";
import FishPageHeader from "/components/FishPageHeader";
import { fetchAllPages } from "/libs/fetch_all_pages"; // サーバー用
import { shuffleArray } from "/libs/utils"; // クライアント安全

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

    return (
        <Layout title="僕らむの魚図鑑" description={description} url="https://www.my-divingram.com/fish" imageUrl="https://www.my-divingram.com/img/logo/favicon_small.jpg">
            <div className="px-3 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

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