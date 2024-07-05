import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data = await client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]horsemackerel` , limit: 1 }});
	const data_Seriola = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ブリ属` , limit: 100 }});
	const data_Caranx = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ギンガメアジ属` , limit: 100 }});
	const data_Craterognathus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]インドカイワリ属` , limit: 100 }});
	const data_Flavocaranx = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]コガネアジ属` , limit: 100 }});
	const data_Trachurus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]マアジ属` , limit: 100 }});
	const data_Decapterus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ムロアジ属` , limit: 100 }});
	const data_Ferdaiua = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ナンヨウカイワリ属` , limit: 100 }});
	const data_Pseudocaranx = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]シマアジ属` , limit: 100 }});
	const data_Alectis = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]イトヒキアジ属` , limit: 100 }});
	const data_Uraspis = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]オキアジ属` , limit: 100 }});
	const data_Trachinotus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]コバンアジ属` , limit: 100 }});
	const data_Atule = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]マテアジ属` , limit: 100 }});

	return {
    	props: {
			data_num: data.totalCount,
    		data_Seriola: data_Seriola.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Caranx: data_Caranx.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Craterognathus: data_Craterognathus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Flavocaranx: data_Flavocaranx.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Trachurus: data_Trachurus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Decapterus: data_Decapterus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Ferdaiua: data_Ferdaiua.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Pseudocaranx: data_Pseudocaranx.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Alectis: data_Alectis.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Uraspis: data_Uraspis.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Trachinotus: data_Trachinotus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Atule: data_Atule.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_num, data_Seriola, data_Caranx, data_Craterognathus, data_Flavocaranx, data_Trachurus, data_Decapterus, data_Ferdaiua, data_Pseudocaranx, data_Alectis, data_Uraspis, data_Trachinotus, data_Atule}) {

	return (
		<Layout title="アジの仲間 | 僕らむの魚図鑑" description="アジの仲間の一覧です" url="https://my-divingram-website.vercel.app/fish/horsemackerel" imageUrl="https://my-divingram-website.vercel.app/img/class/horsemackerel.png">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">アジの仲間</h1>
				<p className="pt-2 text-xs md:text-sm text-center text-gray-700 font-medium">掲載種 : {data_num}種</p>

				<Family family="アジ科"></Family>
				<Genus genus="イトヒキアジ属 (Alectis)" data={data_Alectis}></Genus>
				<Genus genus="マテアジ属 (Atule)" data={data_Atule}></Genus>
				<Genus genus="ギンガメアジ属 (Caranx)" data={data_Caranx}></Genus>
				<Genus genus="インドカイワリ属 (Craterognathus)" data={data_Craterognathus}></Genus>
				<Genus genus="ムロアジ属 (Decapterus)" data={data_Decapterus}></Genus>
				<Genus genus="ナンヨウカイワリ属 (Ferdaiua)" data={data_Ferdaiua}></Genus>
				<Genus genus="コガネアジ属 (Flavocaranx)" data={data_Flavocaranx}></Genus>
				<Genus genus="シマアジ属 (Pseudocaranx)" data={data_Pseudocaranx}></Genus>
				<Genus genus="ブリ属 (Seriola)" data={data_Seriola}></Genus>
				<Genus genus="コバンアジ属 (Trachinotus)" data={data_Trachinotus}></Genus>
				<Genus genus="マアジ属 (Trachurus)" data={data_Trachurus}></Genus>
				<Genus genus="オキアジ属 (Uraspis)" data={data_Uraspis}></Genus>

			</div>
		</Layout>
  	);
}
