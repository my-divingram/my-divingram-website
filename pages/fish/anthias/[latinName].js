import { client } from "/libs/client";
import Layout from "/components/Layout";
import { Species } from "@/components/Species";

// SSG
export const getStaticProps = async (context) => {
    const latinName = context.params.latinName;
    const pagedata = await client.get({ endpoint: "uwphoto", queries: { filters: `latinName[equals]${latinName}`.replace("_", " "), limit:1 }});

    return {
        props: {
            pagedata: pagedata.contents[0],
        },
    };
};

export const getStaticPaths = async() => {
    const data = await client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]anthias`, limit: 100 }});
    const paths = data.contents.map((content) => `/fish/${content.class}/${content.latinName}`.replace(" ", "_"));

    return {
        paths,
        fallback: false,
    };
};


export default function IndividualPage({pagedata}){

    return (
        <Layout title={pagedata.japaneseName}>
            <Species classes="ハナダイの仲間" pagedata={pagedata}></Species>
        </Layout>
    )
}