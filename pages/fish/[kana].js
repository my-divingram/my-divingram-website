import Link from "next/link";
import Image from "next/image";
import { client } from "/libs/client";
import Layout from "/components/Layout";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";

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
    }

    const data_kana_a = await client.get({ endpoint: "uwphoto", queries: { filters: `japaneseName[begins_with]${kana50[kana][0]}`, limit: 100 }});
    const data_kana_i = await client.get({ endpoint: "uwphoto", queries: { filters: `japaneseName[begins_with]${kana50[kana][1]}`, limit: 100 }});
    const data_kana_u = await client.get({ endpoint: "uwphoto", queries: { filters: `japaneseName[begins_with]${kana50[kana][2]}`, limit: 100 }});
    const data_kana_e = await client.get({ endpoint: "uwphoto", queries: { filters: `japaneseName[begins_with]${kana50[kana][3]}`, limit: 100 }});
    const data_kana_o = await client.get({ endpoint: "uwphoto", queries: { filters: `japaneseName[begins_with]${kana50[kana][4]}`, limit: 100 }});
    const data_kana_a_d = await client.get({ endpoint: "uwphoto", queries: { filters: `japaneseName[begins_with]${kana50[kana][5]}`, limit: 100 }});
    const data_kana_i_d = await client.get({ endpoint: "uwphoto", queries: { filters: `japaneseName[begins_with]${kana50[kana][6]}`, limit: 100 }});
    const data_kana_u_d = await client.get({ endpoint: "uwphoto", queries: { filters: `japaneseName[begins_with]${kana50[kana][7]}`, limit: 100 }});
    const data_kana_e_d = await client.get({ endpoint: "uwphoto", queries: { filters: `japaneseName[begins_with]${kana50[kana][8]}`, limit: 100 }});
    const data_kana_o_d = await client.get({ endpoint: "uwphoto", queries: { filters: `japaneseName[begins_with]${kana50[kana][9]}`, limit: 100 }});
    const data_kana_a_p = await client.get({ endpoint: "uwphoto", queries: { filters: `japaneseName[begins_with]${kana50[kana][10]}`, limit: 100 }});
    const data_kana_i_p = await client.get({ endpoint: "uwphoto", queries: { filters: `japaneseName[begins_with]${kana50[kana][11]}`, limit: 100 }});
    const data_kana_u_p = await client.get({ endpoint: "uwphoto", queries: { filters: `japaneseName[begins_with]${kana50[kana][12]}`, limit: 100 }});
    const data_kana_e_p = await client.get({ endpoint: "uwphoto", queries: { filters: `japaneseName[begins_with]${kana50[kana][13]}`, limit: 100 }});
    const data_kana_o_p = await client.get({ endpoint: "uwphoto", queries: { filters: `japaneseName[begins_with]${kana50[kana][14]}`, limit: 100 }});
    const data_fish = await client.get({ endpoint: "uwphoto", queries: { filters: `book[contains]魚`, orders: `-updatedAt`, limit: 30}});

    return {
        props: {
            kana: kana,
            data_kana_a: data_kana_a.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
            data_kana_i: data_kana_i.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
            data_kana_u: data_kana_u.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
            data_kana_e: data_kana_e.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
            data_kana_o: data_kana_o.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
            data_kana_a_d: data_kana_a_d.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
            data_kana_i_d: data_kana_i_d.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
            data_kana_u_d: data_kana_u_d.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
            data_kana_e_d: data_kana_e_d.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
            data_kana_o_d: data_kana_o_d.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
            data_kana_a_p: data_kana_a_p.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
            data_kana_i_p: data_kana_i_p.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
            data_kana_u_p: data_kana_u_p.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
            data_kana_e_p: data_kana_e_p.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
            data_kana_o_p: data_kana_o_p.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
            data_fish: data_fish.contents,
            data_num: data_fish.totalCount,
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

export default function kanaList({kana, data_kana_a, data_kana_i, data_kana_u, data_kana_e, data_kana_o, data_kana_a_d, data_kana_i_d, data_kana_u_d, data_kana_e_d, data_kana_o_d, data_kana_a_p, data_kana_i_p, data_kana_u_p, data_kana_e_p, data_kana_o_p, data_fish, data_num}){

    const kanaList = ["ア", "カ", "サ", "タ", "ナ", "ハ", "マ", "ヤ", "ラ", "ワ"];

    return (
        <Layout title="僕の魚図鑑">
            <div className="px-3 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

                <h1 className="pt-10 pb-5 text-xl md:text-2xl text-center text-sky-800 font-black">僕の魚図鑑</h1>

                <Splide options={{type:"loop", gap:"24px", drag:"free", perPage:10, breakpoints:{640:{perPage:3}}, autoScroll:{pauseOnHover:true, pauseOnFocus:false, rewind:false, speed:0.3}}} extensions={{AutoScroll}}>
                    {data_fish.map((data) => (
                        <SplideSlide key={data.id}>
                            <div className="hover:opacity-80">
                                <Link href={`/fish/${data.class}/${data.latinName}`.replace(" ", "_")}>
                                    <Image src={data.thumbImg.url} alt="thumbnail" width={300} height={200} style={{objectFit:"contain"}}/>
                                    <h2 className="py-3 mb-2 text-xs md:text-sm text-center text-gray-700 font-medium">{data.japaneseName}</h2>
                                </Link>
                            </div>
                        </SplideSlide>
                    ))}
                </Splide>

                <p className="text-sm md:text-lg text-center text-gray-700 font-medium">現在掲載種 (未記載種やハイブリッドを含む) : {data_num}種</p>
                <p className="pb-1 text-sm md:text-lg text-center text-gray-700 font-medium">Last Updated : {data_fish[0].updatedAt.substr(0,10)}</p>
                <p className="pb-10 text-xs md:text-sm text-center text-gray-700 font-medium">学名および掲載順は「日本産魚類全種リスト(ver22)」に準拠する</p>

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
					{data_kana_a.map((data) => (
                        <div key={data.id} className="px-3 w-1/3 md:w-1/6 hover:opacity-80">
                            <Link href={`${data.class}/${data.latinName}`.replace(" ", "_")}>
                                <Image src={data.thumbImg.url} alt="thumbnail" width={300} height={200} style={{objectFit:"contain"}}/>
                                <h2 className="py-3 mb-2 text-xs md:text-base text-center text-gray-700 font-medium">{data.japaneseName}</h2>
                            </Link>
                        </div>
                    ))}
					{data_kana_a_d.map((data) => (
                        <div key={data.id} className="px-3 w-1/3 md:w-1/6 hover:opacity-80">
                            <Link href={`${data.class}/${data.latinName}`.replace(" ", "_")}>
                                <Image src={data.thumbImg.url} alt="thumbnail" width={300} height={200} style={{objectFit:"contain"}}/>
                                <h2 className="py-3 mb-2 text-xs md:text-base text-center text-gray-700 font-medium">{data.japaneseName}</h2>
                            </Link>
                        </div>
                    ))}
					{data_kana_a_p.map((data) => (
                        <div key={data.id} className="px-3 w-1/3 md:w-1/6 hover:opacity-80">
                            <Link href={`${data.class}/${data.latinName}`.replace(" ", "_")}>
                                <Image src={data.thumbImg.url} alt="thumbnail" width={300} height={200} style={{objectFit:"contain"}}/>
                                <h2 className="py-3 mb-2 text-xs md:text-base text-center text-gray-700 font-medium">{data.japaneseName}</h2>
                            </Link>
                        </div>
                    ))}
					{data_kana_i.map((data) => (
                        <div key={data.id} className="px-3 w-1/3 md:w-1/6 hover:opacity-80">
                            <Link href={`${data.class}/${data.latinName}`.replace(" ", "_")}>
                                <Image src={data.thumbImg.url} alt="thumbnail" width={300} height={200} style={{objectFit:"contain"}}/>
                                <h2 className="py-3 mb-2 text-xs md:text-base text-center text-gray-700 font-medium">{data.japaneseName}</h2>
                            </Link>
                        </div>
                    ))}
					{data_kana_i_d.map((data) => (
                        <div key={data.id} className="px-3 w-1/3 md:w-1/6 hover:opacity-80">
                            <Link href={`${data.class}/${data.latinName}`.replace(" ", "_")}>
                                <Image src={data.thumbImg.url} alt="thumbnail" width={300} height={200} style={{objectFit:"contain"}}/>
                                <h2 className="py-3 mb-2 text-xs md:text-base text-center text-gray-700 font-medium">{data.japaneseName}</h2>
                            </Link>
                        </div>
                    ))}
					{data_kana_i_p.map((data) => (
                        <div key={data.id} className="px-3 w-1/3 md:w-1/6 hover:opacity-80">
                            <Link href={`${data.class}/${data.latinName}`.replace(" ", "_")}>
                                <Image src={data.thumbImg.url} alt="thumbnail" width={300} height={200} style={{objectFit:"contain"}}/>
                                <h2 className="py-3 mb-2 text-xs md:text-base text-center text-gray-700 font-medium">{data.japaneseName}</h2>
                            </Link>
                        </div>
                    ))}
					{data_kana_u.map((data) => (
                        <div key={data.id} className="px-3 w-1/3 md:w-1/6 hover:opacity-80">
                            <Link href={`${data.class}/${data.latinName}`.replace(" ", "_")}>
                                <Image src={data.thumbImg.url} alt="thumbnail" width={300} height={200} style={{objectFit:"contain"}}/>
                                <h2 className="py-3 mb-2 text-xs md:text-base text-center text-gray-700 font-medium">{data.japaneseName}</h2>
                            </Link>
                        </div>
                    ))}
					{data_kana_u_d.map((data) => (
                        <div key={data.id} className="px-3 w-1/3 md:w-1/6 hover:opacity-80">
                            <Link href={`${data.class}/${data.latinName}`.replace(" ", "_")}>
                                <Image src={data.thumbImg.url} alt="thumbnail" width={300} height={200} style={{objectFit:"contain"}}/>
                                <h2 className="py-3 mb-2 text-xs md:text-base text-center text-gray-700 font-medium">{data.japaneseName}</h2>
                            </Link>
                        </div>
                    ))}
					{data_kana_u_p.map((data) => (
                        <div key={data.id} className="px-3 w-1/3 md:w-1/6 hover:opacity-80">
                            <Link href={`${data.class}/${data.latinName}`.replace(" ", "_")}>
                                <Image src={data.thumbImg.url} alt="thumbnail" width={300} height={200} style={{objectFit:"contain"}}/>
                                <h2 className="py-3 mb-2 text-xs md:text-base text-center text-gray-700 font-medium">{data.japaneseName}</h2>
                            </Link>
                        </div>
                    ))}
					{data_kana_e.map((data) => (
                        <div key={data.id} className="px-3 w-1/3 md:w-1/6 hover:opacity-80">
                            <Link href={`${data.class}/${data.latinName}`.replace(" ", "_")}>
                                <Image src={data.thumbImg.url} alt="thumbnail" width={300} height={200} style={{objectFit:"contain"}}/>
                                <h2 className="py-3 mb-2 text-xs md:text-base text-center text-gray-700 font-medium">{data.japaneseName}</h2>
                            </Link>
                        </div>
                    ))}
					{data_kana_e_d.map((data) => (
                        <div key={data.id} className="px-3 w-1/3 md:w-1/6 hover:opacity-80">
                            <Link href={`${data.class}/${data.latinName}`.replace(" ", "_")}>
                                <Image src={data.thumbImg.url} alt="thumbnail" width={300} height={200} style={{objectFit:"contain"}}/>
                                <h2 className="py-3 mb-2 text-xs md:text-base text-center text-gray-700 font-medium">{data.japaneseName}</h2>
                            </Link>
                        </div>
                    ))}
					{data_kana_e_p.map((data) => (
                        <div key={data.id} className="px-3 w-1/3 md:w-1/6 hover:opacity-80">
                            <Link href={`${data.class}/${data.latinName}`.replace(" ", "_")}>
                                <Image src={data.thumbImg.url} alt="thumbnail" width={300} height={200} style={{objectFit:"contain"}}/>
                                <h2 className="py-3 mb-2 text-xs md:text-base text-center text-gray-700 font-medium">{data.japaneseName}</h2>
                            </Link>
                        </div>
                    ))}
					{data_kana_o.map((data) => (
                        <div key={data.id} className="px-3 w-1/3 md:w-1/6 hover:opacity-80">
                            <Link href={`${data.class}/${data.latinName}`.replace(" ", "_")}>
                                <Image src={data.thumbImg.url} alt="thumbnail" width={300} height={200} style={{objectFit:"contain"}}/>
                                <h2 className="py-3 mb-2 text-xs md:text-base text-center text-gray-700 font-medium">{data.japaneseName}</h2>
                            </Link>
                        </div>
                    ))}
					{data_kana_o_d.map((data) => (
                        <div key={data.id} className="px-3 w-1/3 md:w-1/6 hover:opacity-80">
                            <Link href={`${data.class}/${data.latinName}`.replace(" ", "_")}>
                                <Image src={data.thumbImg.url} alt="thumbnail" width={300} height={200} style={{objectFit:"contain"}}/>
                                <h2 className="py-3 mb-2 text-xs md:text-base text-center text-gray-700 font-medium">{data.japaneseName}</h2>
                            </Link>
                        </div>
                    ))}
					{data_kana_o_p.map((data) => (
                        <div key={data.id} className="px-3 w-1/3 md:w-1/6 hover:opacity-80">
                            <Link href={`${data.class}/${data.latinName}`.replace(" ", "_")}>
                                <Image src={data.thumbImg.url} alt="thumbnail" width={300} height={200} style={{objectFit:"contain"}}/>
                                <h2 className="py-3 mb-2 text-xs md:text-base text-center text-gray-700 font-medium">{data.japaneseName}</h2>
                            </Link>
                        </div>
                    ))}

				</div>
            </div>
        </Layout>
    )
}