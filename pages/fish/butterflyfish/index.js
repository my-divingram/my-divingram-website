import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data_Chaetodon = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]チョウチョウウオ属` , limit: 100 }});
	const data_Hemitaurichthys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]カスミチョウチョウウオ属` , limit: 100 }});
	const data_Parachaetodon = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]テンツキチョウチョウウオ属` , limit: 100 }});
	const data_Roa = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ゲンロクダイ属` , limit: 100 }});
	const data_Coradion = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]タキゲンロクダイ属` , limit: 100 }});
	const data_Heniochus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ハタタテダイ属` , limit: 100 }});
	const data_Forcipiger = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]フエヤッコダイ属` , limit: 100 }});

	return {
    	props: {
    		data_Chaetodon: data_Chaetodon.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Hemitaurichthys: data_Hemitaurichthys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Parachaetodon: data_Parachaetodon.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Roa: data_Roa.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Coradion: data_Coradion.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Heniochus: data_Heniochus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Forcipiger: data_Forcipiger.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_Chaetodon, data_Hemitaurichthys, data_Parachaetodon, data_Roa, data_Coradion, data_Heniochus, data_Forcipiger}) {

	return (
		<Layout title="チョウチョウウオの仲間">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">チョウチョウウオの仲間</h1>

				<Family family="チョウチョウウオ科"></Family>
				<Genus genus="チョウチョウウオ属 (Chaetodon)" data={data_Chaetodon}></Genus>
				<Genus genus="カスミチョウチョウウオ属 (Hemitaurichthys)" data={data_Hemitaurichthys}></Genus>
				<Genus genus="テンツキチョウチョウウオ属 (Parachaetodon)" data={data_Parachaetodon}></Genus>
				<Genus genus="ゲンロクダイ属 (Roa)" data={data_Roa}></Genus>
				<Genus genus="タキゲンロクダイ属 (Coradion)" data={data_Coradion}></Genus>
				<Genus genus="ハタタテダイ属 (Heniochus)" data={data_Heniochus}></Genus>
				<Genus genus="フエヤッコダイ属 (Forcipiger)" data={data_Forcipiger}></Genus>

			</div>
		</Layout>
  	);
}
