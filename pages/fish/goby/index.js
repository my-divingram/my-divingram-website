import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data = await client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]goby` , limit: 1 }});
	const data_Oxyurichthys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]サルハゼ属` , limit: 100 }});
	const data_Waitea = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]カスリハゼ属` , limit: 100 }});
	const data_Discordipinna = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ホムラハゼ属` , limit: 100 }});
	const data_Ptereleotris = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]クロユリハゼ属` , limit: 100 }});
	const data_Bryaninops = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ガラスハゼ属` , limit: 100 }});
	const data_Lotilia = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]オドリハゼ属` , limit: 100 }});
	const data_Myersina = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ハゴロモハゼ属` , limit: 100 }});
	const data_Ancistrogobius = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ホオカギハゼ属` , limit: 100 }});
	const data_Pleurosicya = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ウミショウブハゼ属` , limit: 100 }});
	const data_Asterropteryx = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ホシハゼ属` , limit: 100 }});
	const data_Gobiodon = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]コバンハゼ属` , limit: 100 }});
	const data_Paragobiodon = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ダルマハゼ属` , limit: 100 }});
	const data_Fusigobius = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]サンカクハゼ属` , limit: 100 }});
	const data_Lubricogobius = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ミジンベニハゼ属` , limit: 100 }});
	const data_Nemateleotris = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ハタタテハゼ属` , limit: 100 }});
	const data_Trimma = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ベニハゼ属` , limit: 100 }});
	const data_Chaenogobius = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]アゴハゼ属` , limit: 100 }});
	const data_Priolepis = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]イレズミハゼ属` , limit: 100 }});
	const data_Amblygobius = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]サラサハゼ属` , limit: 100 }});
	const data_Valenciennea = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]クロイトハゼ属` , limit: 100 }});
	const data_Gnatholepis = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]オオモンハゼ属` , limit: 100 }});
	const data_Acentrogobius = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]キララハゼ属` , limit: 100 }});
	const data_Gunnellichthys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]オオメワラスボ属` , limit: 100 }});
	const data_Istigobius = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]クツワハゼ属` , limit: 100 }});
	const data_Stonogobiops = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ネジリンボウ属` , limit: 100 }});
	const data_Amblyeleotris = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ダテハゼ属` , limit: 100 }});
	const data_Tomiyamichthys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]オニハゼ属` , limit: 100 }});
	const data_Eviota = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]イソハゼ属` , limit: 100 }});
	const data_Tryssogobius = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]モエギハゼ属` , limit: 100 }});
	const data_Signigobius = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]Signigobius` , limit: 100 }});
	const data_Vanderhorstia = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヤツシハゼ属` , limit: 100 }});
	const data_Cryptocentrus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]イトヒキハゼ属` , limit: 100 }});
	const data_Ctenogobiops = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]シノビハゼ属` , limit: 100 }});
	const data_Echinogobius = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]モヨウシノビハゼ属` , limit: 100 }});
	const data_Hazeus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ユカタハゼ属` , limit: 100 }});
	const data_Koumansetta = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]キンセンハゼ属` , limit: 100 }});
	const data_Oplopomus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ケショウハゼ属` , limit: 100 }});
	const data_Trimmatom = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]シマイソハゼ属` , limit: 100 }});
	const data_Pterogobius = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]キヌバリ属` , limit: 100 }});
	const data_Oxymetopon = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]タンザクハゼ属` , limit: 100 }});
	const data_Yongeichthys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ツムギハゼ属` , limit: 100 }});
	const data_Psammogobius = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヒトミハゼ属` , limit: 100 }});
	const data_Macrodontogobius = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]マダラハゼ属` , limit: 100 }});
	const data_Bathygobius = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]クモハゼ属` , limit: 100 }});
	const data_Callogobius = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]オキナワハゼ属` , limit: 100 }});
	const data_Inu = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]コマハゼ属` , limit: 100 }});
	const data_Luciogobius = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ミミズハゼ属` , limit: 100 }});
	const data_Periophthalmus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]トビハゼ属` , limit: 100 }});
	const data_Barbuligobius = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヒゲモジャハゼ属` , limit: 100 }});
	const data_Sagamia = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]サビハゼ属` , limit: 100 }});
	const data_Cabillus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヨリメハゼ属` , limit: 100 }});
	const data_Sueviota = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]アワセイソハゼ属` , limit: 100 }});
	const data_indet = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ハゼ科未記載属` , limit: 100 }});
	const data_Grallenia = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]サザレハゼ属` , limit: 100 }});
	const data_Favonigobius = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヒメハゼ属` , limit: 100 }});
	const data_Heteroplopomus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ニラミハゼ属` , limit: 100 }});

	return {
    	props: {
			data_num: data.totalCount,
    		data_Oxyurichthys: data_Oxyurichthys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Waitea: data_Waitea.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Discordipinna: data_Discordipinna.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Ptereleotris: data_Ptereleotris.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Bryaninops: data_Bryaninops.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Lotilia: data_Lotilia.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Myersina: data_Myersina.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Ancistrogobius: data_Ancistrogobius.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Pleurosicya: data_Pleurosicya.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Asterropteryx: data_Asterropteryx.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Gobiodon: data_Gobiodon.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Paragobiodon: data_Paragobiodon.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Fusigobius: data_Fusigobius.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Lubricogobius: data_Lubricogobius.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Nemateleotris: data_Nemateleotris.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Trimma: data_Trimma.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Chaenogobius: data_Chaenogobius.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Priolepis: data_Priolepis.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Amblygobius: data_Amblygobius.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Valenciennea: data_Valenciennea.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Gnatholepis: data_Gnatholepis.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Acentrogobius: data_Acentrogobius.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Gunnellichthys: data_Gunnellichthys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Istigobius: data_Istigobius.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Stonogobiops: data_Stonogobiops.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Amblyeleotris: data_Amblyeleotris.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Tomiyamichthys: data_Tomiyamichthys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Eviota: data_Eviota.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Tryssogobius: data_Tryssogobius.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Signigobius: data_Signigobius.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Vanderhorstia: data_Vanderhorstia.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Cryptocentrus: data_Cryptocentrus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Ctenogobiops: data_Ctenogobiops.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Echinogobius: data_Echinogobius.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Hazeus: data_Hazeus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Koumansetta: data_Koumansetta.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Oplopomus: data_Oplopomus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Trimmatom: data_Trimmatom.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Pterogobius: data_Pterogobius.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Oxymetopon: data_Oxymetopon.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Yongeichthys: data_Yongeichthys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Psammogobius: data_Psammogobius.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Macrodontogobius: data_Macrodontogobius.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Bathygobius: data_Bathygobius.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Callogobius: data_Callogobius.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Inu: data_Inu.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Luciogobius: data_Luciogobius.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Periophthalmus: data_Periophthalmus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Barbuligobius: data_Barbuligobius.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Sagamia: data_Sagamia.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Cabillus: data_Cabillus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Sueviota: data_Sueviota.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_indet: data_indet.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Grallenia: data_Grallenia.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Favonigobius: data_Favonigobius.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Heteroplopomus: data_Heteroplopomus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_num, data_Oxyurichthys, data_Waitea, data_Discordipinna, data_Ptereleotris, data_Bryaninops, data_Lotilia, data_Myersina, data_Ancistrogobius, data_Pleurosicya, data_Asterropteryx, data_Gobiodon, data_Paragobiodon, data_Fusigobius, data_Lubricogobius, data_Nemateleotris, data_Trimma, data_Chaenogobius, data_Priolepis, data_Amblygobius, data_Valenciennea, data_Gnatholepis, data_Acentrogobius, data_Gunnellichthys, data_Istigobius, data_Stonogobiops, data_Amblyeleotris, data_Tomiyamichthys, data_Eviota, data_Tryssogobius, data_Signigobius, data_Vanderhorstia, data_Cryptocentrus, data_Ctenogobiops, data_Echinogobius, data_Hazeus, data_Koumansetta, data_Oplopomus, data_Trimmatom, data_Pterogobius, data_Oxymetopon, data_Yongeichthys, data_Psammogobius, data_Macrodontogobius, data_Bathygobius, data_Callogobius, data_Inu, data_Luciogobius, data_Periophthalmus, data_Barbuligobius, data_Sagamia, data_Cabillus, data_Sueviota, data_indet, data_Grallenia, data_Favonigobius, data_Heteroplopomus}) {

	return (
		<Layout title="ハゼの仲間 | 僕らむの魚図鑑" description="ハゼの仲間の一覧です" url="https://www.my-divingram.com/fish/goby" imageUrl="https://www.my-divingram.com/img/class/goby.jpeg">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">ハゼの仲間</h1>
				<p className="pt-2 text-xs md:text-sm text-center text-gray-700 font-medium">掲載種 (未記載種を含む) : {data_num}種</p>

				<Family family="ハゼ科"></Family>
				<Genus genus="キララハゼ属 (Acentrogobius)" data={data_Acentrogobius}></Genus>
				<Genus genus="ダテハゼ属 (Amblyeleotris)" data={data_Amblyeleotris}></Genus>
				<Genus genus="サラサハゼ属 (Amblygobius)" data={data_Amblygobius}></Genus>
				<Genus genus="ホオカギハゼ属 (Ancistrogobius)" data={data_Ancistrogobius}></Genus>
				<Genus genus="ホシハゼ属 (Asterropteryx)" data={data_Asterropteryx}></Genus>
				<Genus genus="ヒゲモジャハゼ属 (Barbuligobius)" data={data_Barbuligobius}></Genus>
				<Genus genus="クモハゼ属 (Bathygobius)" data={data_Bathygobius}></Genus>
				<Genus genus="ガラスハゼ属 (Bryaninops)" data={data_Bryaninops}></Genus>
				<Genus genus="ヨリメハゼ属 (Cabillus)" data={data_Cabillus}></Genus>
				<Genus genus="オキナワハゼ属 (Callogobius)" data={data_Callogobius}></Genus>
				<Genus genus="アゴハゼ属 (Chaenogobius)" data={data_Chaenogobius}></Genus>
				<Genus genus="イトヒキハゼ属 (Cryptocentrus)" data={data_Cryptocentrus}></Genus>
				<Genus genus="シノビハゼ属 (Ctenogobiops)" data={data_Ctenogobiops}></Genus>
				<Genus genus="ホムラハゼ属 (Discordipinna)" data={data_Discordipinna}></Genus>
				<Genus genus="モヨウシノビハゼ属 (Echinogobius)" data={data_Echinogobius}></Genus>
				<Genus genus="イソハゼ属 (Eviota)" data={data_Eviota}></Genus>
				<Genus genus="ヒメハゼ属 (Favonigobius)" data={data_Favonigobius}></Genus>
				<Genus genus="サンカクハゼ属 (Fusigobius)" data={data_Fusigobius}></Genus>
				<Genus genus="オオモンハゼ属 (Gnatholepis)" data={data_Gnatholepis}></Genus>
				<Genus genus="コバンハゼ属 (Gobiodon)" data={data_Gobiodon}></Genus>
				<Genus genus="サザレハゼ属 (Grallenia)" data={data_Grallenia}></Genus>
				<Genus genus="ユカタハゼ属 (Hazeus)" data={data_Hazeus}></Genus>
				<Genus genus="ニラミハゼ属 (Heteroplopomus)" data={data_Heteroplopomus}></Genus>
				<Genus genus="コマハゼ属 (Inu)" data={data_Inu}></Genus>
				<Genus genus="クツワハゼ属 (Istigobius)" data={data_Istigobius}></Genus>
				<Genus genus="キンセンハゼ属 (Koumansetta)" data={data_Koumansetta}></Genus>
				<Genus genus="オドリハゼ属 (Lotilia)" data={data_Lotilia}></Genus>
				<Genus genus="ミジンベニハゼ属 (Lubricogobius)" data={data_Lubricogobius}></Genus>
				<Genus genus="ミミズハゼ属 (Luciogobius)" data={data_Luciogobius}></Genus>
				<Genus genus="ハゴロモハゼ属 (Myersina)" data={data_Myersina}></Genus>
				<Genus genus="マダラハゼ属 (Macrodontogobius)" data={data_Macrodontogobius}></Genus>
				<Genus genus="ケショウハゼ属 (Oplopomus)" data={data_Oplopomus}></Genus>
				<Genus genus="サルハゼ属 (Oxyurichthys)" data={data_Oxyurichthys}></Genus>
				<Genus genus="ダルマハゼ属 (Paragobiodon)" data={data_Paragobiodon}></Genus>
				<Genus genus="トビハゼ属 (Periophthalmus)" data={data_Periophthalmus}></Genus>
				<Genus genus="ウミショウブハゼ属 (Pleurosicya)" data={data_Pleurosicya}></Genus>
				<Genus genus="イレズミハゼ属 (Priolepis)" data={data_Priolepis}></Genus>
				<Genus genus="ヒトミハゼ属 (Psammogobius)" data={data_Psammogobius}></Genus>
				<Genus genus="キヌバリ属 (Pterogobius)" data={data_Pterogobius}></Genus>
				<Genus genus="サビハゼ属 (Sagamia)" data={data_Sagamia}></Genus>
				<Genus genus="ネジリンボウ属 (Stonogobiops)" data={data_Stonogobiops}></Genus>
				<Genus genus="アワセイソハゼ属 (Sueviota)" data={data_Sueviota}></Genus>
				<Genus genus="オニハゼ属 (Tomiyamichthys)" data={data_Tomiyamichthys}></Genus>
				<Genus genus="ベニハゼ属 (Trimma)" data={data_Trimma}></Genus>
				<Genus genus="シマイソハゼ属 (Trimmatom)" data={data_Trimmatom}></Genus>
				<Genus genus="モエギハゼ属 (Tryssogobius)" data={data_Tryssogobius}></Genus>
				<Genus genus="クロイトハゼ属 (Valenciennea)" data={data_Valenciennea}></Genus>
				<Genus genus="ヤツシハゼ属 (Vanderhorstia)" data={data_Vanderhorstia}></Genus>
				<Genus genus="カスリハゼ属 (Waitea)" data={data_Waitea}></Genus>
				<Genus genus="ツムギハゼ属 (Yongeichthys)" data={data_Yongeichthys}></Genus>
				<Genus genus="Signigobius属" data={data_Signigobius}></Genus>
				<Genus genus="未記載属 (Gobiidae indet. gen.)" data={data_indet}></Genus>

				<Family family="オオメワラスボ科"></Family>
				<Genus genus="オオメワラスボ属 (Gunnellichthys)" data={data_Gunnellichthys}></Genus>

				<Family family="クロユリハゼ科"></Family>
				<Genus genus="ハタタテハゼ属 (Nemateleotris)" data={data_Nemateleotris}></Genus>
				<Genus genus="タンザクハゼ属 (Oxymetopon)" data={data_Oxymetopon}></Genus>
				<Genus genus="クロユリハゼ属 (Ptereleotris)" data={data_Ptereleotris}></Genus>
			</div>
		</Layout>
  	);
}
