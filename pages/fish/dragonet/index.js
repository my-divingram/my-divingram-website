import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data = await client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]dragonet` , limit: 1 }});
	const data_Minysynchiropus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヒメテグリ属` , limit: 100 }});
	const data_Diplogrammus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]コブヌメリ属` , limit: 100 }});
	const data_Neosynchiropus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]コウワンテグリ属` , limit: 100 }});
	const data_Dactylopus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]イッポンテグリ属` , limit: 100 }});
	const data_Pterosynchiropus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ニシキテグリ属` , limit: 100 }});
	const data_indet = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ネズッポ科属不明` , limit: 100 }});
	const data_Paradiplogrammus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ハナビヌメリ属` , limit: 100 }});

	return {
    	props: {
			data_num: data.totalCount,
    		data_Minysynchiropus: data_Minysynchiropus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Diplogrammus: data_Diplogrammus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Neosynchiropus: data_Neosynchiropus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Dactylopus: data_Dactylopus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_indet: data_indet.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Pterosynchiropus: data_Pterosynchiropus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Paradiplogrammus: data_Paradiplogrammus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_num, data_Minysynchiropus, data_Diplogrammus, data_Neosynchiropus, data_Dactylopus, data_indet, data_Pterosynchiropus, data_Paradiplogrammus}) {

	return (
		<Layout title="ネズッポの仲間 | 僕らむの魚図鑑" description="ネズッポの仲間の一覧です" url="https://my-divingram-website.vercel.app/fish/dragonet" imageUrl="https://my-divingram-website.vercel.app/img/class/dragonet.jpeg">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">ネズッポの仲間</h1>
				<p className="pt-2 text-xs md:text-sm text-center text-gray-700 font-medium">掲載種 (未記載種を含む) : {data_num}種</p>

				<Family family="ネズッポ科"></Family>
				<Genus genus="イッポンテグリ属 (Dactylopus)" data={data_Dactylopus}></Genus>
				<Genus genus="コブヌメリ属 (Diplogrammus)" data={data_Diplogrammus}></Genus>
				<Genus genus="ヒメテグリ属 (Minysynchiropus)" data={data_Minysynchiropus}></Genus>
				<Genus genus="コウワンテグリ属 (Neosynchiropus)" data={data_Neosynchiropus}></Genus>
				<Genus genus="ハナビヌメリ属 (Paradiplogrammus)" data={data_Paradiplogrammus}></Genus>
				<Genus genus="ニシキテグリ属 (Pterosynchiropus)" data={data_Pterosynchiropus}></Genus>
				<Genus genus="属不明 (Callionymidae, indet. gen.)" data={data_indet}></Genus>

			</div>
		</Layout>
  	);
}
