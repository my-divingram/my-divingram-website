import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data = await client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]fusilier` , limit: 1 }});
	const data_Caesio = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]タカサゴ属` , limit: 100 }});
	const data_Pterocaesio = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]クマササハナムロ属` , limit: 100 }});

	return {
    	props: {
			data_num: data.totalCount,
    		data_Caesio: data_Caesio.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Pterocaesio: data_Pterocaesio.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_num, data_Caesio, data_Pterocaesio}) {

	return (
		<Layout title="タカサゴの仲間">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">タカサゴの仲間</h1>
				<p className="pt-2 text-xs md:text-sm text-center text-gray-700 font-medium">掲載種 : {data_num}種</p>

				<Family family="タカサゴ科"></Family>
				<Genus genus="タカサゴ属 (Caesio)" data={data_Caesio}></Genus>
				<Genus genus="クマササハナムロ属 (Pterocaesio)" data={data_Pterocaesio}></Genus>

			</div>
		</Layout>
  	);
}
