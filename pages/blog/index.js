import Link from "next/link";
import Image from "next/image";
import { client } from "/libs/client";
import Layout from "/components/Layout";

// SSG
export const getStaticProps = async() => {
    const data_blog = await client.get({ endpoint: "blog", queries: {orders: `-createdAt`, limit: 100}});

    return {
        props: {
            data_blog: data_blog.contents,
        },
    };
};


function Home({data_blog}) {
    const description = "僕らむが遠征の作戦会議や魚の見分け方、小ネタ等を綴るブログです。"

    return (
        <Layout title="僕らむのBLOG" description={description} url="https://my-divingram-website.vercel.app/blog" imageUrl="https://my-divingram-website.vercel.app/img/logo/ornate.png">

            <div className="px-3 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

                <h1 className="pt-10 pb-5 text-xl md:text-2xl text-center text-sky-800 font-black">BLOG</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 px-15">
                    {data_blog.map((data) => (
                        <Link key={data.id} href={`/blog/${data.id}`}>
                            <div className="px-5 py-5">
                                <div className="hover:opacity-80 text-center items-center bg-white px-5 py-5 rounded-xl">
                                    <div className="flex justify-center items-center">
                                        <Image src={data.thumbnail.url} alt="thumbnail" width={360} height={240} style={{objectFit:"contain"}}/>
                                    </div>
                                    <p className="pt-3 pb-1 text-base md:text-xl text-center text-gray-700 font-black">{data.title}</p>
                                    <p className="pb-1 text-sm md:text-base text-center text-gray-700">{data.publishedAt.substr(0,10)}</p>
                                    <p className="text-xs md:text-sm text-center text-gray-700">{data.abstruct.substr(0,130)}…</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default Home