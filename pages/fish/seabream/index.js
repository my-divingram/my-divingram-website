import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data = await client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]seabream` , limit: 1 }});
	const data_Pagrus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]マダイ属` , limit: 100 }});
	const data_Acanthopagrus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]クロダイ属` , limit: 100 }});
	const data_Evynnis = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]チダイ属` , limit: 100 }});

	return {
    	props: {
			data_num: data.totalCount,
    		data_Pagrus: data_Pagrus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Acanthopagrus: data_Acanthopagrus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Evynnis: data_Evynnis.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_num, data_Pagrus, data_Acanthopagrus, data_Evynnis}) {

	return (
		<Layout title="タイの仲間">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">タイの仲間</h1>
				<p className="pt-2 text-xs md:text-sm text-center text-gray-700 font-medium">掲載種 : {data_num}種</p>

				<Family family="タイ科"></Family>
				<Genus genus="クロダイ属 (Acanthopagrus)" data={data_Acanthopagrus}></Genus>
				<Genus genus="チダイ属 (Evynnis)" data={data_Evynnis}></Genus>
				<Genus genus="マダイ属 (Pagrus)" data={data_Pagrus}></Genus>

			</div>
		</Layout>
  	);
}
