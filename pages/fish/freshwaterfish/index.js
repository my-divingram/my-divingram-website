import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data = await client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]freshwaterfish` , limit: 1 }});
	const data_Candidia = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]カワムツ属` , limit: 100 }});
	const data_Opsariichthys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ハス属` , limit: 100 }});
	const data_Rhinogobius = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヨシノボリ属` , limit: 100 }});
	const data_Tridentiger = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]チチブ属` , limit: 100 }});
	const data_Sicyopus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]アカボウズハゼ属` , limit: 100 }});
	const data_Anguilla = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ウナギ属` , limit: 100 }});
	const data_Oreochromis = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]カワスズメ属` , limit: 100 }});
	const data_Xiphophorus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ソードテール属` , limit: 100 }});
	const data_Stiphodon = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ナンヨウボウズハゼ属` , limit: 100 }});
	const data_Sicyopterus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ボウズハゼ属` , limit: 100 }});
	const data_Lentipes = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヨロイボウズハゼ属` , limit: 100 }});
	const data_Micropterus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]オオクチバス属` , limit: 100 }});
	const data_Lepomis = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ブルーギル属` , limit: 100 }});
	const data_Oncorhynchus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]サケ属` , limit: 100 }});
	const data_Pseudaspius = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ウグイ属` , limit: 100 }});
	const data_Gymnogobius = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ウキゴリ属` , limit: 100 }});
	const data_Cottus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]カジカ属` , limit: 100 }});
	const data_Lethenteron = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]カワヤツメ属` , limit: 100 }});
	const data_Gasterosteus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]イトヨ属` , limit: 100 }});
	const data_Sarcocheilichthys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヒガイ属` , limit: 100 }});
	const data_Gnathopogon = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]タモロコ属` , limit: 100 }});
	const data_Eleotris = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]カワアナゴ属[and]class[equals]freshwaterfish` , limit: 100 }});
	const data_Rhynchocypris = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]アブラハヤ属` , limit: 100 }});
	const data_Plecoglossus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]アユ属` , limit: 100 }});

	return {
    	props: {
			data_num: data.totalCount,
    		data_Candidia: data_Candidia.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Opsariichthys: data_Opsariichthys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Rhinogobius: data_Rhinogobius.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Tridentiger: data_Tridentiger.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Sicyopus: data_Sicyopus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Anguilla: data_Anguilla.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Oreochromis: data_Oreochromis.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Xiphophorus: data_Xiphophorus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Stiphodon: data_Stiphodon.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Sicyopterus: data_Sicyopterus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Lentipes: data_Lentipes.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Micropterus: data_Micropterus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Lepomis: data_Lepomis.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Oncorhynchus: data_Oncorhynchus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Pseudaspius: data_Pseudaspius.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Gymnogobius: data_Gymnogobius.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Cottus: data_Cottus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Lethenteron: data_Lethenteron.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Gasterosteus: data_Gasterosteus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Sarcocheilichthys: data_Sarcocheilichthys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Gnathopogon: data_Gnathopogon.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Rhynchocypris: data_Rhynchocypris.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Eleotris: data_Eleotris.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Plecoglossus: data_Plecoglossus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_num, data_Candidia, data_Opsariichthys, data_Rhinogobius, data_Tridentiger, data_Sicyopus, data_Anguilla, data_Oreochromis, data_Xiphophorus, data_Stiphodon, data_Sicyopterus, data_Lentipes, data_Micropterus, data_Lepomis, data_Oncorhynchus, data_Pseudaspius, data_Gymnogobius, data_Cottus, data_Lethenteron, data_Gasterosteus, data_Sarcocheilichthys, data_Gnathopogon, data_Rhynchocypris, data_Eleotris, data_Plecoglossus}) {

	return (
		<Layout title="淡水魚 | 僕らむの魚図鑑" description="淡水魚の一覧です" url="https://www.my-divingram.com/fish/freshwaterfish" imageUrl="https://www.my-divingram.com/img/class/freshwaterfish.jpeg">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">淡水魚</h1>
				<p className="pt-2 text-xs md:text-sm text-center text-gray-700 font-medium">掲載種 : {data_num}種</p>

				<Family family="ヤツメウナギ科"></Family>
				{/* 14 */}
				<Genus genus="カワヤツメ属 (Lethenteron)" data={data_Lethenteron}></Genus>

				<Family family="ウナギ科"></Family>
				{/* 267 */}
				<Genus genus="ウナギ属 (Anguilla)" data={data_Anguilla}></Genus>

				<Family family="コイ科"></Family>
				{/* 550 */}
				<Genus genus="タモロコ属 (Gnathopogon)" data={data_Gnathopogon}></Genus>
				{/* 564 */}
				<Genus genus="ヒガイ属 (Sarcocheilichthys)" data={data_Sarcocheilichthys}></Genus>
				{/* 572 */}
				<Genus genus="ウグイ属 (Pseudaspius)" data={data_Pseudaspius}></Genus>
				{/* 577 */}
				<Genus genus="アブラハヤ属 (Rhynchocypris)" data={data_Rhynchocypris}></Genus>
				{/* 589 */}
				<Genus genus="カワムツ属 (Candidia)" data={data_Candidia}></Genus>
				{/* 590 */}
				<Genus genus="ハス属 (Opsariichthys)" data={data_Opsariichthys}></Genus>

				{/* 702 */}
				<Family family="アユ科"></Family>
				<Genus genus="アユ属 (Plecoglossus)" data={data_Plecoglossus}></Genus>

				{/* 710 */}
				<Family family="サケ科"></Family>
				<Genus genus="サケ属 (Oncorhynchus)" data={data_Oncorhynchus}></Genus>

				<Family family="トゲウオ科"></Family>
				{/* 1446 */}
				<Genus genus="イトヨ属 (Gasterosteus)" data={data_Gasterosteus}></Genus>

				<Family family="カダヤシ科"></Family>
				{/* 1570 */}
				<Genus genus="ソードテール属 (Xiphophorus)" data={data_Xiphophorus}></Genus>

				<Family family="カジカ科"></Family>
				{/* 1888 */}
				<Genus genus="カジカ属 (Cottus)" data={data_Cottus}></Genus>

				<Family family="サンフィッシュ科"></Family>
				{/* 2330 */}
				<Genus genus="ブルーギル属 (Lepomis)" data={data_Lepomis}></Genus>
				{/* 2332 */}
				<Genus genus="オオクチバス属 (Micropterus)" data={data_Micropterus}></Genus>

				<Family family="カワスズメ科"></Family>
				{/* 2946 */}
				<Genus genus="カワスズメ属 (Oreochromis)" data={data_Oreochromis}></Genus>

				<Family family="カワアナゴ科"></Family>
				{/* 3723 */}
				<Genus genus="カワアナゴ属 (Eleotris)" data={data_Eleotris}></Genus>

				<Family family="ハゼ科"></Family>
				{/* 3995 */}
				<Genus genus="ウキゴリ属 (Gymnogobius)" data={data_Gymnogobius}></Genus>
				{/* 4031 */}
				<Genus genus="ヨロイボウズハゼ属 (Lentipes)" data={data_Lentipes}></Genus>
				{/* 4167 */}
				<Genus genus="ヨシノボリ属 (Rhinogobius)" data={data_Rhinogobius}></Genus>
				{/* 4190 */}
				<Genus genus="ボウズハゼ属 (Sicyopterus)" data={data_Sicyopterus}></Genus>
				{/* 4194 */}
				<Genus genus="アカボウズハゼ属 (Sicyopus)" data={data_Sicyopus}></Genus>
				{/* 4207 */}
				<Genus genus="ナンヨウボウズハゼ属 (Stiphodon)" data={data_Stiphodon}></Genus>
				{/* 4230 */}
				<Genus genus="チチブ属 (Tridentiger)" data={data_Tridentiger}></Genus>

			</div>
		</Layout>
  	);
}