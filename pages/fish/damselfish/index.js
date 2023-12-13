import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data = await client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]damselfish` , limit: 1 }});
	const data_Chrysiptera = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ルリスズメダイ属` , limit: 100 }});
	const data_Pomacentrus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ソラスズメダイ属` , limit: 100 }});
	const data_Chromis = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]スズメダイ属` , limit: 100 }});
	const data_Pomachromis = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]オキナワスズメダイ属` , limit: 100 }});
	const data_Abudefduf = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]オヤビッチャ属` , limit: 100 }});
	const data_Amphiprion = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]クマノミ属` , limit: 100 }});
	const data_Plectroglyphidodon = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]イシガキスズメダイ属` , limit: 100 }});
	const data_Amblyglyphidodon = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]クラカオスズメダイ属` , limit: 100 }});
	const data_Neoglyphidodon = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヒレナガスズメダイ属` , limit: 100 }});
	const data_Premnas = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]Premnas` , limit: 100 }});
	const data_Stegastes = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]クロソラスズメダイ属` , limit: 100 }});
	const data_Azurina = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ササスズメダイ属` , limit: 100 }});
	const data_Neopomacentrus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]リボンスズメダイ属` , limit: 100 }});
	const data_Dascyllus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ミスジリュウキュウスズメダイ属` , limit: 100 }});
	const data_Pycnochromis = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヒメスズメダイ属` , limit: 100 }});
	const data_Amblypomacentrus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ミスジスズメダイ属` , limit: 100 }});
	const data_Dischistodus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ダンダラスズメダイ属` , limit: 100 }});
	const data_Lepidozygus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ハナダイダマシ属` , limit: 100 }});

	return {
    	props: {
			data_num: data.totalCount,
    		data_Chrysiptera: data_Chrysiptera.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Pomacentrus: data_Pomacentrus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Chromis: data_Chromis.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Pomachromis: data_Pomachromis.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Abudefduf: data_Abudefduf.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Amphiprion: data_Amphiprion.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Plectroglyphidodon: data_Plectroglyphidodon.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Amblyglyphidodon: data_Amblyglyphidodon.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Neoglyphidodon: data_Neoglyphidodon.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Premnas: data_Premnas.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Stegastes: data_Stegastes.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Azurina: data_Azurina.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Neopomacentrus: data_Neopomacentrus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Dascyllus: data_Dascyllus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Pycnochromis: data_Pycnochromis.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Amblypomacentrus: data_Amblypomacentrus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Dischistodus: data_Dischistodus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Lepidozygus: data_Lepidozygus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_num, data_Chrysiptera, data_Pomacentrus, data_Chromis, data_Pomachromis, data_Abudefduf, data_Amphiprion, data_Plectroglyphidodon, data_Amblyglyphidodon, data_Neoglyphidodon, data_Premnas, data_Stegastes, data_Azurina, data_Neopomacentrus, data_Dascyllus, data_Pycnochromis, data_Amblypomacentrus, data_Dischistodus, data_Lepidozygus}) {

	return (
		<Layout title="スズメダイの仲間">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">スズメダイの仲間</h1>
				<p className="pt-2 text-xs md:text-sm text-center text-gray-700 font-medium">掲載種 : {data_num}種</p>

				<Family family="スズメダイ科"></Family>
				<Genus genus="ササスズメダイ属 (Azurina)" data={data_Azurina}></Genus>
				<Genus genus="スズメダイ属 (Chromis)" data={data_Chromis}></Genus>
				<Genus genus="ミスジリュウキュウスズメダイ属 (Dascyllus)" data={data_Dascyllus}></Genus>
				<Genus genus="ヒメスズメダイ属 (Pycnochromis)" data={data_Pycnochromis}></Genus>
				<Genus genus="オヤビッチャ属 (Abudefduf)" data={data_Abudefduf}></Genus>
				<Genus genus="ハナダイダマシ属 (Lepidozygus)" data={data_Lepidozygus}></Genus>
				<Genus genus="イシガキスズメダイ属 (Plectroglyphidodon)" data={data_Plectroglyphidodon}></Genus>
				<Genus genus="クロソラスズメダイ属 (Stegastes)" data={data_Stegastes}></Genus>
				<Genus genus="クマノミ属 (Amphiprion)" data={data_Amphiprion}></Genus>
				<Genus genus="Premnas属" data={data_Premnas}></Genus>
				<Genus genus="ルリスズメダイ属 (Chrysiptera)" data={data_Chrysiptera}></Genus>
				<Genus genus="ダンダラスズメダイ属 (Dischistodus)" data={data_Dischistodus}></Genus>
				<Genus genus="オキナワスズメダイ属 (Pomachromis)" data={data_Pomachromis}></Genus>
				<Genus genus="クラカオスズメダイ属 (Amblyglyphidodon)" data={data_Amblyglyphidodon}></Genus>
				<Genus genus="ヒレナガスズメダイ属 (Neoglyphidodon)" data={data_Neoglyphidodon}></Genus>
				<Genus genus="ミスジスズメダイ属 (Amblypomacentrus)" data={data_Amblypomacentrus}></Genus>
				<Genus genus="リボンスズメダイ属 (Neopomacentrus)" data={data_Neopomacentrus}></Genus>
				<Genus genus="ソラスズメダイ属 (Pomacentrus)" data={data_Pomacentrus}></Genus>

			</div>
		</Layout>
  	);
}
