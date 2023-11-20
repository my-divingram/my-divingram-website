import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data = await client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]puffer` , limit: 1 }});
	const data_Chilomycterus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]イシガキフグ属` , limit: 100 }});
	const data_Arothron = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]モヨウフグ属` , limit: 100 }});
	const data_Takifugu = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]トラフグ属` , limit: 100 }});
	const data_Diodon = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ハリセンボン属` , limit: 100 }});
	const data_Canthigaster = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]キタマクラ属` , limit: 100 }});
	const data_Ostracion = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ハコフグ属` , limit: 100 }});
	const data_Lactoria = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]コンゴウフグ属` , limit: 100 }});
	const data_Cyclichthys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]メイタイシガキフグ属` , limit: 100 }});

	return {
    	props: {
			data_num: data.totalCount,
    		data_Chilomycterus: data_Chilomycterus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Arothron: data_Arothron.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Takifugu: data_Takifugu.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Diodon: data_Diodon.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Canthigaster: data_Canthigaster.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Ostracion: data_Ostracion.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Lactoria: data_Lactoria.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Cyclichthys: data_Cyclichthys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_num, data_Chilomycterus, data_Arothron, data_Takifugu, data_Diodon, data_Canthigaster, data_Ostracion, data_Lactoria, data_Cyclichthys}) {

	return (
		<Layout title="フグの仲間">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">フグの仲間</h1>
				<p className="pt-2 text-xs md:text-sm text-center text-gray-700 font-medium">掲載種 : {data_num}種</p>

				<Family family="ハコフグ科"></Family>
				<Genus genus="コンゴウフグ属 (Lactoria)" data={data_Lactoria}></Genus>
				<Genus genus="ハコフグ属 (Ostracion)" data={data_Ostracion}></Genus>

				<Family family="フグ科"></Family>
				<Genus genus="モヨウフグ属 (Arothron)" data={data_Arothron}></Genus>
				<Genus genus="キタマクラ属 (Canthigaster)" data={data_Canthigaster}></Genus>
				<Genus genus="トラフグ属 (Takifugu)" data={data_Takifugu}></Genus>

				<Family family="ハリセンボン科"></Family>
				<Genus genus="イシガキフグ属 (Chilomycterus)" data={data_Chilomycterus}></Genus>
				<Genus genus="メイタイシガキフグ属 (Cyclichthys)" data={data_Cyclichthys}></Genus>
				<Genus genus="ハリセンボン属 (Diodon)" data={data_Diodon}></Genus>

			</div>
		</Layout>
  	);
}
