import Link from "next/link";
import Image from "next/image";
import { client } from "/libs/client";
import Layout from "/components/Layout";
import { getOptimizedMicroCMSImage } from "/libs/utils";

// SSG
export const getStaticProps = async() => {
    const data_blog = await client.get({ endpoint: "blog", queries: {orders: `-publishedAt`, limit: 100}});

    return {
        props: {
            data_blog: data_blog.contents,
        },
    };
};

function Home({data_blog}) {
    const description = "僕らむが遠征の作戦会議や魚の見分け方，小ネタ等を綴るブログです"

    return (
        <Layout title="僕らむのBLOG" description={description} url="https://www.my-divingram.com/blog" imageUrl="https://www.my-divingram.com/img/logo/favicon_small.jpg">

            <div className="min-h-screen pb-20">

                {/* ヘッダーエリア */}
                <div className="pt-10 pb-6 px-5">
                    <h1 className="text-xl md:text-2xl text-center text-sky-800 font-black mb-3 tracking-wide">BLOG</h1>
                </div>

                {/* 記事一覧エリア */}
                <div className="px-10 md:px-20 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {data_blog.map((data) => (
                            <Link key={data.id} href={`/blog/${data.id}`} className="group h-full w-full max-w-[360px] mx-auto">
                                <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col transform hover:-translate-y-1"> 
                                    {/* サムネイル画像エリア */}
                                    <div className="relative aspect-video overflow-hidden bg-gray-100">
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

                                    {/* コンテンツエリア */}
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h2 className="text-base md:text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-sky-700 transition-colors">
                                            {data.title}
                                        </h2>
                                        <p className="text-xs md:text-sm text-gray-500 line-clamp-3 mb-5 flex-grow leading-relaxed">
                                            {data.abstruct}
                                        </p>
                                        <div className="flex items-center text-sky-600 text-xs md:text-sm font-bold mt-auto group/btn pt-4 border-t border-gray-50">
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
                </div>
            </div>
        </Layout>
    )
}

export default Home