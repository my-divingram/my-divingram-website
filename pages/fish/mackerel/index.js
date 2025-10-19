import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data = await client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]mackerel` , limit: 1 }});
	const data_Acanthocybium = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]カマスサワラ属` , limit: 100 }});
	const data_Gymnosarda = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]イソマグロ属` , limit: 100 }});
	const data_Rastrelliger = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]グルクマ属` , limit: 100 }});
	const data_Grammatorcynus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ニジョウサバ属` , limit: 100 }});

	return {
    	props: {
			data_num: data.totalCount,
    		data_Acanthocybium: data_Acanthocybium.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Gymnosarda: data_Gymnosarda.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Rastrelliger: data_Rastrelliger.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Grammatorcynus: data_Grammatorcynus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_num, data_Acanthocybium, data_Gymnosarda, data_Rastrelliger, data_Grammatorcynus}) {

	return (
		<Layout title="サバの仲間 | 僕らむの魚図鑑" description="サバの仲間の一覧です" url="https://www.my-divingram.com/fish/mackerel" imageUrl="https://www.my-divingram.com/img/class/mackerel.png">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">サバの仲間</h1>
				<p className="pt-2 text-xs md:text-sm text-center text-gray-700 font-medium">掲載種 : {data_num}種</p>

				<Family family="サバ科"></Family>
				<Genus genus="カマスサワラ属 (Acanthocybium)" data={data_Acanthocybium}></Genus>
				<Genus genus="ニジョウサバ属 (Grammatorcynus)" data={data_Grammatorcynus}></Genus>
				<Genus genus="イソマグロ属 (Gymnosarda)" data={data_Gymnosarda}></Genus>
				<Genus genus="グルクマ属 (Rastrelliger)" data={data_Rastrelliger}></Genus>

			</div>
		</Layout>
  	);
}
