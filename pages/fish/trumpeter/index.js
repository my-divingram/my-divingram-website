import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data_Goniistius = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]タカノハダイ属` , limit: 100 }});

	return {
    	props: {
    		data_Goniistius: data_Goniistius.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_Goniistius}) {

	return (
		<Layout title="タカノハダイの仲間">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">タカノハダイの仲間</h1>

				<Family family="タカノハダイ科"></Family>
				<Genus genus="タカノハダイ属 (Goniistius)" data={data_Goniistius}></Genus>

			</div>
		</Layout>
  	);
}
