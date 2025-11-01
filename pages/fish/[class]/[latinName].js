import { client } from "/libs/client";
import Layout from "/components/Layout";
import { Species } from "@/components/Species";
import { fetchAllPages } from "/libs/fetch_all_pages";
import { categoryList } from "/constants/categories";

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
    const description = `${pagedata.japaneseName}の生態写真です`
    const url = `https.www.my-divingram.com/fish/${pagedata.class}/${pagedata.latinName}`.replace(" ", "_")

    // pagedata.class (例: "goby") から、categoryList (例: { name: "ハゼの仲間", href: "fish/goby", ... }) を探す
    const category = categoryList.find(
        cat => cat.href === `fish/${pagedata.class}`
    );

    // オブジェクトから ".name" (文字列) を取り出す。もし category が見つからなければ、pagedata.class をフォールバックとして使用
    const className = category ? category.name : pagedata.class;

    return (
        <Layout title={title} description={description} url={url} imageUrl={pagedata.thumbImg.url}>
            <Species classes={className} pagedata={pagedata}></Species>
        </Layout>
    )
}