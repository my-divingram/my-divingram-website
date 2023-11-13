import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data_Zebrasoma = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヒレナガハギ属` , limit: 100 }});
	const data_Acanthurus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]クロハギ属` , limit: 100 }});
	const data_Ctenochaetus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]サザナミハギ属` , limit: 100 }});
	const data_Naso = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]テングハギ属` , limit: 100 }});
	const data_Paracanthurus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ナンヨウハギ属` , limit: 100 }});
	const data_Prionurus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ニザダイ属` , limit: 100 }});

	return {
    	props: {
    		data_Zebrasoma: data_Zebrasoma.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Acanthurus: data_Acanthurus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Ctenochaetus: data_Ctenochaetus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Naso: data_Naso.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Paracanthurus: data_Paracanthurus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Prionurus: data_Prionurus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_Zebrasoma, data_Acanthurus, data_Ctenochaetus, data_Naso, data_Paracanthurus, data_Prionurus}) {

	return (
		<Layout title="ニザダイの仲間">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">ニザダイの仲間</h1>

				<Family family="ニザダイ科"></Family>
				<Genus genus="クロハギ属 (Acanthurus)" data={data_Acanthurus}></Genus>
				<Genus genus="サザナミハギ属 (Ctenochaetus)" data={data_Ctenochaetus}></Genus>
				<Genus genus="テングハギ属 (Naso)" data={data_Naso}></Genus>
				<Genus genus="ナンヨウハギ属 (Paracanthurus)" data={data_Paracanthurus}></Genus>
				<Genus genus="ニザダイ属 (Prionurus)" data={data_Prionurus}></Genus>
				<Genus genus="ヒレナガハギ属 (Zebrasoma)" data={data_Zebrasoma}></Genus>

			</div>
		</Layout>
  	);
}
