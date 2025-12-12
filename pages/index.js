import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { client } from "/libs/client";
import Layout from "/components/Layout";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import YouTube from "react-youtube";
// import { Timeline } from "react-twitter-widgets"
import { getOptimizedMicroCMSImage } from "/libs/utils";
import { useState, useMemo, useEffect } from "react";

// SSG
export const getStaticProps = async() => {
    const data_fish = await client.get({ endpoint: "uwphoto", queries: { filters: `book[contains]魚`, orders: `-updatedAt`, limit: 70}});
    // const data_crustacean = await client.get({ endpoint: "uwphoto", queries: { filters: `book[contains]魚`, orders: `-updatedAt` }});
    // const data_seaslug = await client.get({ endpoint: "uwphoto", queries: { filters: `book[contains]魚`, orders: `-updatedAt` }});
    const data_blog = await client.get({ endpoint: "blog", queries: { filters: 'is_top[equals]true', orders: 'updatedAt', limit: 3 }
    });

    return {
        props: {
            data_fish: data_fish.contents,
            data_blog: data_blog.contents,
        },
    };
};


function Home({data_fish, data_blog}) {
    const description = '伊豆を中心に国内外を問わず未だ見ぬ魚を探して潜っているトラベルダイバーの"僕のだいびんぐらむ"です。個人で撮影した生態写真で魚図鑑を制作しています。'

    const [formStatus, setFormStatus] = useState('idle');
    const [isContactOpen, setIsContactOpen] = useState(false);

    // ▼ 人気の魚データ用ステート
    const [popularFish, setPopularFish] = useState([]);

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "僕のだいびんぐらむ",
        "url": "https://www.my-divingram.com/"
    };

    // ▼ APIからデータを取得
    useEffect(() => {
        const fetchPopularFish = async () => {
            try {
                const res = await fetch('/api/popular-fish');
                if (res.ok) {
                    const data = await res.json();
                    setPopularFish(data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchPopularFish();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus('loading');

        const formData = {
            name: e.target.name.value,
            email: e.target.email.value,
            message: e.target.message.value,
        };

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setFormStatus('success');
                e.target.reset();
            } else {
                setFormStatus('error');
            }
        } catch (error) {
            setFormStatus('error');
        }
    };

    return (
        <Layout title="僕のだいびんぐらむ" description={description} url="https://www.my-divingram.com/" imageUrl="https://www.my-divingram.com/img/logo/favicon_small.jpg">

            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />
            </Head>

            <div className="px-5 md:px-20">

                <h1 className="pt-10 mb-2 text-xl md:text-2xl text-center text-sky-800 font-black">RECORD</h1>
                <p className="text-xs text-center text-gray-500 mb-8 tracking-wider">Last Updated : {data_fish[0].updatedAt.substr(0,10)}</p>

                <Splide options={{type:"loop", gap:"24px", drag:"free", perPage:10, breakpoints:{640:{perPage:3}}, autoScroll:{pauseOnHover:true, pauseOnFocus:false, rewind:false, speed:0.3}}} extensions={{AutoScroll}}>
                    {data_fish.map((data) => (
                        <SplideSlide key={data.id}>
                            <div className="hover:opacity-80">
                                <Link href={`/fish/${data.class}/${data.latinName}`.replaceAll(" ", "_")}>
                                    <Image src={getOptimizedMicroCMSImage(data.thumbImg.url, 300)} alt={data.japaneseName} width={300} height={200} style={{objectFit:"contain"}} unoptimized={true} priority={true}/>
                                    <h2 className="pt-3 pb-5 text-xs md:text-sm text-center text-gray-700 font-medium">{data.japaneseName}</h2>
                                </Link>
                            </div>
                        </SplideSlide>
                    ))}
                </Splide>

                {popularFish.length > 0 && (
                    <div className="pt-10 mb-8">
                        <h1 className="text-xl md:text-2xl text-center text-sky-800 font-black mb-2">TREND</h1>
                        <p className="text-xs text-center text-gray-500 mb-6 tracking-wider">本日のアクセスランキング</p>

                        <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-3 md:gap-6 px-10 md:px-0">
                            {[0, 1].map((colIndex) => {
                                const half = Math.ceil(popularFish.length / 2);
                                const columnData = colIndex === 0
                                    ? popularFish.slice(0, half)
                                    : popularFish.slice(half);

                                return (
                                    <div key={colIndex} className="flex flex-col gap-3 w-full max-w-[360px]">
                                        {columnData.map((fish, i) => {
                                            const rank = colIndex === 0 ? i + 1 : i + 1 + half;

                                            let badgeColor = "bg-gray-100 text-gray-500 border-gray-100";
                                            if (rank === 1) badgeColor = "bg-yellow-400 text-white border-yellow-400 shadow-sm";
                                            if (rank === 2) badgeColor = "bg-gray-400 text-white border-gray-400 shadow-sm";
                                            if (rank === 3) badgeColor = "bg-orange-400 text-white border-orange-400 shadow-sm";

                                            return (
                                                <Link key={fish.path} href={fish.path}>
                                                    <div className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-sky-200 transition-all group cursor-pointer h-full">
                                                        <div className="flex items-center gap-3 overflow-hidden w-full">
                                                            <span className={`
                                                                flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full text-sm font-black border-2
                                                                ${badgeColor}
                                                            `}>
                                                                {rank}
                                                            </span>
                                                            <div className="flex flex-col min-w-0 flex-1">
                                                                <span className="text-sm font-bold text-gray-700 group-hover:text-sky-700 truncate block">
                                                                    {fish.japaneseName || fish.latinName}
                                                                </span>
                                                                {fish.japaneseName && (
                                                                    <span className="text-xs text-gray-400 italic font-mono truncate block">
                                                                        {fish.latinName}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="text-xs text-gray-400 whitespace-nowrap ml-2 pl-2 border-l border-gray-100 flex-shrink-0">
                                                            {fish.views} <span className="text-[10px]">views</span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                <h1 className="pt-10 mb-2 text-xl md:text-2xl text-center text-sky-800 font-black">水中生物図鑑</h1>
                <p className="text-xs text-center text-gray-500 mb-8 tracking-wider">海や河川で出会った生き物たち</p>

                <div className="md:flex md:space-x-5 justify-center">
                    <div className="pb-2 px-10 md:px-0 flex justify-center items-center hover:opacity-80">
                        <Link href="fish">
                            <Image src="/img/book/fish.jpeg" alt="fish" width={360} height={240} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-lg md:text-xl text-center text-gray-700 font-medium">僕らむの魚図鑑</h2>
                        </Link>
                    </div>
                    <div className="pb-2 px-10 md:px-0 flex justify-center items-center hover:opacity-80">
                        <Link href="https://www.my-divingram.com/blog/ewm3zlrgu3h">
                            <Image src="/img/book/seaslug.png" alt="seaslug" width={360} height={240} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-lg md:text-xl text-center text-gray-700 font-medium">僕らむのウミウシ図鑑</h2>
                        </Link>
                    </div>
                    {/* <div className="px-10 md:px-0 flex justify-center items-center hover:opacity-80">
                        <Link href="crustacean">
                            <Image src="/img/book/crustacean.png" alt="crustacean" width={300} height={200} style={{objectFit:"contain"}}/>
                            <h2 className="py-3 text-lg md:text-xl text-center text-gray-700 font-medium">甲殻類図鑑・その他</h2>
                        </Link>
                    </div> */}
                </div>


                <div className="pt-10 pb-8">
                    <h1 className="text-xl md:text-2xl text-center text-sky-800 font-black mb-2">BLOG</h1>
                    <p className="text-xs text-center text-gray-500 mb-8 tracking-wider">ダイビングログ・コラム・遠征の作戦会議など</p>

                    <div className="flex flex-col md:flex-row justify-center items-center gap-6 px-10 md:px-0">
                        {data_blog.map((data) => (
                            <Link key={data.id} href={`/blog/${data.id}`} className="group h-full w-full max-w-[360px]">
                                <article className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-gray-100 transform hover:-translate-y-1">
                                    {/* サムネイル画像エリア */}
                                    <div className="relative aspect-video overflow-hidden">
                                        <Image
                                            src={getOptimizedMicroCMSImage(data.thumbnail.url, 600)}
                                            alt={data.title}
                                            width={600}
                                            height={400}
                                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                        />
                                        {/* 日付バッジ */}
                                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-sky-700 shadow-sm">
                                            {data.publishedAt.substr(0,10).replace(/-/g, '.')}
                                        </div>
                                    </div>
                                    {/* テキストエリア */}
                                    <div className="p-5 flex flex-col flex-grow">
                                        <h2 className="text-base md:text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-sky-700 transition-colors">
                                            {data.title}
                                        </h2>
                                        <p className="text-xs md:text-sm text-gray-500 line-clamp-3 mb-4 flex-grow leading-relaxed">
                                            {data.abstruct}
                                        </p>
                                        <div className="flex items-center text-sky-600 text-xs md:text-sm font-bold mt-auto group/btn">
                                            <span>READ MORE</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-1 transition-transform duration-300 group-hover/btn:translate-x-1">
                                                <path fillRule="evenodd" d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                    <div className="mt-10 text-center">
                        <Link href="/blog" className="inline-block px-8 py-3 rounded-full border border-sky-600 text-sky-600 font-bold text-sm hover:bg-sky-600 hover:text-white transition-all duration-300">
                            記事一覧へ
                        </Link>
                    </div>
                </div>


                <h1 className="pt-6 mb-2 text-xl md:text-2xl text-center text-sky-800 font-black" id="youtube">YouTube</h1>
                <p className="text-xs text-center text-gray-500 mb-8 tracking-wider">気まぐれで水中映像を紹介</p>
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


                <h1 className="pt-6 pb-4 text-xl md:text-2xl text-center text-sky-800 font-black" id="contact">CONTACT</h1>

                <div className="max-w-xl mx-auto mb-4">
                    <button
                        type="button"
                        onClick={() => setIsContactOpen(!isContactOpen)}
                        className="relative w-full p-5 text-base font-bold text-gray-700 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col justify-center items-center hover:bg-gray-50 transition-all gap-2"
                    >
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2 text-sky-600">
                                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                            </svg>
                            <span>お問い合わせフォーム</span>
                        </div>

                        <span className="pt-1 text-xs font-normal text-gray-700 text-center">
                            写真提供のご依頼や誤同定のご指摘など，<br className="md:hidden" />お気軽にご連絡ください
                        </span>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className={`absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-transform duration-300 ${isContactOpen ? 'rotate-180' : ''}`}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </button>
                </div>

                {isContactOpen && (
                    <div className="max-w-xl mx-auto bg-white p-6 md:p-10 rounded-2xl shadow-lg mb-20 mt-2 border border-gray-100 animate-fade-in-down">
                        {formStatus === 'success' ? (
                            <div className="text-center py-10">
                                <div className="text-sky-600 text-5xl mb-4">✓</div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">送信完了</h3>
                                <p className="text-gray-600">お問い合わせありがとうございます。<br/>内容を確認次第、ご連絡いたします。</p>
                                <button
                                    onClick={() => {
                                        setFormStatus('idle');
                                        setIsContactOpen(false);
                                    }}
                                    className="mt-6 text-sky-600 underline hover:text-sky-800"
                                >
                                    閉じる
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-1">お名前</label>
                                    <input type="text" id="name" name="name" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none" placeholder="僕のだいびんぐらむ"/>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-1">メールアドレス</label>
                                    <input type="email" id="email" name="email" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none" placeholder="your-email@example.com"/>
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-1">お問い合わせ内容</label>
                                    <textarea id="message" name="message" required rows="5" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none resize-none" placeholder="お問い合わせ内容をご記入ください"></textarea>
                                </div>

                                {formStatus === 'error' && (
                                    <p className="text-red-500 text-sm text-center">送信に失敗しました。時間をおいて再度お試しください。</p>
                                )}

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={formStatus === 'loading'}
                                        className={`w-full py-3 px-6 text-white font-bold rounded-lg shadow-md transition-all ${formStatus === 'loading' ? 'bg-gray-400 cursor-not-allowed' : 'bg-sky-700 hover:bg-sky-800'}`}
                                    >
                                        {formStatus === 'loading' ? '送信中...' : '送信'}
                                    </button>
                                </div>

                                <div className="pt-6 border-t border-gray-100">
                                    <p className="text-xs text-center text-gray-700 mb-4">
                                        SNS (Instagram, Twitter) のDirect Messageからもご連絡いただけます
                                    </p>
                                    <div className="flex justify-center space-x-8">
                                        <Link href="https://www.instagram.com/my_divingram" className="group flex flex-col items-center">
                                            <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 text-sky-600 group-hover:text-sky-800 transition-colors">
                                                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.451 2.53c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                            </svg>
                                        </Link>
                                        <Link href="https://twitter.com/my_divingram" className="group flex flex-col items-center">
                                            <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 text-sky-600 group-hover:text-sky-800 transition-colors">
                                                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>
                )}

            </div>
        </Layout>
    )
}

export default Home