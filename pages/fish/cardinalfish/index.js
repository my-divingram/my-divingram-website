import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data = await client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]cardinalfish` , limit: 1 }});
	const data_Ostorhinchus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]スジイシモチ属` , limit: 100 }});
	const data_Pristiapogon = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヒトスジイシモチ属` , limit: 100 }});
	const data_Cheilodipterus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヤライイシモチ属` , limit: 100 }});
	const data_Siphamia = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヒカリイシモチ属` , limit: 100 }});
	const data_Pristicon = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]アカヒレイシモチ属` , limit: 100 }});
	const data_Sphaeramia = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]マンジュウイシモチ属` , limit: 100 }});
	const data_Rhabdamia = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]スカシテンジクダイ属` , limit: 100 }});
	const data_Cercamia = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]サクラテンジクダイ属` , limit: 100 }});
	const data_Apogon = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]コミナトテンジクダイ属` , limit: 100 }});
	const data_Pseudamia = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヌメリテンジクダイ属` , limit: 100 }});
	const data_Apogonichthyoides = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]カクレテンジクダイ属` , limit: 100 }});
	const data_Foa = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]タイワンマトイシモチ属` , limit: 100 }});

	return {
    	props: {
			data_num: data.totalCount,
    		data_Ostorhinchus: data_Ostorhinchus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Pristiapogon: data_Pristiapogon.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Cheilodipterus: data_Cheilodipterus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Siphamia: data_Siphamia.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Pristicon: data_Pristicon.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Sphaeramia: data_Sphaeramia.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Rhabdamia: data_Rhabdamia.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Cercamia: data_Cercamia.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Apogon: data_Apogon.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Pseudamia: data_Pseudamia.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Apogonichthyoides: data_Apogonichthyoides.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Foa: data_Foa.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_num, data_Ostorhinchus, data_Pristiapogon, data_Cheilodipterus, data_Siphamia, data_Pristicon, data_Sphaeramia, data_Rhabdamia, data_Cercamia, data_Apogon, data_Pseudamia, data_Apogonichthyoides, data_Foa}) {

	return (
		<Layout title="テンジクダイの仲間">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">テンジクダイの仲間</h1>
				<p className="pt-2 text-xs md:text-sm text-center text-gray-700 font-medium">掲載種 : {data_num}種</p>

				<Family family="テンジクダイ科"></Family>
				<Genus genus="コミナトテンジクダイ属 (Apogon)" data={data_Apogon}></Genus>
				<Genus genus="カクレテンジクダイ属 (Apogonichthyoides)" data={data_Apogonichthyoides}></Genus>
				<Genus genus="サクラテンジクダイ属 (Cercamia)" data={data_Cercamia}></Genus>
				<Genus genus="ヤライイシモチ属 (Cheilodipterus)" data={data_Cheilodipterus}></Genus>
				<Genus genus="タイワンマトイシモチ属 (Foa)" data={data_Foa}></Genus>
				<Genus genus="スジイシモチ属 (Ostorhinchus)" data={data_Ostorhinchus}></Genus>
				<Genus genus="ヒトスジイシモチ属 (Pristiapogon)" data={data_Pristiapogon}></Genus>
				<Genus genus="アカヒレイシモチ属 (Pristicon)" data={data_Pristicon}></Genus>
				<Genus genus="ヌメリテンジクダイ属 (Pseudamia)" data={data_Pseudamia}></Genus>
				<Genus genus="スカシテンジクダイ属 (Rhabdamia)" data={data_Rhabdamia}></Genus>
				<Genus genus="ヒカリイシモチ属 (Siphamia)" data={data_Siphamia}></Genus>
				<Genus genus="マンジュウイシモチ属 (Sphaeramia)" data={data_Sphaeramia}></Genus>

			</div>
		</Layout>
  	);
}
