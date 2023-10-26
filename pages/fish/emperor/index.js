import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data_Lethrinus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]フエフキダイ属` , limit: 100 }});
	const data_Gnathodentex = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ノコギリダイ属` , limit: 100 }});
	const data_Gymnocranius = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]メイチダイ属` , limit: 100 }});
	const data_Monotaxis = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヨコシマクロダイ属` , limit: 100 }});

	return {
    	props: {
    		data_Lethrinus: data_Lethrinus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Gnathodentex: data_Gnathodentex.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Gymnocranius: data_Gymnocranius.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Monotaxis: data_Monotaxis.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_Lethrinus, data_Gnathodentex, data_Gymnocranius, data_Monotaxis}) {

	return (
		<Layout title="フエフキダイの仲間">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">フエフキダイの仲間</h1>

				<Family family="フエフキダイ科"></Family>
				<Genus genus="ノコギリダイ属 (Gnathodentex)" data={data_Gnathodentex}></Genus>
				<Genus genus="メイチダイ属 (Gymnocranius)" data={data_Gymnocranius}></Genus>
				<Genus genus="フエフキダイ属 (Lethrinus)" data={data_Lethrinus}></Genus>
				<Genus genus="ヨコシマクロダイ属 (Monotaxis)" data={data_Monotaxis}></Genus>

			</div>
		</Layout>
  	);
}
