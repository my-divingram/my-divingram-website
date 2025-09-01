import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data = await client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]threadfinbream` , limit: 1 }});
	const data_Pentapodus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]キツネウオ属` , limit: 100 }});
	const data_Scolopsis = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヨコシマタマガシラ属` , limit: 100 }});
	const data_Parascolopsis = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]タマガシラ属` , limit: 100 }});
	const data_Nemipterus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]イトヨリダイ属` , limit: 100 }});

	return {
    	props: {
			data_num: data.totalCount,
    		data_Pentapodus: data_Pentapodus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Scolopsis: data_Scolopsis.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Parascolopsis: data_Parascolopsis.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Nemipterus: data_Nemipterus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_num, data_Pentapodus, data_Scolopsis, data_Parascolopsis, data_Nemipterus}) {

	return (
		<Layout title="イトヨリダイの仲間 | 僕らむの魚図鑑" description="イトヨリダイの仲間の一覧です" url="https://www.my-divingram.com/fish/threadfinbream" imageUrl="https://www.my-divingram.com/img/class/threadfinbream.jpeg">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">イトヨリダイの仲間</h1>
				<p className="pt-2 text-xs md:text-sm text-center text-gray-700 font-medium">掲載種 : {data_num}種</p>

				<Family family="イトヨリダイ科"></Family>
				<Genus genus="イトヨリダイ属 (Nemipterus)" data={data_Nemipterus}></Genus>
				<Genus genus="タマガシラ属 (Parascolopsis)" data={data_Parascolopsis}></Genus>
				<Genus genus="キツネウオ属 (Pentapodus)" data={data_Pentapodus}></Genus>
				<Genus genus="ヨコシマタマガシラ属 (Scolopsis)" data={data_Scolopsis}></Genus>

			</div>
		</Layout>
  	);
}
