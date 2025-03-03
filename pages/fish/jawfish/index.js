import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data = await client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]jawfish` , limit: 1 }});
	const data_Opistognathus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]アゴアマダイ属` , limit: 100 }});

	return {
    	props: {
			data_num: data.totalCount,
    		data_Opistognathus: data_Opistognathus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_num, data_Opistognathus}) {

	return (
		<Layout title="アゴアマダイの仲間 | 僕らむの魚図鑑" description="アゴアマダイの仲間の一覧です" url="https://www.my-divingram.com/fish/jawfish" imageUrl="https://www.my-divingram.com/img/class/jawfish.jpeg">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">アゴアマダイの仲間</h1>
				<p className="pt-2 text-xs md:text-sm text-center text-gray-700 font-medium">掲載種 : {data_num}種</p>

				<Family family="アゴアマダイ科"></Family>
				<Genus genus="アゴアマダイ属 (Opistognathus)" data={data_Opistognathus}></Genus>

			</div>
		</Layout>
  	);
}
