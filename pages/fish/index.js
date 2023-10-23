import Link from "next/link";
import Image from "next/image";
import { client } from "/libs/client";
import Layout from "/components/Layout";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";

// SSG
export const getStaticProps = async() => {
    const data_fish = await client.get({ endpoint: "uwphoto", queries: { filters: `book[contains]魚`, orders: `-updatedAt`, limit: 30}});

    return {
        props: {
            data_fish: data_fish.contents,
            data_num: data_fish.totalCount,
        },
    };
};


function Home({data_fish, data_num}) {

    const kanaList = ["ア", "カ", "サ", "タ", "ナ", "ハ", "マ", "ヤ", "ラ", "ワ"];

    return (
        <Layout title="僕らむの魚図鑑">
            <div className="px-3 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

                <h1 className="pt-10 pb-5 text-xl md:text-2xl text-center text-sky-800 font-black">僕らむの魚図鑑</h1>

                <Splide options={{type:"loop", gap:"24px", drag:"free", perPage:10, breakpoints:{640:{perPage:3}}, autoScroll:{pauseOnHover:true, pauseOnFocus:false, rewind:false, speed:0.3}}} extensions={{AutoScroll}}>
                    {data_fish.map((data) => (
                        <SplideSlide key={data.id}>
                            <div className="hover:opacity-80">
                                <Link href={`/fish/${data.class}/${data.latinName}`.replace(" ", "_")}>
                                    <Image src={data.thumbImg.url} alt="thumbnail" width={300} height={200} style={{objectFit:"contain"}}/>
                                    <h2 className="pt-3 pb-5 text-xs md:text-sm text-center text-gray-700 font-medium">{data.japaneseName}</h2>
                                </Link>
                            </div>
                        </SplideSlide>
                    ))}
                </Splide>

                <p className="text-sm md:text-lg text-center text-gray-700 font-medium">現在掲載種 (未記載種やハイブリッドを含む) : {data_num}種</p>
                <p className="pb-10 text-sm md:text-lg text-center text-gray-700 font-medium">Last Updated : {data_fish[0].updatedAt.substr(0,10)}</p>

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
                            <Image src="/img/class/shark.png" alt="shark" width={300} height={200} style={{objectFit:"contain"}}/>
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
                            <Image src="/img/class/seasnake.png" alt="seasnake" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">ウミヘビの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/eel">
                            <Image src="/img/class/eel.png" alt="eel" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">アナゴの仲間</h2>
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
                            <Image src="/img/class/squirrelfish.png" alt="squirrelfish" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">イットウダイの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/seahorse">
                            <Image src="/img/class/seahorse.png" alt="seahorse" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">トゲウオの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/rockfish">
                            <Image src="/img/class/rockfish.jpeg" alt="rockfish" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">メバル・カサゴの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/stonefish">
                            <Image src="/img/class/stonefish.png" alt="stonefish" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">オコゼの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/anthias">
                            <Image src="/img/class/anthias.jpeg" alt="anthias" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">ハナダイの仲間</h2>
                        </Link>
                    </div>
                    <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/grouper">
                            <Image src="/img/class/grouper.jpeg" alt="grouper" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">ハタの仲間</h2>
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
                    {/* <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/anthias">
                            <Image src="/img/class/anthias.png" alt="anthias" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">ヒメジの仲間</h2>
                        </Link>
                    </div> */}
                    {/* <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/anthias">
                            <Image src="/img/class/anthias.png" alt="anthias" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">ハタンポの仲間</h2>
                        </Link>
                    </div> */}
                    {/* <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/anthias">
                            <Image src="/img/class/anthias.png" alt="anthias" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">チョウチョウウオの仲間</h2>
                        </Link>
                    </div> */}
                    {/* <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/angelfish">
                            <Image src="/img/class/angelfish.jpeg" alt="angelfish" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">キンチャクダイの仲間</h2>
                        </Link>
                    </div> */}
                    {/* <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/angelfish">
                            <Image src="/img/class/angelfish.jpeg" alt="angelfish" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">ゴンべの仲間</h2>
                        </Link>
                    </div> */}
                    {/* <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/angelfish">
                            <Image src="/img/class/angelfish.jpeg" alt="angelfish" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">タカノハダイの仲間</h2>
                        </Link>
                    </div> */}
                    {/* <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/angelfish">
                            <Image src="/img/class/angelfish.jpeg" alt="angelfish" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">スズメダイの仲間</h2>
                        </Link>
                    </div> */}
                    {/* <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/angelfish">
                            <Image src="/img/class/angelfish.jpeg" alt="angelfish" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">イスズミ・メジナの仲間</h2>
                        </Link>
                    </div> */}
                    {/* <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/angelfish">
                            <Image src="/img/class/angelfish.jpeg" alt="angelfish" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">ベラの仲間</h2>
                        </Link>
                    </div> */}
                    {/* <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/angelfish">
                            <Image src="/img/class/angelfish.jpeg" alt="angelfish" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">ブダイの仲間</h2>
                        </Link>
                    </div> */}
                    {/* <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/angelfish">
                            <Image src="/img/class/angelfish.jpeg" alt="angelfish" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">アイナメ・カジカの仲間</h2>
                        </Link>
                    </div> */}
                    {/* <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/angelfish">
                            <Image src="/img/class/angelfish.jpeg" alt="angelfish" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">トラギスの仲間</h2>
                        </Link>
                    </div> */}
                    {/* <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/angelfish">
                            <Image src="/img/class/angelfish.jpeg" alt="angelfish" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">ギンポの仲間</h2>
                        </Link>
                    </div> */}
                    {/* <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/angelfish">
                            <Image src="/img/class/angelfish.jpeg" alt="angelfish" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">ウバウオの仲間</h2>
                        </Link>
                    </div> */}
                    {/* <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/angelfish">
                            <Image src="/img/class/angelfish.jpeg" alt="angelfish" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">ネズッポの仲間</h2>
                        </Link>
                    </div> */}
                    {/* <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/angelfish">
                            <Image src="/img/class/angelfish.jpeg" alt="angelfish" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">ハゼの仲間</h2>
                        </Link>
                    </div> */}
                    {/* <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/angelfish">
                            <Image src="/img/class/angelfish.jpeg" alt="angelfish" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">ツバメウオの仲間</h2>
                        </Link>
                    </div> */}
                    {/* <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/angelfish">
                            <Image src="/img/class/angelfish.jpeg" alt="angelfish" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">アイゴの仲間</h2>
                        </Link>
                    </div> */}
                    {/* <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/angelfish">
                            <Image src="/img/class/angelfish.jpeg" alt="angelfish" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">ニザダイの仲間</h2>
                        </Link>
                    </div> */}
                    {/* <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/angelfish">
                            <Image src="/img/class/angelfish.jpeg" alt="angelfish" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">カマスの仲間</h2>
                        </Link>
                    </div> */}
                    {/* <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/angelfish">
                            <Image src="/img/class/angelfish.jpeg" alt="angelfish" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">サバの仲間</h2>
                        </Link>
                    </div> */}
                    {/* <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/angelfish">
                            <Image src="/img/class/angelfish.jpeg" alt="angelfish" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">カレイの仲間</h2>
                        </Link>
                    </div> */}
                    {/* <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/angelfish">
                            <Image src="/img/class/angelfish.jpeg" alt="angelfish" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">カワハギの仲間</h2>
                        </Link>
                    </div> */}
                    {/* <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/angelfish">
                            <Image src="/img/class/angelfish.jpeg" alt="angelfish" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">フグの仲間</h2>
                        </Link>
                    </div> */}
                    {/* <div className="flex justify-center hover:opacity-80">
                        <Link href="fish/angelfish">
                            <Image src="/img/class/angelfish.jpeg" alt="angelfish" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-xs md:text-base text-center text-gray-700 font-medium">その他</h2>
                            イワシ、ゴンズイ、ヒメクサアジ、チゴダラ、イタチウオ、ボラ、ダツ、ホウボウ、セミホウボウ、コチ、メギス、タナバタウオ、アゴアマダイ、キントキダイ、ムツ、コバンザメ、 クロサギ、テングダイ、アカタチ、タカベ、イシダイ、イシガキダイ、カゴカキダイ、メガネウオ、ツノダシ
                        </Link>
                    </div> */}
                </div>
            </div>
        </Layout>
    )
}

export default Home