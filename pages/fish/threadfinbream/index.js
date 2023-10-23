import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data_Pentapodus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]キツネウオ属` , limit: 100 }});
	const data_Scolopsis = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヨコシマタマガシラ属` , limit: 100 }});

	return {
    	props: {
    		data_Pentapodus: data_Pentapodus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Scolopsis: data_Scolopsis.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_Pentapodus, data_Scolopsis}) {

	return (
		<Layout title="イトヨリダイの仲間">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">イトヨリダイの仲間</h1>

				<Family family="イトヨリダイ科"></Family>
				<Genus genus="キツネウオ属 (Pentapodus)" data={data_Pentapodus}></Genus>
				<Genus genus="ヨコシマタマガシラ属 (Scolopsis)" data={data_Scolopsis}></Genus>

			</div>
		</Layout>
  	);
}
