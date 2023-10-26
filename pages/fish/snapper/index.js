import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data_Lutjanus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]フエダイ属` , limit: 100 }});
	const data_Aphareus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]イシフエダイ属` , limit: 100 }});
	const data_Macolor = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]マダラタルミ属` , limit: 100 }});
	const data_Paracaesio = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]アオダイ属` , limit: 100 }});
	const data_Aprion = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]アオチビキ属` , limit: 100 }});

	return {
    	props: {
    		data_Lutjanus: data_Lutjanus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Aphareus: data_Aphareus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Macolor: data_Macolor.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Paracaesio: data_Paracaesio.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Aprion: data_Aprion.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_Lutjanus, data_Aphareus, data_Macolor, data_Paracaesio, data_Aprion}) {

	return (
		<Layout title="フエダイの仲間">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">フエダイの仲間</h1>

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
