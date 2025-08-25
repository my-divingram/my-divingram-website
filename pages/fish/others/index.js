import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data = await client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]others` , limit: 1 }});
	const data_Acanthocepola = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]アカタチ属` , limit: 100 }});
	const data_Oplegnathus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]イシダイ属` , limit: 100 }});
	const data_Hexagrammos = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]アイナメ属` , limit: 100 }});
	const data_Phtheirichthys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]スジコバン属` , limit: 100 }});
	const data_Gerres = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]クロサギ属` , limit: 100 }});
	const data_Plotosus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ゴンズイ属` , limit: 100 }});
	const data_Spratelloides = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]キビナゴ属` , limit: 100 }});
	const data_Brotula = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]イタチウオ属` , limit: 100 }});
	const data_Microcanthus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]カゴカキダイ属` , limit: 100 }});
	const data_Tylosurus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]テンジクダツ属` , limit: 100 }});
	const data_Trachipterus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]サケガシラ属` , limit: 100 }});
	const data_Dactyloptena = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]セミホウボウ属` , limit: 100 }});
	const data_Labracoglossa = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]タカベ属` , limit: 100 }});
	const data_Lotella = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]イソアイナメ属` , limit: 100 }});
	const data_Chelidonichthys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ホウボウ属` , limit: 100 }});
	const data_Metavelifer = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヒメクサアジ属` , limit: 100 }});
	const data_Scombrops = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ムツ属` , limit: 100 }});
	const data_Mugil = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ボラ属` , limit: 100 }});
	const data_Mola = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]マンボウ属` , limit: 100 }});
	const data_Echeneis = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]コバンザメ属` , limit: 100 }});
	const data_Evistias = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]テングダイ属` , limit: 100 }});
	const data_Nemichthys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]シギウナギ属` , limit: 100 }});
	const data_Trichiurus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]タチウオ属` , limit: 100 }});
	const data_Psenes = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]スジハナビラウオ属` , limit: 100 }});
	const data_Zeus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]マトウダイ属` , limit: 100 }});
	const data_Alepisaurus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ミズウオ属` , limit: 100 }});
	const data_Physiculus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]チゴダラ属` , limit: 100 }});
	const data_Kuhlia = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ユゴイ属` , limit: 100 }});
	const data_Lepidotrigla = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]カナガシラ属` , limit: 100 }});
	const data_Zoarchias = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]カズナギ属` , limit: 100 }});
	const data_Eumicrotremus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]イボダンゴ属` , limit: 100 }});
	const data_Liparis = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]クサウオ属` , limit: 100 }});
	const data_Pholidichthys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]Pholidichthys` , limit: 100 }});
	const data_Hypoatherina = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ギンイソイワシ属` , limit: 100 }});
	const data_Lateolabrax = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]スズキ属` , limit: 100 }});
	const data_Ditrema = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ウミタナゴ属` , limit: 100 }});
	const data_Monodactylus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヒメツバメウオ属` , limit: 100 }});
	const data_Diaphus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ハダカイワシ属` , limit: 100 }});
	const data_Muraenesox = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ハモ属` , limit: 100 }});
	const data_Halophryne = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]Halophryne` , limit: 100 }});
	const data_Herklotsichthys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ミズン属` , limit: 100 }});
	const data_Strongylura = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ダツ属` , limit: 100 }});
	const data_Cepola = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]スミツキアカタチ属` , limit: 100 }});
	const data_Terapon = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]コトヒキ属` , limit: 100 }});
	const data_Plicomugil = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ワニグチボラ属` , limit: 100 }});
	const data_Sardinops = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]マイワシ属` , limit: 100 }});
	const data_Cheilotrema = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]Cheilotrema` , limit: 100 }});
	const data_Embiotoca = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]Embiotoca` , limit: 100 }});
	const data_Oxylebius = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]Oxylebius` , limit: 100 }});
	const data_Sillago = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]キス属` , limit: 100 }});
	const data_Dictyosoma = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ダイナンギンポ属` , limit: 100 }});
	const data_Planiliza = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]メナダ属` , limit: 100 }});
	const data_Sardinella = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]サッパ属` , limit: 100 }});

	return {
    	props: {
			data_num: data.totalCount,
    		data_Acanthocepola: data_Acanthocepola.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Oplegnathus: data_Oplegnathus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Hexagrammos: data_Hexagrammos.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Phtheirichthys: data_Phtheirichthys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Gerres: data_Gerres.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Plotosus: data_Plotosus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Spratelloides: data_Spratelloides.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Brotula: data_Brotula.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Microcanthus: data_Microcanthus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Tylosurus: data_Tylosurus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Trachipterus: data_Trachipterus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Dactyloptena: data_Dactyloptena.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Labracoglossa: data_Labracoglossa.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Lotella: data_Lotella.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Chelidonichthys: data_Chelidonichthys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Metavelifer: data_Metavelifer.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Scombrops: data_Scombrops.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Mugil: data_Mugil.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Mola: data_Mola.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Echeneis: data_Echeneis.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Evistias: data_Evistias.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Nemichthys: data_Nemichthys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Trichiurus: data_Trichiurus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Psenes: data_Psenes.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Zeus: data_Zeus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Alepisaurus: data_Alepisaurus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Physiculus: data_Physiculus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Kuhlia: data_Kuhlia.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Lepidotrigla: data_Lepidotrigla.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Zoarchias: data_Zoarchias.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Eumicrotremus: data_Eumicrotremus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Liparis: data_Liparis.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Pholidichthys: data_Pholidichthys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Hypoatherina: data_Hypoatherina.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Lateolabrax: data_Lateolabrax.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Ditrema: data_Ditrema.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Monodactylus: data_Monodactylus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Diaphus: data_Diaphus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Muraenesox: data_Muraenesox.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Halophryne: data_Halophryne.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Herklotsichthys: data_Herklotsichthys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Strongylura: data_Strongylura.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Cepola: data_Cepola.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Terapon: data_Terapon.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Plicomugil: data_Plicomugil.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Sardinops: data_Sardinops.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Cheilotrema: data_Cheilotrema.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Embiotoca: data_Embiotoca.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Oxylebius: data_Oxylebius.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Sillago: data_Sillago.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Dictyosoma: data_Dictyosoma.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Planiliza: data_Planiliza.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Sardinella: data_Sardinella.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_num, data_Acanthocepola, data_Oplegnathus, data_Hexagrammos, data_Phtheirichthys, data_Gerres, data_Plotosus, data_Spratelloides, data_Brotula, data_Microcanthus, data_Tylosurus, data_Trachipterus, data_Dactyloptena, data_Labracoglossa, data_Lotella, data_Chelidonichthys, data_Metavelifer, data_Scombrops, data_Mugil, data_Mola, data_Echeneis, data_Evistias, data_Nemichthys, data_Trichiurus, data_Psenes, data_Zeus, data_Alepisaurus, data_Physiculus, data_Kuhlia, data_Lepidotrigla, data_Zoarchias, data_Eumicrotremus, data_Liparis, data_Pholidichthys, data_Hypoatherina, data_Lateolabrax, data_Ditrema, data_Monodactylus, data_Diaphus, data_Muraenesox, data_Halophryne, data_Herklotsichthys, data_Strongylura, data_Cepola, data_Terapon, data_Plicomugil, data_Sardinops, data_Cheilotrema, data_Embiotoca, data_Oxylebius, data_Sillago, data_Dictyosoma, data_Planiliza, data_Sardinella}) {

	return (
		<Layout title="その他の海水魚 | 僕らむの魚図鑑" description="その他の海水魚の一覧です" url="https://www.my-divingram.com/fish/others" imageUrl="https://www.my-divingram.com/img/class/others.jpeg">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">その他の海水魚</h1>
				<p className="pt-2 text-xs md:text-sm text-center text-gray-700 font-medium">掲載種 (未記載種を含む) : {data_num}種</p>

				{/* 463 */}
				<Family family="ハモ科"></Family>
				<Genus genus="ハモ属 (Muraenesox)" data={data_Muraenesox}></Genus>

				{/* 467 */}
				<Family family="シギウナギ科"></Family>
				<Genus genus="シギウナギ属 (Nemichthys)" data={data_Nemichthys}></Genus>

				{/* 486 */}
				<Family family="ニシン科"></Family>
				<Genus genus="ミズン属 (Herklotsichthys)" data={data_Herklotsichthys}></Genus>
				<Genus genus="サッパ属 (Sardinella)" data={data_Sardinella}></Genus>
				<Genus genus="マイワシ属 (Sardinops)" data={data_Sardinops}></Genus>

				{/* 503 */}
				<Family family="キビナゴ科"></Family>
				<Genus genus="キビナゴ属 (Spratelloides)" data={data_Spratelloides}></Genus>

				{/* 641 */}
				<Family family="ゴンズイ科"></Family>
				<Genus genus="ゴンズイ属 (Plotosus)" data={data_Plotosus}></Genus>

				{/* 896 */}
				<Family family="ミズウオ科"></Family>
				<Genus genus="ミズウオ属 (Alepisaurus)" data={data_Alepisaurus}></Genus>

				{/* 969 */}
				<Family family="ハダカイワシ科"></Family>
				<Genus genus="ハダカイワシ属 (Diaphus)" data={data_Diaphus}></Genus>

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

				{/* 記載なし */}
				<Family family="ガマアンコウ科"></Family>
				<Genus genus="Halophryne属" data={data_Halophryne}></Genus>

				{/* 1432 */}
				<Family family="マトウダイ科"></Family>
				<Genus genus="マトウダイ属 (Zeus)" data={data_Zeus}></Genus>

				{/* 1542 */}
				<Family family="ボラ科"></Family>
				<Genus genus="ボラ属 (Mugil)" data={data_Mugil}></Genus>
				<Genus genus="メナダ属 (Planiliza)" data={data_Planiliza}></Genus>
				<Genus genus="ワニグチボラ属 (Plicomugil)" data={data_Plicomugil}></Genus>

				{/* 1559 */}
				<Family family="トウゴロウイワシ科"></Family>
				<Genus genus="ギンイソイワシ属 (Hypoatherina)" data={data_Hypoatherina}></Genus>

				{/* 1622 */}
				<Family family="ダツ科"></Family>
				<Genus genus="ダツ属 (Strongylura)" data={data_Strongylura}></Genus>
				<Genus genus="テンジクダツ属 (Tylosurus)" data={data_Tylosurus}></Genus>

				{/* 1780 */}
				<Family family="ホウボウ科"></Family>
				<Genus genus="ホウボウ属 (Chelidonichthys)" data={data_Chelidonichthys}></Genus>
				<Genus genus="カナガシラ属 (Lepidotrigla)" data={data_Lepidotrigla}></Genus>

				{/* 1856 */}
				<Family family="アイナメ科"></Family>
				<Genus genus="アイナメ属 (Hexagrammos)" data={data_Hexagrammos}></Genus>
				<Genus genus="Oxylebius属" data={data_Oxylebius}></Genus>

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

				{/* 2760 */}
				<Family family="ニベ科"></Family>
				<Genus genus="Cheilotrema属" data={data_Cheilotrema}></Genus>

				{/* 2779 */}
				<Family family="キス科"></Family>
				<Genus genus="キス属 (Sillago)" data={data_Sillago}></Genus>

				{/* 2824 */}
				<Family family="ヒメツバメウオ科"></Family>
				<Genus genus="ヒメツバメウオ属 (Monodactylus)" data={data_Monodactylus}></Genus>

				{/* 2913 */}
				<Family family="カワビシャ科"></Family>
				<Genus genus="テングダイ属 (Evistias)" data={data_Evistias}></Genus>

				{/* 2937 */}
				<Family family="アカタチ科"></Family>
				<Genus genus="アカタチ属 (Acanthocepola)" data={data_Acanthocepola}></Genus>
				<Genus genus="スミツキアカタチ属 (Cepola)" data={data_Cepola}></Genus>

				{/* 2950 */}
				<Family family="ウミタナゴ科"></Family>
				<Genus genus="ウミタナゴ属 (Ditrema)" data={data_Ditrema}></Genus>
				<Genus genus="Embiotoca属" data={data_Embiotoca}></Genus>

				{/* 3072 */}
				<Family family="シマイサキ科"></Family>
				<Genus genus="コトヒキ属 (Terapon)" data={data_Terapon}></Genus>

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
				<Genus genus="ダイナンギンポ属 (Dictyosoma)" data={data_Dictyosoma}></Genus>
				<Genus genus="カズナギ属 (Zoarchias)" data={data_Zoarchias}></Genus>

				{/* 3500 */}
				<Family family="Pholidichthyidae科"></Family>
				<Genus genus="Pholidichthys属" data={data_Pholidichthys}></Genus>

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
