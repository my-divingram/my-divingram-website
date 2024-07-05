import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data = await client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]emperor` , limit: 1 }});
	const data_Lethrinus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]フエフキダイ属` , limit: 100 }});
	const data_Gnathodentex = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ノコギリダイ属` , limit: 100 }});
	const data_Gymnocranius = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]メイチダイ属` , limit: 100 }});
	const data_Monotaxis = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヨコシマクロダイ属` , limit: 100 }});

	return {
    	props: {
			data_num: data.totalCount,
    		data_Lethrinus: data_Lethrinus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Gnathodentex: data_Gnathodentex.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Gymnocranius: data_Gymnocranius.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Monotaxis: data_Monotaxis.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_num, data_Lethrinus, data_Gnathodentex, data_Gymnocranius, data_Monotaxis}) {

	return (
		<Layout title="フエフキダイの仲間 | 僕らむの魚図鑑" description="フエフキダイの仲間の一覧です" url="https://my-divingram-website.vercel.app/fish/emperor" imageUrl="https://my-divingram-website.vercel.app/img/class/emperor.jpeg">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">フエフキダイの仲間</h1>
				<p className="pt-2 text-xs md:text-sm text-center text-gray-700 font-medium">掲載種 : {data_num}種</p>

				<Family family="フエフキダイ科"></Family>
				<Genus genus="ノコギリダイ属 (Gnathodentex)" data={data_Gnathodentex}></Genus>
				<Genus genus="メイチダイ属 (Gymnocranius)" data={data_Gymnocranius}></Genus>
				<Genus genus="フエフキダイ属 (Lethrinus)" data={data_Lethrinus}></Genus>
				<Genus genus="ヨコシマクロダイ属 (Monotaxis)" data={data_Monotaxis}></Genus>

			</div>
		</Layout>
  	);
}
