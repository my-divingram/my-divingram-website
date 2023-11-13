import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data_Platax = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ツバメウオ属` , limit: 100 }});

	return {
    	props: {
    		data_Platax: data_Platax.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_Platax}) {

	return (
		<Layout title="ツバメウオの仲間">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">ツバメウオの仲間</h1>

				<Family family="マンジュウダイ科"></Family>
				<Genus genus="ツバメウオ属 (Platax)" data={data_Platax}></Genus>

			</div>
		</Layout>
  	);
}
