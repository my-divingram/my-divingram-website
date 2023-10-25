import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data_Parapriacanthus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]キンメモドキ属` , limit: 100 }});
	const data_Pempheris = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ハタンポ属` , limit: 100 }});

	return {
    	props: {
    		data_Parapriacanthus: data_Parapriacanthus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Pempheris: data_Pempheris.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_Parapriacanthus, data_Pempheris}) {

	return (
		<Layout title="ハタンポの仲間">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">ハタンポの仲間</h1>

				<Family family="ハタンポ科"></Family>
				<Genus genus="キンメモドキ属 (Parapriacanthus)" data={data_Parapriacanthus}></Genus>
				<Genus genus="ハタンポ属 (Pempheris)" data={data_Pempheris}></Genus>

			</div>
		</Layout>
  	);
}