import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data_Parapercis = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]トラギス属` , limit: 100 }});

	return {
    	props: {
			data_Parapercis: data_Parapercis.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_Parapercis}) {

	return (
		<Layout title="トラギスの仲間">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">トラギスの仲間</h1>

				<Family family="トラギス科"></Family>
				<Genus genus="トラギス属 (Parapercis)" data={data_Parapercis}></Genus>
			</div>
		</Layout>
  	);
}
