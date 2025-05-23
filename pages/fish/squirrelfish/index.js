import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data = await client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]squirrelfish` , limit: 1 }});
	const data_Sargocentron = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]イットウダイ属` , limit: 100 }});
	const data_Neoniphon = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ウケグチイットウダイ属` , limit: 100 }});
	const data_Myripristis = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]アカマツカサ属` , limit: 100 }});
	const data_Monocentris = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]マツカサウオ属` , limit: 100 }});
	const data_Pristilepis = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヤセエビス属` , limit: 100 }});
	const data_Aulotrachichthys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ハリダシエビス属` , limit: 100 }});
	const data_Anomalops = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヒカリキンメダイ属` , limit: 100 }});

	return {
    	props: {
			data_num: data.totalCount,
    		data_Sargocentron: data_Sargocentron.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Neoniphon: data_Neoniphon.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Myripristis: data_Myripristis.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Monocentris: data_Monocentris.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Pristilepis: data_Pristilepis.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Aulotrachichthys: data_Aulotrachichthys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Anomalops: data_Anomalops.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_num, data_Sargocentron, data_Neoniphon, data_Myripristis, data_Monocentris, data_Pristilepis, data_Aulotrachichthys, data_Anomalops}) {

	return (
		<Layout title="イットウダイの仲間 | 僕らむの魚図鑑" description="イットウダイの仲間の一覧です" url="https://www.my-divingram.com/fish/squirrelfish" imageUrl="https://www.my-divingram.com/img/class/squirrelfish.jpeg">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">イットウダイの仲間</h1>
				<p className="pt-2 text-xs md:text-sm text-center text-gray-700 font-medium">掲載種 : {data_num}種</p>

				<Family family="イットウダイ科"></Family>
				<Genus genus="アカマツカサ属 (Myripristis)" data={data_Myripristis}></Genus>
				<Genus genus="ウケグチイットウダイ属 (Neoniphon)" data={data_Neoniphon}></Genus>
				<Genus genus="ヤセエビス属 (Pristilepis)" data={data_Pristilepis}></Genus>
				<Genus genus="イットウダイ属 (Sargocentron)" data={data_Sargocentron}></Genus>

				<Family family="ヒウチダイ科"></Family>
				<Genus genus="ハリダシエビス属 (Aulotrachichthys)" data={data_Aulotrachichthys}></Genus>

				<Family family="マツカサウオ科"></Family>
				<Genus genus="マツカサウオ属 (Monocentris)" data={data_Monocentris}></Genus>

				<Family family="ヒカリキンメダイ科"></Family>
				<Genus genus="ヒカリキンメダイ属 (Anomalops)" data={data_Anomalops}></Genus>

			</div>
		</Layout>
  	);
}
