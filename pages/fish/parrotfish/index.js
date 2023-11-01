import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data_Cetoscarus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]イロブダイ属` , limit: 100 }});
	const data_Scarus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]アオブダイ属` , limit: 100 }});
	const data_Chlorurus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ハゲブダイ属` , limit: 100 }});
	const data_Calotomus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ブダイ属` , limit: 100 }});

	return {
    	props: {
    		data_Cetoscarus: data_Cetoscarus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Scarus: data_Scarus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Chlorurus: data_Chlorurus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Calotomus: data_Calotomus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_Cetoscarus, data_Scarus, data_Chlorurus, data_Calotomus}) {

	return (
		<Layout title="ブダイの仲間">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">ブダイの仲間</h1>

				<Family family="ブダイ科"></Family>
				<Genus genus="ブダイ属 (Calotomus)" data={data_Calotomus}></Genus>
				<Genus genus="イロブダイ属 (Cetoscarus)" data={data_Cetoscarus}></Genus>
				<Genus genus="ハゲブダイ属 (Chlorurus)" data={data_Chlorurus}></Genus>
				<Genus genus="アオブダイ属 (Scarus)" data={data_Scarus}></Genus>

			</div>
		</Layout>
  	);
}
