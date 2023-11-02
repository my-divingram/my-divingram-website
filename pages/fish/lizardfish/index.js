import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data_Synodus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]アカエソ属` , limit: 100 }});
	const data_Trachinocephalus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]オキエソ属` , limit: 100 }});
	const data_Saurida = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]マエソ属` , limit: 100 }});
	const data_Pseudotrichonotus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ホタテエソ属` , limit: 100 }});

	return {
    	props: {
    		data_Synodus: data_Synodus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Trachinocephalus: data_Trachinocephalus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Saurida: data_Saurida.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Pseudotrichonotus: data_Pseudotrichonotus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_Synodus, data_Trachinocephalus, data_Saurida, data_Pseudotrichonotus}) {

	return (
		<Layout title="エソの仲間">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">エソの仲間</h1>

				<Family family="ホタテエソ科"></Family>
				<Genus genus="ホタテエソ属 (Pseudotrichonotus)" data={data_Pseudotrichonotus}></Genus>

				<Family family="エソ科"></Family>
				<Genus genus="マエソ属 (Saurida)" data={data_Saurida}></Genus>
				<Genus genus="アカエソ属 (Synodus)" data={data_Synodus}></Genus>
				<Genus genus="オキエソ属 (Trachinocephalus)" data={data_Trachinocephalus}></Genus>

			</div>
		</Layout>
  	);
}
