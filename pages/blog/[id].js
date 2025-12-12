import { client } from "/libs/client";
import Layout from "/components/Layout";
import { useState, useEffect } from "react";
import Head from "next/head";

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data_blog = await client.get({ endpoint: "blog", contentId: id });

  return {
    props: {
      data_blog: data_blog,
    },
  };
};

export const getStaticPaths = async () => {
  const data_blog = await client.get({ endpoint: "blog", queries: {limit: 100}});
  const paths = data_blog.contents.map((content) => `/blog/${content.id}`);
  return { paths, fallback: false };
};


export default function BlogId({ data_blog }) {
    const title = `${data_blog.title} | 僕らむのBLOG`
    const url = `https://www.my-divingram.com/blog/${data_blog.id}`

    const hasPasswordProtection = data_blog.password && data_blog.password.length > 0;
    const [isAuthenticated, setIsAuthenticated] = useState(!hasPasswordProtection);
    const [inputPassword, setInputPassword] = useState("");
    const [error, setError] = useState("");
    const storageKey = `blog-auth-${data_blog.id}`;

    const baseUrl = "https://www.my-divingram.com";
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "TOP",
                "item": baseUrl
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "BLOG",
                "item": `${baseUrl}/blog`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": data_blog.title,
                "item": url
            }
        ]
    };

    useEffect(() => {
        if (hasPasswordProtection) {
            if (sessionStorage.getItem(storageKey) === "true") {
                setIsAuthenticated(true);
            }
        }
    }, [hasPasswordProtection, storageKey]);

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (inputPassword === data_blog.password) {
            setIsAuthenticated(true);
            sessionStorage.setItem(storageKey, "true");
            setError("");
        } else {
            setError("パスワードが間違っています。");
        }
    };

    if (!isAuthenticated) {
        return (
            <Layout title={title} description="パスワードで保護された記事です" url={url} imageUrl={data_blog.thumbnail.url}>

                <Head>
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                    />
                </Head>

                <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-sky-100 px-5">
                    <form
                        onSubmit={handlePasswordSubmit}
                        className="p-8 bg-white rounded-lg shadow-xl max-w-md w-full"
                    >
                        <h1 className="text-lg font-bold text-gray-700 mb-4 text-center">
                            この記事はパスワードで保護されています。
                        </h1>
                        <input
                            type="password"
                            value={inputPassword}
                            onChange={(e) => setInputPassword(e.target.value)}
                            className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                            placeholder="password"
                        />
                        {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
                        <button
                            type="submit"
                            className="w-full mt-4 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors font-bold"
                        >
                            認証
                        </button>
                    </form>
                </div>
            </Layout>
        );
    }

    return (
      <Layout title={title} description={data_blog.abstruct} url={url} imageUrl={data_blog.thumbnail.url}>

        <div className="px-8 md:px-20 font-sans">

          <h1 className="pt-10 pb-5 text-xl md:text-2xl text-center text-sky-800 font-black">{data_blog.title}</h1>

          <p className="text-sm md:text-base text-center text-gray-700">{data_blog.publishedAt.substr(0,10)}</p>

          <div
              dangerouslySetInnerHTML={{__html: `${data_blog.article}`,}}
              className="
                prose prose-sm md:prose-base
                prose-p:leading-relaxed
                max-w-4xl
                mx-auto
                prose-a:text-sky-600
                prose-figcaption:text-xs
                md:prose-figcaption:text-sm
                prose-figcaption:text-gray-700
                prose-figcaption:text-center
                prose-figcaption:mt-2
                prose-strong:font-extrabold

                prose-h1:bg-sky-800/80
                prose-h1:text-white
                prose-h1:font-bold
                prose-h1:px-6
                prose-h1:py-3
                prose-h1:rounded-lg
                prose-h1:shadow-md
                prose-h1:mt-12
                prose-h1:mb-6
                prose-h1:text-lg
                prose-h1:md:text-xl

                prose-table:bg-white
                prose-table:border-collapse
                prose-table:border
                prose-table:border-gray-500
                prose-th:border
                prose-th:border-gray-500
                prose-td:border
                prose-td:border-gray-500
                prose-th:text-center
                prose-td:text-center
              "
          /></div>
        </Layout>
    );
}