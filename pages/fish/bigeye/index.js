import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data = await client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]bigeye` , limit: 1 }});
	const data_Priacanthus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]キントキダイ属` , limit: 100 }});
	const data_Heteropriacanthus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ゴマヒレキントキ属` , limit: 100 }});

	return {
    	props: {
			data_num: data.totalCount,
    		data_Priacanthus: data_Priacanthus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Heteropriacanthus: data_Heteropriacanthus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_num, data_Priacanthus, data_Heteropriacanthus}) {

	return (
		<Layout title="キントキダイの仲間 | 僕らむの魚図鑑" description="キントキダイの仲間の一覧です" url="https://www.my-divingram.com/fish/bigeye" imageUrl="https://www.my-divingram.com/img/class/bigeye.jpeg">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">キントキダイの仲間</h1>
				<p className="pt-2 text-xs md:text-sm text-center text-gray-700 font-medium">掲載種 : {data_num}種</p>

				<Family family="キントキダイ科"></Family>
				<Genus genus="ゴマヒレキントキ属 (Heteropriacanthus)" data={data_Heteropriacanthus}></Genus>
				<Genus genus="キントキダイ属 (Priacanthus)" data={data_Priacanthus}></Genus>
			</div>
		</Layout>
  	);
}
