import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data = await client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]others` , limit: 1 }});
	const data_Acanthocepola = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]アカタチ属` , limit: 100 }});
	const data_Pseudoblennius = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]アナハゼ属` , limit: 100 }});
	const data_Oplegnathus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]イシダイ属` , limit: 100 }});
	const data_Opistognathus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]アゴアマダイ属` , limit: 100 }});
	const data_Hexagrammos = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]アイナメ属` , limit: 100 }});
	const data_Phtheirichthys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]スジコバン属` , limit: 100 }});
	const data_Calloplesiops = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]シモフリタナバタウオ属` , limit: 100 }});
	const data_Gerres = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]クロサギ属` , limit: 100 }});
	const data_Plotosus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ゴンズイ属` , limit: 100 }});
	const data_Spratelloides = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]キビナゴ属` , limit: 100 }});
	const data_Brotula = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]イタチウオ属` , limit: 100 }});
	const data_Cociella = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]イネゴチ属` , limit: 100 }});
	const data_Microcanthus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]カゴカキダイ属` , limit: 100 }});
	const data_Tylosurus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]テンジクダツ属` , limit: 100 }});
	const data_Trachipterus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]サケガシラ属` , limit: 100 }});
	const data_Assessor = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ツバメタナバタウオ属` , limit: 100 }});
	const data_Dactyloptena = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]セミホウボウ属` , limit: 100 }});
	const data_Labracoglossa = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]タカベ属` , limit: 100 }});
	const data_Lotella = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]イソアイナメ属` , limit: 100 }});
	const data_Priacanthus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]キントキダイ属` , limit: 100 }});
	const data_Chelidonichthys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ホウボウ属` , limit: 100 }});
	const data_Metavelifer = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヒメクサアジ属` , limit: 100 }});
	const data_Scombrops = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ムツ属` , limit: 100 }});
	const data_Mugil = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ボラ属` , limit: 100 }});
	const data_Uranoscopus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ミシマオコゼ属` , limit: 100 }});
	const data_Mola = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]マンボウ属` , limit: 100 }});
	const data_Echeneis = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]コバンザメ属` , limit: 100 }});
	const data_Evistias = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]テングダイ属` , limit: 100 }});
	const data_Platycephalus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]コチ属` , limit: 100 }});
	const data_Inegocia = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]トカゲゴチ属` , limit: 100 }});
	const data_Nemichthys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]シギウナギ属` , limit: 100 }});
	const data_Trichiurus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]タチウオ属` , limit: 100 }});
	const data_Psenes = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]スジハナビラウオ属` , limit: 100 }});
	const data_Zeus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]マトウダイ属` , limit: 100 }});
	const data_Alepisaurus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ミズウオ属` , limit: 100 }});
	const data_Physiculus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]チゴダラ属` , limit: 100 }});
	const data_Furcina = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]サラサカジカ属` , limit: 100 }});
	const data_Kuhlia = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ユゴイ属` , limit: 100 }});
	const data_Heteropriacanthus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ゴマヒレキントキ属` , limit: 100 }});
	const data_Lepidotrigla = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]カナガシラ属` , limit: 100 }});
	const data_Zoarchias = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]カズナギ属` , limit: 100 }});
	const data_Eumicrotremus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]イボダンゴ属` , limit: 100 }});
	const data_Liparis = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]クサウオ属` , limit: 100 }});
	const data_Thysanophrys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]クロシマゴチ属` , limit: 100 }});
	const data_Pholidichthys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]Pholidichthys` , limit: 100 }});
	const data_Hypoatherina = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ギンイソイワシ属` , limit: 100 }});
	const data_Lateolabrax = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]スズキ属` , limit: 100 }});
	const data_Ditrema = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ウミタナゴ属` , limit: 100 }});
	const data_Vellitor = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]スイ属` , limit: 100 }});
	const data_Plesiops = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]タナバタウオ属` , limit: 100 }});
	const data_Monodactylus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヒメツバメウオ属` , limit: 100 }});
	const data_Onigocia = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]アネサゴチ属` , limit: 100 }});

	return {
    	props: {
			data_num: data.totalCount,
    		data_Acanthocepola: data_Acanthocepola.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Pseudoblennius: data_Pseudoblennius.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Oplegnathus: data_Oplegnathus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Opistognathus: data_Opistognathus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Hexagrammos: data_Hexagrammos.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Phtheirichthys: data_Phtheirichthys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Calloplesiops: data_Calloplesiops.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Gerres: data_Gerres.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Plotosus: data_Plotosus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Spratelloides: data_Spratelloides.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Brotula: data_Brotula.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Cociella: data_Cociella.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Microcanthus: data_Microcanthus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Tylosurus: data_Tylosurus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Trachipterus: data_Trachipterus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Assessor: data_Assessor.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Dactyloptena: data_Dactyloptena.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Labracoglossa: data_Labracoglossa.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Lotella: data_Lotella.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Priacanthus: data_Priacanthus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Chelidonichthys: data_Chelidonichthys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Metavelifer: data_Metavelifer.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Scombrops: data_Scombrops.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Mugil: data_Mugil.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Uranoscopus: data_Uranoscopus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Mola: data_Mola.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Echeneis: data_Echeneis.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Evistias: data_Evistias.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Platycephalus: data_Platycephalus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Inegocia: data_Inegocia.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Nemichthys: data_Nemichthys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Trichiurus: data_Trichiurus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Psenes: data_Psenes.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Zeus: data_Zeus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Alepisaurus: data_Alepisaurus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Physiculus: data_Physiculus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Furcina: data_Furcina.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Kuhlia: data_Kuhlia.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Heteropriacanthus: data_Heteropriacanthus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Lepidotrigla: data_Lepidotrigla.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Zoarchias: data_Zoarchias.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Eumicrotremus: data_Eumicrotremus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Liparis: data_Liparis.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Thysanophrys: data_Thysanophrys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Pholidichthys: data_Pholidichthys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Hypoatherina: data_Hypoatherina.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Lateolabrax: data_Lateolabrax.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Ditrema: data_Ditrema.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Vellitor: data_Vellitor.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Plesiops: data_Plesiops.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Monodactylus: data_Monodactylus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Onigocia: data_Onigocia.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_num, data_Acanthocepola, data_Pseudoblennius, data_Oplegnathus, data_Opistognathus, data_Hexagrammos, data_Phtheirichthys, data_Calloplesiops, data_Gerres, data_Plotosus, data_Spratelloides, data_Brotula, data_Cociella, data_Microcanthus, data_Tylosurus, data_Trachipterus, data_Assessor, data_Dactyloptena, data_Labracoglossa, data_Lotella, data_Priacanthus, data_Chelidonichthys, data_Metavelifer, data_Scombrops, data_Mugil, data_Uranoscopus, data_Mola, data_Echeneis, data_Evistias, data_Platycephalus, data_Inegocia, data_Nemichthys, data_Trichiurus, data_Psenes, data_Zeus, data_Alepisaurus, data_Physiculus, data_Furcina, data_Kuhlia, data_Heteropriacanthus, data_Lepidotrigla, data_Zoarchias, data_Eumicrotremus, data_Liparis, data_Thysanophrys, data_Pholidichthys, data_Hypoatherina, data_Lateolabrax, data_Ditrema, data_Vellitor, data_Plesiops, data_Monodactylus, data_Onigocia}) {

	return (
		<Layout title="その他の海水魚 | 僕らむの魚図鑑" description="その他の海水魚の一覧です" url="https://my-divingram-website.vercel.app/fish/others" imageUrl="https://my-divingram-website.vercel.app/img/class/others.jpeg">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">その他の海水魚</h1>
				<p className="pt-2 text-xs md:text-sm text-center text-gray-700 font-medium">掲載種 (未記載種を含む) : {data_num}種</p>

				{/* 467 */}
				<Family family="シギウナギ科"></Family>
				<Genus genus="シギウナギ属 (Nemichthys)" data={data_Nemichthys}></Genus>

				{/* 503 */}
				<Family family="キビナゴ科"></Family>
				<Genus genus="キビナゴ属 (Spratelloides)" data={data_Spratelloides}></Genus>

				{/* 641 */}
				<Family family="ゴンズイ科"></Family>
				<Genus genus="ゴンズイ属 (Plotosus)" data={data_Plotosus}></Genus>

				{/* 896 */}
				<Family family="ミズウオ科"></Family>
				<Genus genus="ミズウオ属 (Alepisaurus)" data={data_Alepisaurus}></Genus>

				{/* 1038 */}
				<Family family="クサアジ科"></Family>
				<Genus genus="ヒメクサアジ属 (Metavelifer)" data={data_Metavelifer}></Genus>

				{/* 1046 */}
				<Family family="フリソデウオ科"></Family>
				<Genus genus="サケガシラ属 (Trachipterus)" data={data_Trachipterus}></Genus>

				{/* 1065 */}
				<Family family="チゴダラ科"></Family>
				<Genus genus="イソアイナメ属 (Lotella)" data={data_Lotella}></Genus>
				<Genus genus="チゴダラ属 (Physiculus)" data={data_Physiculus}></Genus>

				{/* 1173 */}
				<Family family="アシロ科"></Family>
				<Genus genus="イタチウオ属 (Brotula)" data={data_Brotula}></Genus>

				{/* 1432 */}
				<Family family="マトウダイ科"></Family>
				<Genus genus="マトウダイ属 (Zeus)" data={data_Zeus}></Genus>

				{/* 1542 */}
				<Family family="ボラ科"></Family>
				<Genus genus="ボラ属 (Mugil)" data={data_Mugil}></Genus>

				{/* 1559 */}
				<Family family="トウゴロウイワシ科"></Family>
				<Genus genus="ギンイソイワシ属 (Hypoatherina)" data={data_Hypoatherina}></Genus>

				{/* 1622 */}
				<Family family="ダツ科"></Family>
				<Genus genus="テンジクダツ属 (Tylosurus)" data={data_Tylosurus}></Genus>

				{/* 1780 */}
				<Family family="ホウボウ科"></Family>
				<Genus genus="ホウボウ属 (Chelidonichthys)" data={data_Chelidonichthys}></Genus>
				<Genus genus="カナガシラ属 (Lepidotrigla)" data={data_Lepidotrigla}></Genus>

				{/* 1821 */}
				<Family family="コチ科"></Family>
				<Genus genus="イネゴチ属 (Cociella)" data={data_Cociella}></Genus>
				<Genus genus="トカゲゴチ属 (Inegocia)" data={data_Inegocia}></Genus>
				<Genus genus="アネサゴチ属 (Onigocia)" data={data_Onigocia}></Genus>
				<Genus genus="コチ属 (Platycephalus)" data={data_Platycephalus}></Genus>
				<Genus genus="クロシマゴチ属 (Thysanophrys)" data={data_Thysanophrys}></Genus>

				{/* 1856 */}
				<Family family="アイナメ科"></Family>
				<Genus genus="アイナメ属 (Hexagrammos)" data={data_Hexagrammos}></Genus>

				{/* 1930 */}
				<Family family="カジカ科"></Family>
				<Genus genus="サラサカジカ属 (Furcina)" data={data_Furcina}></Genus>
				<Genus genus="アナハゼ属 (Pseudoblennius)" data={data_Pseudoblennius}></Genus>
				<Genus genus="スイ属 (Vellitor)" data={data_Vellitor}></Genus>

				{/* 2075 */}
				<Family family="クサウオ科"></Family>
				<Genus genus="クサウオ属 (Liparis)" data={data_Liparis}></Genus>

				{/* 2075 */}
				<Family family="ダンゴウオ科"></Family>
				<Genus genus="イボダンゴ属 (Eumicrotremus)" data={data_Eumicrotremus}></Genus>

				{/* 2075 */}
				<Family family="セミホウボウ科"></Family>
				<Genus genus="セミホウボウ属 (Dactyloptena)" data={data_Dactyloptena}></Genus>

				{/* 2089 */}
				<Family family="スズキ科"></Family>
				<Genus genus="スズキ属 (Lateolabrax)" data={data_Lateolabrax}></Genus>

				{/* 2303 */}
				<Family family="タナバタウオ科"></Family>
				<Genus genus="ツバメタナバタウオ属 (Assessor)" data={data_Assessor}></Genus>
				<Genus genus="シモフリタナバタウオ属 (Calloplesiops)" data={data_Calloplesiops}></Genus>
				<Genus genus="タナバタウオ属 (Plesiops)" data={data_Plesiops}></Genus>

				{/* 2310 */}
				<Family family="アゴアマダイ科"></Family>
				<Genus genus="アゴアマダイ属 (Opistognathus)" data={data_Opistognathus}></Genus>

				{/* 2334 */}
				<Family family="キントキダイ科"></Family>
				<Genus genus="ゴマヒレキントキ属 (Heteropriacanthus)" data={data_Heteropriacanthus}></Genus>
				<Genus genus="キントキダイ属 (Priacanthus)" data={data_Priacanthus}></Genus>

				{/* 2471 */}
				<Family family="ムツ科"></Family>
				<Genus genus="ムツ属 (Scombrops)" data={data_Scombrops}></Genus>

				{/* 2475 */}
				<Family family="コバンザメ科"></Family>
				<Genus genus="コバンザメ属 (Echeneis)" data={data_Echeneis}></Genus>
				<Genus genus="スジコバン属 (Phtheirichthys)" data={data_Phtheirichthys}></Genus>

				{/* 2655 */}
				<Family family="クロサギ科"></Family>
				<Genus genus="クロサギ属 (Gerres)" data={data_Gerres}></Genus>

				{/* 2824 */}
				<Family family="ヒメツバメウオ科"></Family>
				<Genus genus="ヒメツバメウオ属 (Monodactylus)" data={data_Monodactylus}></Genus>

				{/* 2913 */}
				<Family family="カワビシャ科"></Family>
				<Genus genus="テングダイ属 (Evistias)" data={data_Evistias}></Genus>

				{/* 2937 */}
				<Family family="アカタチ科"></Family>
				<Genus genus="アカタチ属 (Acanthocepola)" data={data_Acanthocepola}></Genus>

				{/* 2950 */}
				<Family family="ウミタナゴ科"></Family>
				<Genus genus="ウミタナゴ属 (Ditrema)" data={data_Ditrema}></Genus>

				{/* 3074 */}
				<Family family="タカベ科"></Family>
				<Genus genus="タカベ属 (Labracoglossa)" data={data_Labracoglossa}></Genus>

				{/* 3076 */}
				<Family family="ユゴイ科"></Family>
				<Genus genus="ユゴイ属 (Kuhlia)" data={data_Kuhlia}></Genus>

				{/* 3080 */}
				<Family family="イシダイ科"></Family>
				<Genus genus="イシダイ属 (Oplegnathus)" data={data_Oplegnathus}></Genus>

				{/* 3087 */}
				<Family family="カゴカキダイ科"></Family>
				<Genus genus="カゴカキダイ属 (Microcanthus)" data={data_Microcanthus}></Genus>

				{/* 3107 */}
				<Family family="エボシダイ科"></Family>
				<Genus genus="スジハナビラウオ属 (Psenes)" data={data_Psenes}></Genus>

				{/* 3427 */}
				<Family family="タウエガジ科"></Family>
				<Genus genus="カズナギ属 (Zoarchias)" data={data_Zoarchias}></Genus>

				{/* 3500 */}
				<Family family="Pholidichthyidae科"></Family>
				<Genus genus="Pholidichthys属" data={data_Pholidichthys}></Genus>

				{/* 3521 */}
				<Family family="ミシマオコゼ科"></Family>
				<Genus genus="ミシマオコゼ属 (Uranoscopus)" data={data_Uranoscopus}></Genus>

				{/* 4451 */}
				<Family family="タチウオ科"></Family>
				<Genus genus="タチウオ属 (Trichiurus)" data={data_Trichiurus}></Genus>

				{/* 4759 */}
				<Family family="マンボウ科"></Family>
				<Genus genus="マンボウ属 (Mola)" data={data_Mola}></Genus>

			</div>
		</Layout>
  	);
}
