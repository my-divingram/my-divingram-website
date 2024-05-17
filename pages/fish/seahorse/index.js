import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data = await client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]seahorse` , limit: 1 }});
	const data_Eurypegasus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ウミテング属` , limit: 100 }});
	const data_Fistularia = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヤガラ属` , limit: 100 }});
	const data_Aulostomus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヘラヤガラ属` , limit: 100 }});
	const data_Solenostomus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]カミソリウオ属` , limit: 100 }});
	const data_Halicampus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ウミヤッコ属` , limit: 100 }});
	const data_Festucalex = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]アマクサヨウジ属` , limit: 100 }});
	const data_Corythoichthys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]イシヨウジ属` , limit: 100 }});
	const data_Trachyrhamphus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヒフキヨウジ属` , limit: 100 }});
	const data_Doryrhamphus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヒバシヨウジ属` , limit: 100 }});
	const data_Maroubra = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ダイダイヨウジ属` , limit: 100 }});
	const data_Phoxocampus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ボウヨウジ属` , limit: 100 }});
	const data_Acentronura = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]タツノイトコ属` , limit: 100 }});
	const data_Hippocampus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]タツノオトシゴ属` , limit: 100 }});
	const data_Aeoliscus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヘコアユ属` , limit: 100 }});
	const data_Centriscus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヨロイウオ属` , limit: 100 }});
	const data_Bulbonaricus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]チンヨウジウオ属` , limit: 100 }});

	return {
    	props: {
			data_num: data.totalCount,
    		data_Eurypegasus: data_Eurypegasus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Fistularia: data_Fistularia.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Aulostomus: data_Aulostomus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Solenostomus: data_Solenostomus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Festucalex: data_Festucalex.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Corythoichthys: data_Corythoichthys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Trachyrhamphus: data_Trachyrhamphus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Doryrhamphus: data_Doryrhamphus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Maroubra: data_Maroubra.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Phoxocampus: data_Phoxocampus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Acentronura: data_Acentronura.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Halicampus: data_Halicampus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Hippocampus: data_Hippocampus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Aeoliscus: data_Aeoliscus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Centriscus: data_Centriscus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Bulbonaricus: data_Bulbonaricus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_num, data_Eurypegasus, data_Fistularia, data_Aulostomus, data_Solenostomus, data_Festucalex, data_Halicampus, data_Corythoichthys, data_Trachyrhamphus, data_Doryrhamphus, data_Maroubra, data_Phoxocampus, data_Acentronura, data_Hippocampus, data_Aeoliscus, data_Centriscus, data_Bulbonaricus}) {

	return (
		<Layout title="トゲウオの仲間">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">トゲウオの仲間</h1>
				<p className="pt-2 text-xs md:text-sm text-center text-gray-700 font-medium">掲載種 (未記載種を含む) : {data_num}種</p>

				<Family family="ウミテング科"></Family>
				<Genus genus="ウミテング属 (Eurypegasus)" data={data_Eurypegasus}></Genus>

				<Family family="ヘラヤガラ科"></Family>
				<Genus genus="ヘラヤガラ属 (Aulostomus)" data={data_Aulostomus}></Genus>


				<Family family="ヤガラ科"></Family>
				<Genus genus="ヤガラ属 (Fistularia)" data={data_Fistularia}></Genus>

				<Family family="ヘコアユ科"></Family>
				<Genus genus="ヘコアユ属 (Aeoliscus)" data={data_Aeoliscus}></Genus>
				<Genus genus="ヨロイウオ属 (Centriscus)" data={data_Centriscus}></Genus>

				<Family family="カミソリウオ科"></Family>
				<Genus genus="カミソリウオ属 (Solenostomus)" data={data_Solenostomus}></Genus>

				<Family family="ヨウジウオ科"></Family>
				<Genus genus="タツノイトコ属 (Acentronura)" data={data_Acentronura}></Genus>
				<Genus genus="チンヨウジウオ属 (Bulbonaricus)" data={data_Bulbonaricus}></Genus>
				<Genus genus="イシヨウジ属 (Corythoichthys)" data={data_Corythoichthys}></Genus>
				<Genus genus="ヒバシヨウジ属 (Doryrhamphus)" data={data_Doryrhamphus}></Genus>
				<Genus genus="アマクサヨウジ属 (Festucalex)" data={data_Festucalex}></Genus>
				<Genus genus="ウミヤッコ属 (Halicampus)" data={data_Halicampus}></Genus>
				<Genus genus="タツノオトシゴ属 (Hippocampus)" data={data_Hippocampus}></Genus>
				<Genus genus="ダイダイヨウジ属 (Maroubra)" data={data_Maroubra}></Genus>
				<Genus genus="ボウヨウジ属 (Phoxocampus)" data={data_Phoxocampus}></Genus>
				<Genus genus="ヒフキヨウジ属 (Trachyrhamphus)" data={data_Trachyrhamphus}></Genus>

			</div>
		</Layout>
  	);
}
