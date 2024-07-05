import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data = await client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]butterflyfish` , limit: 1 }});
	const data_Chaetodon = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]チョウチョウウオ属` , limit: 100 }});
	const data_Hemitaurichthys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]カスミチョウチョウウオ属` , limit: 100 }});
	const data_Roa = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ゲンロクダイ属` , limit: 100 }});
	const data_Coradion = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]タキゲンロクダイ属` , limit: 100 }});
	const data_Heniochus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ハタタテダイ属` , limit: 100 }});
	const data_Forcipiger = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]フエヤッコダイ属` , limit: 100 }});

	return {
    	props: {
			data_num: data.totalCount,
    		data_Chaetodon: data_Chaetodon.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Hemitaurichthys: data_Hemitaurichthys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Roa: data_Roa.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Coradion: data_Coradion.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Heniochus: data_Heniochus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Forcipiger: data_Forcipiger.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_num, data_Chaetodon, data_Hemitaurichthys, data_Roa, data_Coradion, data_Heniochus, data_Forcipiger}) {

	return (
		<Layout title="チョウチョウウオの仲間 | 僕らむの魚図鑑" description="チョウチョウウオの仲間の一覧です" url="https://my-divingram-website.vercel.app/fish/butterflyfish" imageUrl="https://my-divingram-website.vercel.app/img/class/butterflyfish.jpeg">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">チョウチョウウオの仲間</h1>
				<p className="pt-2 text-xs md:text-sm text-center text-gray-700 font-medium">掲載種 : {data_num}種</p>

				<Family family="チョウチョウウオ科"></Family>
				<Genus genus="チョウチョウウオ属 (Chaetodon)" data={data_Chaetodon}></Genus>
				<Genus genus="タキゲンロクダイ属 (Coradion)" data={data_Coradion}></Genus>
				<Genus genus="フエヤッコダイ属 (Forcipiger)" data={data_Forcipiger}></Genus>
				<Genus genus="カスミチョウチョウウオ属 (Hemitaurichthys)" data={data_Hemitaurichthys}></Genus>
				<Genus genus="ハタタテダイ属 (Heniochus)" data={data_Heniochus}></Genus>
				<Genus genus="ゲンロクダイ属 (Roa)" data={data_Roa}></Genus>

			</div>
		</Layout>
  	);
}
