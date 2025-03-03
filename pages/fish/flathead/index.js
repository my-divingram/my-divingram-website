import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data = await client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]flathead` , limit: 1 }});
	const data_Onigocia = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]アネサゴチ属` , limit: 100 }});
	const data_Cociella = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]イネゴチ属` , limit: 100 }});
	const data_Platycephalus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]コチ属` , limit: 100 }});
	const data_Inegocia = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]トカゲゴチ属` , limit: 100 }});
	const data_Thysanophrys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]クロシマゴチ属` , limit: 100 }});

	return {
    	props: {
			data_num: data.totalCount,
    		data_Cociella: data_Cociella.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Thysanophrys: data_Thysanophrys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Platycephalus: data_Platycephalus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Inegocia: data_Inegocia.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Onigocia: data_Onigocia.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_num, data_Onigocia, data_Thysanophrys, data_Platycephalus, data_Inegocia, data_Cociella}) {

	return (
		<Layout title="コチの仲間 | 僕らむの魚図鑑" description="コチの仲間の一覧です" url="https://www.my-divingram.com/fish/flathead" imageUrl="https://www.my-divingram.com/img/class/flathead.jpeg">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">コチの仲間</h1>
				<p className="pt-2 text-xs md:text-sm text-center text-gray-700 font-medium">掲載種 : {data_num}種</p>

				<Family family="コチ科"></Family>
				<Genus genus="イネゴチ属 (Cociella)" data={data_Cociella}></Genus>
				<Genus genus="トカゲゴチ属 (Inegocia)" data={data_Inegocia}></Genus>
				<Genus genus="アネサゴチ属 (Onigocia)" data={data_Onigocia}></Genus>
				<Genus genus="コチ属 (Platycephalus)" data={data_Platycephalus}></Genus>
				<Genus genus="クロシマゴチ属 (Thysanophrys)" data={data_Thysanophrys}></Genus>

			</div>
		</Layout>
  	);
}
