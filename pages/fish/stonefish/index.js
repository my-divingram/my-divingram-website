import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data = await client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]stonefish` , limit: 1 }});
	const data_Paracentropogon = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ハオコゼ属` , limit: 100 }});
	const data_Ablabys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ツマジロオコゼ属` , limit: 100 }});
	const data_Inimicus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]オニオコゼ属` , limit: 100 }});
	const data_Erosa = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ダルマオコゼ属` , limit: 100 }});
	const data_Synanceia = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]オニダルマオコゼ属` , limit: 100 }});
	const data_Paraploactis = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]カゴシマオコゼ属` , limit: 100 }});
	const data_Acanthosphex = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]Acanthosphex` , limit: 100 }});

	return {
    	props: {
			data_num: data.totalCount,
    		data_Paracentropogon: data_Paracentropogon.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Ablabys: data_Ablabys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Inimicus: data_Inimicus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Erosa: data_Erosa.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Synanceia: data_Synanceia.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Paraploactis: data_Paraploactis.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Acanthosphex: data_Acanthosphex.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_num, data_Paracentropogon, data_Ablabys, data_Inimicus, data_Erosa, data_Synanceia, data_Paraploactis, data_Acanthosphex}) {

	return (
		<Layout title="オコゼの仲間 | 僕らむの魚図鑑" description="オコゼの仲間の一覧です" url="https://www.my-divingram.com/fish/stonefish" imageUrl="https://www.my-divingram.com/img/class/stonefish.jpeg">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">オコゼの仲間</h1>
				<p className="pt-2 text-xs md:text-sm text-center text-gray-700 font-medium">掲載種 : {data_num}種</p>

				<Family family="オニオコゼ科"></Family>
				<Genus genus="ダルマオコゼ属 (Erosa)" data={data_Erosa}></Genus>
				<Genus genus="オニオコゼ属 (Inimicus)" data={data_Inimicus}></Genus>
				<Genus genus="オニダルマオコゼ属 (Synanceia)" data={data_Synanceia}></Genus>

				<Family family="ハオコゼ科"></Family>
				<Genus genus="ツマジロオコゼ属 (Ablabys)" data={data_Ablabys}></Genus>
				<Genus genus="ハオコゼ属 (Paracentropogon)" data={data_Paracentropogon}></Genus>

				<Family family="イボオコゼ科"></Family>
				<Genus genus="Acanthosphex属" data={data_Acanthosphex}></Genus>
				<Genus genus="カゴシマオコゼ属 (Paraploactis)" data={data_Paraploactis}></Genus>

			</div>
		</Layout>
  	);
}
