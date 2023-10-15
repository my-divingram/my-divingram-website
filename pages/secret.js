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
    const data_fish = await client.get({ endpoint: "uwphoto", queries: { filters: `book[contains]魚`, orders: `-updatedAt`, limit: 30}});
    // const data_crustacean = await client.get({ endpoint: "uwphoto", queries: { filters: `book[contains]魚`, orders: `-updatedAt` }});
    // const data_seaslug = await client.get({ endpoint: "uwphoto", queries: { filters: `book[contains]魚`, orders: `-updatedAt` }});

    return {
        props: {
            data_fish: data_fish.contents,
        },
    };
};

// 29行目と31行目, 一番下を変更

function Home({data_fish}) {

    return (
        <Layout title="僕のだいびんぐらむ" bg_color_to="bg-sky-700">

            <div class="px-5 md:px-20 bg-gradient-to-b from-white to-sky-700">

                <h1 class="pt-10 pb-3 text-xl md:text-2xl text-center text-sky-800 font-black">Recent Updates</h1>
                <p class="pb-5 text-sm md:text-lg text-center text-gray-700 font-medium">Last Updated : {data_fish[0].updatedAt.substr(0,10)}</p>

                <Splide options={{type:"loop", gap:"24px", drag:"free", perPage:10, breakpoints:{640:{perPage:3}}, autoScroll:{pauseOnHover:true, pauseOnFocus:false, rewind:false, speed:0.3}}} extensions={{AutoScroll}}>
                    {data_fish.map((data) => (
                        <SplideSlide key={data.id}>
                            <div class="hover:opacity-80">
                                <Link href={`/fish/anthias/${data.latinName}`.replace(" ", "_")}>
                                    <Image src={data.thumbImg.url} alt="thumbnail" width={300} height={200} style={{objectFit:"contain"}}/>
                                    <h2 class="pt-3 pb-5 text-xs md:text-sm text-center text-gray-700 font-medium">{data.japaneseName}</h2>
                                </Link>
                            </div>
                        </SplideSlide>
                    ))}
                </Splide>


                <h1 class="pt-10 pb-6 text-xl md:text-2xl text-center text-sky-800 font-black">僕の水中生物図鑑</h1>

                <div class="md:flex md:space-x-5 justify-center">
                    <div class="flex justify-center items-center hover:opacity-80">
                        <Link href="fish">
                            <Image src="/img/book/fish.jpeg" alt="fish" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 class="py-3 text-lg md:text-xl text-center text-gray-700 font-medium">魚図鑑</h2>
                        </Link>
                    </div>
                    {/* <div class="flex justify-center items-center hover:opacity-80">
                        <Link href="crustacean">
                            <Image src="/img/book/crustacean.png" alt="crustacean" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 class="py-3 text-lg md:text-xl text-center text-gray-700 font-medium">甲殻類図鑑・その他</h2>
                        </Link>
                    </div>
                    <div class="flex justify-center items-center hover:opacity-80">
                        <Link href="seaslug">
                            <Image src="/img/book/seaslug.png" alt="seaslug" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 class="py-3 text-lg md:text-xl text-center text-gray-700 font-medium">ウミウシ図鑑</h2>
                        </Link>
                    </div> */}
                </div>


                <h1 class="pt-10 pb-6 text-xl md:text-2xl text-center text-sky-800 font-black" id="youtube">YouTube</h1>
                <div class="pb-2 flex justify-center">
                    <Splide options={{rewind:true, width:400, height:200, pagination:true,}}>
                        <SplideSlide>
                            <div class="flex justify-center">
                                <YouTube videoId="i2eKq2Lj394" opts={{height:162, width:288}}></YouTube>
                            </div>
                        </SplideSlide>
                        <SplideSlide>
                            <div class="flex justify-center">
                                <YouTube videoId="cTp7IrHZie0" opts={{height:162, width:288}}></YouTube>
                            </div>
                        </SplideSlide>
                    </Splide>
                </div>



                <h1 class="pt-10 pb-6 text-xl md:text-2xl text-center text-sky-800 font-black" id="contact">CONTACT</h1>

                <div class="pb-5 flex justify-center space-x-5">
                    <div class="h-10 w-10 bg-gray-500 rounded-xl hover:opacity-50 flex justify-center items-center">
                        <Link href="https://www.instagram.com/my_divingram">
                            <Image src="/img/logo/instagram.svg" alt="instagram" width={24} height={24} style={{objectFit:"contain"}}/>
                        </Link>
                    </div>
                    <div class="h-10 w-10 pl-0.5 bg-gray-500 rounded-xl hover:opacity-50 flex justify-center items-center">
                        <Link href="https://twitter.com/my_divingram">
                            <Image src="/img/logo/twitter.svg" alt="twitter" width={24} height={24} style={{objectFit:"contain"}}/>
                        </Link>
                    </div>
                    <div class="h-10 w-10 bg-gray-500 rounded-xl hover:opacity-50 flex justify-center items-center">
                        <Link href="https://youtube.com/@my_divingram">
                            <Image src="/img/logo/youtube.png" alt="youtube" width={26} height={24} style={{objectFit:"contain"}}/>
                        </Link>
                    </div>
                </div>

                <p class="pb-5 text-xs md:text-base text-center text-gray-700 font-medium" id="contact">写真提供依頼，誤同定のご指摘などは各SNSのDMまでお願いします</p>
                <p class="text-xl text-center text-white font-black" id="contact">Breathe deeply and dive deeply!</p>


                {/* <h1 class="pt-10 pb-5 text-xl md:text-2xl text-center text-sky-800 font-black">Twitter</h1>

                <div class="flex justify-center">
                    <Timeline dataSource={{sourceType: 'profile', screenName: 'my_divingram'}} options={{width:'400', height:'800'}}></Timeline>
                </div> */}
            </div>
        </Layout>
    )
}

export default Home


// youtube
// blog