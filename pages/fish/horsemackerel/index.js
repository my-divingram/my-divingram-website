import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data_Seriola = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ブリ属` , limit: 100 }});
	const data_Caranx = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ギンガメアジ属` , limit: 100 }});
	const data_Carangoides = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヨロイアジ属` , limit: 100 }});
	const data_Trachurus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]マアジ属` , limit: 100 }});
	const data_Decapterus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ムロアジ属` , limit: 100 }});
	const data_Pseudocaranx = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]シマアジ属` , limit: 100 }});
	const data_Alectis = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]イトヒキアジ属` , limit: 100 }});
	const data_Uraspis = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]オキアジ属` , limit: 100 }});
	const data_Trachinotus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]コバンアジ属` , limit: 100 }});

	return {
    	props: {
    		data_Seriola: data_Seriola.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Caranx: data_Caranx.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Carangoides: data_Carangoides.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Trachurus: data_Trachurus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Decapterus: data_Decapterus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Pseudocaranx: data_Pseudocaranx.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Alectis: data_Alectis.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Uraspis: data_Uraspis.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Trachinotus: data_Trachinotus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_Seriola, data_Caranx, data_Carangoides, data_Trachurus, data_Decapterus, data_Pseudocaranx, data_Alectis, data_Uraspis, data_Trachinotus}) {

	return (
		<Layout title="アジの仲間">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">アジの仲間</h1>

				<Family family="アジ科"></Family>
				<Genus genus="ブリ属 (Seriola)" data={data_Seriola}></Genus>
				<Genus genus="ギンガメアジ属 (Caranx)" data={data_Caranx}></Genus>
				<Genus genus="ヨロイアジ属 (Carangoides)" data={data_Carangoides}></Genus>
				<Genus genus="マアジ属 (Trachurus)" data={data_Trachurus}></Genus>
				<Genus genus="ムロアジ属 (Decapterus)" data={data_Decapterus}></Genus>
				<Genus genus="シマアジ属 (Pseudocaranx)" data={data_Pseudocaranx}></Genus>
				<Genus genus="イトヒキアジ属 (Alectis)" data={data_Alectis}></Genus>
				<Genus genus="オキアジ属 (Uraspis)" data={data_Uraspis}></Genus>
				<Genus genus="コバンアジ属 (Trachinotus)" data={data_Trachinotus}></Genus>

			</div>
		</Layout>
  	);
}
