import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data = await client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]seachub` , limit: 1 }});
	const data_Kyphosus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]イスズミ属` , limit: 100 }});
	const data_Girella = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]メジナ属` , limit: 100 }});

	return {
    	props: {
			data_num: data.totalCount,
    		data_Kyphosus: data_Kyphosus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Girella: data_Girella.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_num, data_Kyphosus, data_Girella}) {

	return (
		<Layout title="イスズミ・メジナの仲間">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">イスズミ・メジナの仲間</h1>
				<p className="pt-2 text-xs md:text-sm text-center text-gray-700 font-medium">掲載種 : {data_num}種</p>

				<Family family="イスズミ科"></Family>
				<Genus genus="イスズミ属 (Kyphosus)" data={data_Kyphosus}></Genus>

				<Family family="メジナ科"></Family>
				<Genus genus="メジナ属 (Girella)" data={data_Girella}></Genus>

			</div>
		</Layout>
  	);
}
