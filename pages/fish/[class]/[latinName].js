import Head from "next/head";
import { client } from "/libs/client";
import Layout from "/components/Layout";
import { Species } from "@/components/Species";
import { fetchAllPages } from "/libs/fetch_all_pages";
import { categoryList } from "/constants/categories";
import { useRouter } from "next/router";
import { useEffect } from "react";

/**
 * microCMSから取得した latinName を表示用に整形する
 * (ルール1: "sp" で終わる場合は "sp." にする)
 * (ルール2: "sp.-1" などを "sp.1" にする)
 */
function formatLatinNameForDisplay(latinName) {
    if (!latinName) return "";
    let display = latinName;
    display = display.replace(/(sp\.)-(\d+)/g, 'sp.$2');
    if (display.endsWith('sp') && !display.endsWith('.sp')) {
        display = display + '.';
    }
    return display;
}

// SSG
export const getStaticProps = async (context) => {
    const latinName = context.params.latinName;
    const pagedata = await client.get({
        endpoint: "uwphoto",
        queries: {
            filters: `latinName[equals]${latinName}`.replace("_", " "),
            limit: 1
        }
    });

    return {
        props: {
            pagedata: pagedata.contents[0],
        },
    };
};

export const getStaticPaths = async() => {

    // "全カテゴリ" の "全魚種" の `class` と `latinName` をfetchAllPages を使って、件数上限なく取得する
    const allFish = await fetchAllPages("uwphoto", {
        filters: `book[contains]魚`,
        fields: 'class,latinName'
    });

    // 全魚種データからパス ( /fish/[class]/[latinName] ) の配列を生成
    const paths = allFish.map((content) =>
        `/fish/${content.class}/${content.latinName}`.replace(" ", "_")
    );

    return {
        paths,
        fallback: false,
    };
};

export default function IndividualPage({pagedata}){
    const title = `${pagedata.japaneseName} | 僕らむの魚図鑑`
    const description = `【水中写真】${pagedata.japaneseName}（学名：${pagedata.latinName}）の生態写真です。近似種との見分け方や生息域、生息水深などをダイビングで撮影した写真とともに紹介しています。`
    const url = `https://www.my-divingram.com/fish/${pagedata.class}/${pagedata.latinName}`.replace(" ", "_")

    // pagedata.class (例: "goby") から、categoryList (例: { name: "ハゼの仲間", href: "fish/goby", ... }) を探す
    const category = categoryList.find(
        cat => cat.href === `fish/${pagedata.class}`
    );

    // オブジェクトから ".name" (文字列) を取り出す。もし category が見つからなければ、pagedata.class をフォールバックとして使用
    const className = category ? category.name : pagedata.class;
    const categoryUrl = `/fish/${pagedata.class}`;
    const displayLatinName = formatLatinNameForDisplay(pagedata.latinName);

    // 構造化データ(JSON-LD)の作成 (パンくずリスト用)
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "僕らむの魚図鑑", // 1階層目
                "item": "https://www.my-divingram.com/fish"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": className, // 2階層目 (例: "ハゼの仲間")
                "item": categoryUrl
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": pagedata.japaneseName, // 3階層目 (例: "アカハチハゼ")
                "item": url // このページのURL
            }
        ]
    };

    const router = useRouter();

    useEffect(() => {
        if (router.isReady) {
            const currentPath = router.asPath.split('?')[0];
            fetch('/api/view', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    path: currentPath,
                    japaneseName: pagedata ? pagedata.japaneseName : null
                }),
            }).catch(err => console.error(err));
        }
    }, [router.isReady, router.asPath, pagedata]);

    return (
        <Layout title={title} description={description} url={url} imageUrl={pagedata.thumbImg.url}>
            {/* 構造化データを <Head> に挿入 */}
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />
            </Head>
            <Species
                classes={className}
                categoryUrl={categoryUrl}
                pagedata={{
                    ...pagedata,
                    latinName: displayLatinName
                }}
            />
        </Layout>
    )
}