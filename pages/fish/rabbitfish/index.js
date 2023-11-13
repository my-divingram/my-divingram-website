import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data_Siganus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]アイゴ属` , limit: 100 }});

	return {
    	props: {
    		data_Siganus: data_Siganus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_Siganus}) {

	return (
		<Layout title="アイゴの仲間">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">アイゴの仲間</h1>

				<Family family="アイゴ科"></Family>
				<Genus genus="アイゴ属 (Siganus)" data={data_Siganus}></Genus>

			</div>
		</Layout>
  	);
}
