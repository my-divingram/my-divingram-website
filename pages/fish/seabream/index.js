import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data_Pagrus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]マダイ属` , limit: 100 }});
	const data_Acanthopagrus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]クロダイ属` , limit: 100 }});

	return {
    	props: {
    		data_Pagrus: data_Pagrus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Acanthopagrus: data_Acanthopagrus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_Pagrus, data_Acanthopagrus}) {

	return (
		<Layout title="タイの仲間">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">タイの仲間</h1>

				<Family family="タイ科"></Family>
				<Genus genus="マダイ属 (Pagrus)" data={data_Pagrus}></Genus>
				<Genus genus="クロダイ属 (Acanthopagrus)" data={data_Acanthopagrus}></Genus>

			</div>
		</Layout>
  	);
}
