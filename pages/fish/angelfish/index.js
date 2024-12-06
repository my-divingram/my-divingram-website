import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data = await client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]angelfish` , limit: 1 }});
	const data_Chaetodontoplus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]キンチャクダイ属` , limit: 100 }});
	const data_Genicanthus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]タテジマヤッコ属` , limit: 100 }});
	const data_Centropyge = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]アブラヤッコ属` , limit: 100 }});
	const data_Pomacanthus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]サザナミヤッコ属` , limit: 100 }});
	const data_Pygoplites = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ニシキヤッコ属` , limit: 100 }});
	const data_Apolemichthys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]シテンヤッコ属` , limit: 100 }});
	const data_Paracentropyge = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]シマヤッコ属` , limit: 100 }});

	return {
    	props: {
			data_num: data.totalCount,
    		data_Chaetodontoplus: data_Chaetodontoplus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Genicanthus: data_Genicanthus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Centropyge: data_Centropyge.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Pomacanthus: data_Pomacanthus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Pygoplites: data_Pygoplites.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Apolemichthys: data_Apolemichthys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Paracentropyge: data_Paracentropyge.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_num, data_Chaetodontoplus, data_Genicanthus, data_Centropyge, data_Pomacanthus, data_Pygoplites, data_Apolemichthys, data_Paracentropyge}) {

	return (
		<Layout title="キンチャクダイの仲間 | 僕らむの魚図鑑" description="キンチャクダイの仲間の一覧です" url="https://www.my-divingram.com/fish/angelfish" imageUrl="https://www.my-divingram.com/img/class/angelfish.jpeg">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">キンチャクダイの仲間</h1>
				<p className="pt-2 text-xs md:text-sm text-center text-gray-700 font-medium">掲載種 (ハイブリッドを含む) : {data_num}種</p>

				<Family family="キンチャクダイ科"></Family>
				<Genus genus="シテンヤッコ属 (Apolemichthys)" data={data_Apolemichthys}></Genus>
				<Genus genus="アブラヤッコ属 (Centropyge)" data={data_Centropyge}></Genus>
				<Genus genus="キンチャクダイ属 (Chaetodontoplus)" data={data_Chaetodontoplus}></Genus>
				<Genus genus="タテジマヤッコ属 (Genicanthus)" data={data_Genicanthus}></Genus>
				<Genus genus="シマヤッコ属 (Paracentropyge)" data={data_Paracentropyge}></Genus>
				<Genus genus="サザナミヤッコ属 (Pomacanthus)" data={data_Pomacanthus}></Genus>
				<Genus genus="ニシキヤッコ属 (Pygoplites)" data={data_Pygoplites}></Genus>

			</div>
		</Layout>
  	);
}
