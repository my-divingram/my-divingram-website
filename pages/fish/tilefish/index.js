import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data = await client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]tilefish` , limit: 1 }});
	const data_Branchiostegus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]アマダイ属` , limit: 100 }});
	const data_Malacanthus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]キツネアマダイ属` , limit: 100 }});
	const data_Hoplolatilus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]サンゴアマダイ属` , limit: 100 }});

	return {
    	props: {
			data_num: data.totalCount,
    		data_Branchiostegus: data_Branchiostegus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Malacanthus: data_Malacanthus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Hoplolatilus: data_Hoplolatilus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_num, data_Malacanthus, data_Hoplolatilus}) {

	return (
		<Layout title="アマダイの仲間">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">アマダイの仲間</h1>
				<p className="pt-2 text-xs md:text-sm text-center text-gray-700 font-medium">掲載種 (未記載種を含む) : {data_num}種</p>

				<Family family="アマダイ科"></Family>
				<Genus genus="アマダイ属 (Branchiostegus)" data={data_Branchiostegus}></Genus>

				<Family family="キツネアマダイ科"></Family>
				<Genus genus="サンゴアマダイ属 (Hoplolatilus)" data={data_Hoplolatilus}></Genus>
				<Genus genus="キツネアマダイ属 (Malacanthus)" data={data_Malacanthus}></Genus>

			</div>
		</Layout>
  	);
}
