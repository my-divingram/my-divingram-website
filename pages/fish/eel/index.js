import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data = await client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]eel` , limit: 1 }});
	const data_Ariosoma = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ゴテンアナゴ属` , limit: 100 }});
	const data_Heteroconger = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]チンアナゴ属` , limit: 100 }});
	const data_Gorgasia = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]シンジュアナゴ属` , limit: 100 }});
	const data_Conger = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]クロアナゴ属` , limit: 100 }});

	return {
    	props: {
			data_num: data.totalCount,
    		data_Ariosoma: data_Ariosoma.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Heteroconger: data_Heteroconger.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Gorgasia: data_Gorgasia.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Conger: data_Conger.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_num, data_Ariosoma, data_Heteroconger, data_Gorgasia, data_Conger}) {

	return (
		<Layout title="アナゴの仲間 | 僕らむの魚図鑑" description="アナゴの仲間の一覧です" url="https://www.my-divingram.com/fish/eel" imageUrl="https://www.my-divingram.com/img/class/eel.jpeg">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">アナゴの仲間</h1>
				<p className="pt-2 text-xs md:text-sm text-center text-gray-700 font-medium">掲載種 : {data_num}種</p>

				<Family family="アナゴ科"></Family>
				<Genus genus="ゴテンアナゴ属 (Ariosoma)" data={data_Ariosoma}></Genus>
				<Genus genus="クロアナゴ属 (Conger)" data={data_Conger}></Genus>
				<Genus genus="シンジュアナゴ属 (Gorgasia)" data={data_Gorgasia}></Genus>
				<Genus genus="チンアナゴ属 (Heteroconger)" data={data_Heteroconger}></Genus>

			</div>
		</Layout>
  	);
}
