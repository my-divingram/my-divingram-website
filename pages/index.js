import Link from "next/link";
import Image from "next/image";
import { client } from "/libs/client";
import Layout from "/components/Layout";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import YouTube from "react-youtube";
// import { Timeline } from "react-twitter-widgets"

// SSG
export const getStaticProps = async() => {
    const data_fish = await client.get({ endpoint: "uwphoto", queries: { filters: `book[contains]魚`, orders: `-updatedAt`, limit: 70}});
    // const data_crustacean = await client.get({ endpoint: "uwphoto", queries: { filters: `book[contains]魚`, orders: `-updatedAt` }});
    // const data_seaslug = await client.get({ endpoint: "uwphoto", queries: { filters: `book[contains]魚`, orders: `-updatedAt` }});
    const data_blog = await client.get({ endpoint: "blog", queries: {orders: `-createdAt`, limit: 3}});

    return {
        props: {
            data_fish: data_fish.contents,
            data_blog: data_blog.contents,
        },
    };
};


function Home({data_fish, data_blog}) {
    const description = '伊豆を中心に国内外を問わず魚を求めて潜っているトラベルダイバーの"僕のだいびんぐらむ"です。個人で撮影した生態写真で魚図鑑を制作しています。'

    return (
        <Layout title="僕のだいびんぐらむ" description={description} url="https://www.my-divingram.com/" imageUrl="https://www.my-divingram.com/img/logo/ornate.png">

            <div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100">

                <h1 className="pt-10 pb-3 text-xl md:text-2xl text-center text-sky-800 font-black">Recent Updates</h1>
                <p className="pb-5 text-sm md:text-lg text-center text-gray-700 font-medium">Last Updated : {data_fish[0].updatedAt.substr(0,10)}</p>

                <Splide options={{type:"loop", gap:"24px", drag:"free", perPage:10, breakpoints:{640:{perPage:3}}, autoScroll:{pauseOnHover:true, pauseOnFocus:false, rewind:false, speed:0.3}}} extensions={{AutoScroll}}>
                    {data_fish.map((data) => (
                        <SplideSlide key={data.id}>
                            <div className="hover:opacity-80">
                                <Link href={`/fish/${data.class}/${data.latinName}`.replace(" ", "_")}>
                                    <Image src={data.thumbImg.url} alt="thumbnail" width={300} height={200} style={{objectFit:"contain"}} unoptimized/>
                                    <h2 className="pt-3 pb-5 text-xs md:text-sm text-center text-gray-700 font-medium">{data.japaneseName}</h2>
                                </Link>
                            </div>
                        </SplideSlide>
                    ))}
                </Splide>


                <h1 className="pt-10 pb-6 text-xl md:text-2xl text-center text-sky-800 font-black">水中生物図鑑</h1>

                <div className="md:flex md:space-x-5 justify-center">
                    <div className="px-10 md:px-0 flex justify-center items-center hover:opacity-80">
                        <Link href="fish">
                            <Image src="/img/book/fish.jpeg" alt="fish" width={360} height={240} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-lg md:text-xl text-center text-gray-700 font-medium">僕らむの魚図鑑</h2>
                        </Link>
                    </div>
                    {/* <div className="px-10 md:px-0 flex justify-center items-center hover:opacity-80">
                        <Link href="crustacean">
                            <Image src="/img/book/crustacean.png" alt="crustacean" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-lg md:text-xl text-center text-gray-700 font-medium">甲殻類図鑑・その他</h2>
                        </Link>
                    </div>
                    <div className="px-10 md:px-0 flex justify-center items-center hover:opacity-80">
                        <Link href="seaslug">
                            <Image src="/img/book/seaslug.png" alt="seaslug" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-lg md:text-xl text-center text-gray-700 font-medium">ウミウシ図鑑</h2>
                        </Link>
                    </div> */}
                </div>


                <h1 className="pt-10 pb-6 text-xl md:text-2xl text-center text-sky-800 font-black">BLOG</h1>
                <p className="mb-3 text-xs md:text-base text-center text-gray-700 font-medium">他の記事は<Link href="/blog" className="hover:opacity-50 underline">こちら</Link></p>
                <div className="grid grid-cols-1 md:grid-cols-3 px-15">
                    {data_blog.map((data) => (
                        <Link key={data.id} href={`/blog/${data.id}`}>
                            <div className="px-5 py-2">
                                <div className="hover:opacity-80 text-center items-center bg-white px-5 py-5 rounded-xl">
                                    <p className="pt-1 pb-1 text-base md:text-xl text-center text-gray-700 font-black">{data.title}</p>
                                    <p className="pb-2 text-sm md:text-base text-center text-gray-700">{data.publishedAt.substr(0,10)}</p>
                                    <div className="flex space-x-3 justify-center items-center">
                                        <Image src={data.thumbnail.url} alt="thumbnail" width={120} height={80} style={{objectFit:"contain"}}/>
                                        <p className="text-xs md:text-sm text-center text-gray-700">{data.abstruct.substr(0,75)}…</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>


                <h1 className="pt-10 pb-6 text-xl md:text-2xl text-center text-sky-800 font-black" id="youtube">YouTube</h1>
                <div className="pb-2 flex justify-center">
                    <Splide options={{rewind:true, width:400, height:200, pagination:true,}}>
                        <SplideSlide>
                            <div className="flex justify-center">
                                <YouTube videoId="i2eKq2Lj394" opts={{height:162, width:288}}></YouTube>
                            </div>
                        </SplideSlide>
                        <SplideSlide>
                            <div className="flex justify-center">
                                <YouTube videoId="cTp7IrHZie0" opts={{height:162, width:288}}></YouTube>
                            </div>
                        </SplideSlide>
                    </Splide>
                </div>



                <h1 className="pt-10 pb-6 text-xl md:text-2xl text-center text-sky-800 font-black" id="contact">CONTACT</h1>

                <div className="pb-5 flex justify-center space-x-5">
                    <div className="h-10 w-10 bg-gray-500 rounded-xl hover:opacity-50 flex justify-center items-center">
                        <Link href="https://www.instagram.com/my_divingram">
                            <Image src="/img/logo/instagram.svg" alt="instagram" width={24} height={24} style={{objectFit:"contain"}}/>
                        </Link>
                    </div>
                    <div className="h-10 w-10 pl-0.5 bg-gray-500 rounded-xl hover:opacity-50 flex justify-center items-center">
                        <Link href="https://twitter.com/my_divingram">
                            <Image src="/img/logo/twitter.svg" alt="twitter" width={24} height={24} style={{objectFit:"contain"}}/>
                        </Link>
                    </div>
                    <div className="h-10 w-10 bg-gray-500 rounded-xl hover:opacity-50 flex justify-center items-center">
                        <Link href="https://youtube.com/@my_divingram">
                            <Image src="/img/logo/youtube.png" alt="youtube" width={26} height={24} style={{objectFit:"contain"}}/>
                        </Link>
                    </div>
                </div>

                <p className="pb-5 text-xs md:text-base text-center text-gray-700 font-medium" id="contact">写真提供依頼，誤同定のご指摘などは各SNSのDMまでお願いします</p>


                {/* <h1 className="pt-10 pb-5 text-xl md:text-2xl text-center text-sky-800 font-black">Twitter</h1>

                <div className="flex justify-center">
                    <Timeline dataSource={{sourceType: 'profile', screenName: 'my_divingram'}} options={{width:'400', height:'800'}}></Timeline>
                </div> */}
            </div>
        </Layout>
    )
}

export default Home


// youtube
// blog