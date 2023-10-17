import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data_Malacanthus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]キツネアマダイ属` , limit: 100 }});
	const data_Hoplolatilus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]サンゴアマダイ属` , limit: 100 }});

	return {
    	props: {
    		data_Malacanthus: data_Malacanthus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Hoplolatilus: data_Hoplolatilus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_Malacanthus, data_Hoplolatilus}) {

	return (
		<Layout title="アマダイの仲間">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">アマダイの仲間</h1>

				<Family family="キツネアマダイ科"></Family>
				<Genus genus="キツネアマダイ属 (Malacanthus)" data={data_Malacanthus}></Genus>
				<Genus genus="サンゴアマダイ属 (Hoplolatilus)" data={data_Hoplolatilus}></Genus>

			</div>
		</Layout>
  	);
}
