import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data = await client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]snapper` , limit: 1 }});
	const data_Lutjanus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]フエダイ属` , limit: 100 }});
	const data_Aphareus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]イシフエダイ属` , limit: 100 }});
	const data_Macolor = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]マダラタルミ属` , limit: 100 }});
	const data_Paracaesio = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]アオダイ属` , limit: 100 }});
	const data_Aprion = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]アオチビキ属` , limit: 100 }});

	return {
    	props: {
			data_num: data.totalCount,
    		data_Lutjanus: data_Lutjanus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Aphareus: data_Aphareus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Macolor: data_Macolor.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Paracaesio: data_Paracaesio.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Aprion: data_Aprion.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_num, data_Lutjanus, data_Aphareus, data_Macolor, data_Paracaesio, data_Aprion}) {

	return (
		<Layout title="フエダイの仲間 | 僕らむの魚図鑑" description="フエダイの仲間の一覧です" url="https://my-divingram-website.vercel.app/fish/snapper" imageUrl="https://my-divingram-website.vercel.app/img/class/snapper.jpeg">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">フエダイの仲間</h1>
				<p className="pt-2 text-xs md:text-sm text-center text-gray-700 font-medium">掲載種 : {data_num}種</p>

				<Family family="フエダイ科"></Family>
				<Genus genus="イシフエダイ属 (Aphareus)" data={data_Aphareus}></Genus>
				<Genus genus="アオチビキ属 (Aprion)" data={data_Aprion}></Genus>
				<Genus genus="フエダイ属 (Lutjanus)" data={data_Lutjanus}></Genus>
				<Genus genus="マダラタルミ属 (Macolor)" data={data_Macolor}></Genus>
				<Genus genus="アオダイ属 (Paracaesio)" data={data_Paracaesio}></Genus>

			</div>
		</Layout>
  	);
}
