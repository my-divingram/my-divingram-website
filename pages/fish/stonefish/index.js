import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data_Hypodytes = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ハオコゼ属` , limit: 100 }});
	const data_Ablabys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ツマジロオコゼ属` , limit: 100 }});
	const data_Inimicus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]オニオコゼ属` , limit: 100 }});
	const data_Erosa = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ダルマオコゼ属` , limit: 100 }});
	const data_Synanceia = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]オニダルマオコゼ属` , limit: 100 }});

	return {
    	props: {
    		data_Hypodytes: data_Hypodytes.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Ablabys: data_Ablabys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Inimicus: data_Inimicus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Erosa: data_Erosa.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Synanceia: data_Synanceia.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_Hypodytes, data_Ablabys, data_Inimicus, data_Erosa, data_Synanceia}) {

	return (
		<Layout title="オコゼの仲間">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">オコゼの仲間</h1>

				<Family family="ハオコゼ科"></Family>
				<Genus genus="ハオコゼ属 (Hypodytes)" data={data_Hypodytes}></Genus>
				<Genus genus="ツマジロオコゼ属 (Ablabys)" data={data_Ablabys}></Genus>

				<Family family="オニオコゼ科"></Family>
				<Genus genus="オニオコゼ属 (Inimicus)" data={data_Inimicus}></Genus>
				<Genus genus="ダルマオコゼ属 (Erosa)" data={data_Erosa}></Genus>
				<Genus genus="オニダルマオコゼ属 (Synanceia)" data={data_Synanceia}></Genus>

			</div>
		</Layout>
  	);
}
