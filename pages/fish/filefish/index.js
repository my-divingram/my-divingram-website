import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data = await client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]filefish` , limit: 1 }});
	const data_Xanthichthys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ナメモンガラ属` , limit: 100 }});
	const data_Pseudobalistes = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]キヘリモンガラ属` , limit: 100 }});
	const data_Rhinecanthus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ムラサメモンガラ属` , limit: 100 }});
	const data_Thamnaconus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ウマヅラハギ属` , limit: 100 }});
	const data_Melichthys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ソロイモンガラ属` , limit: 100 }});
	const data_Balistoides = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]モンガラカワハギ属` , limit: 100 }});
	const data_Stephanolepis = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]カワハギ属` , limit: 100 }});
	const data_Balistapus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]クマドリ属` , limit: 100 }});
	const data_Paraluteres = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ノコギリハギ属` , limit: 100 }});
	const data_Oxymonacanthus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]テングカワハギ属` , limit: 100 }});
	const data_Pervagor = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ニシキカワハギ属` , limit: 100 }});
	const data_Cantherhines = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ハクセイハギ属` , limit: 100 }});
	const data_Sufflamen = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]メガネハギ属` , limit: 100 }});
	const data_Rudarius = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]アミメハギ属` , limit: 100 }});
	const data_Acreichthys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]フチドリカワハギ属` , limit: 100 }});
	const data_Brachaluteres = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]アオサハギ属` , limit: 100 }});
	const data_Paramonacanthus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヨソギ属` , limit: 100 }});
	const data_Aluterus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ウスバハギ属` , limit: 100 }});
	const data_Odonus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]アカモンガラ属` , limit: 100 }});
	const data_Pseudalutarius = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ハナツノハギ属` , limit: 100 }});

	return {
    	props: {
			data_num: data.totalCount,
    		data_Oxymonacanthus: data_Oxymonacanthus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Xanthichthys: data_Xanthichthys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Pseudobalistes: data_Pseudobalistes.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Rhinecanthus: data_Rhinecanthus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Thamnaconus: data_Thamnaconus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Melichthys: data_Melichthys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Balistoides: data_Balistoides.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Stephanolepis: data_Stephanolepis.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Balistapus: data_Balistapus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Paraluteres: data_Paraluteres.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Pervagor: data_Pervagor.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Cantherhines: data_Cantherhines.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Sufflamen: data_Sufflamen.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Rudarius: data_Rudarius.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Acreichthys: data_Acreichthys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Brachaluteres: data_Brachaluteres.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Paramonacanthus: data_Paramonacanthus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Aluterus: data_Aluterus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Odonus: data_Odonus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Pseudalutarius: data_Pseudalutarius.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_num, data_Oxymonacanthus, data_Xanthichthys, data_Pseudobalistes, data_Rhinecanthus, data_Thamnaconus, data_Melichthys, data_Balistoides, data_Stephanolepis, data_Balistapus, data_Paraluteres, data_Pervagor, data_Cantherhines, data_Sufflamen, data_Rudarius, data_Acreichthys, data_Brachaluteres, data_Paramonacanthus, data_Aluterus, data_Odonus, data_Pseudalutarius}) {

	return (
		<Layout title="カワハギの仲間 | 僕らむの魚図鑑" description="カワハギの仲間の一覧です" url="https://www.my-divingram.com/fish/filefish" imageUrl="https://www.my-divingram.com/img/class/filefish.jpeg">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">カワハギの仲間</h1>
				<p className="pt-2 text-xs md:text-sm text-center text-gray-700 font-medium">掲載種 : {data_num}種</p>

				<Family family="モンガラカワハギ科"></Family>
				<Genus genus="クマドリ属 (Balistapus)" data={data_Balistapus}></Genus>
				<Genus genus="モンガラカワハギ属 (Balistoides)" data={data_Balistoides}></Genus>
				<Genus genus="ソロイモンガラ属 (Melichthys)" data={data_Melichthys}></Genus>
				<Genus genus="アカモンガラ属 (Odonus)" data={data_Odonus}></Genus>
				<Genus genus="キヘリモンガラ属 (Pseudobalistes)" data={data_Pseudobalistes}></Genus>
				<Genus genus="ムラサメモンガラ属 (Rhinecanthus)" data={data_Rhinecanthus}></Genus>
				<Genus genus="メガネハギ属 (Sufflamen)" data={data_Sufflamen}></Genus>
				<Genus genus="ナメモンガラ属 (Xanthichthys)" data={data_Xanthichthys}></Genus>

				<Family family="カワハギ科"></Family>
				<Genus genus="フチドリカワハギ属 (Acreichthys)" data={data_Acreichthys}></Genus>
				<Genus genus="ウスバハギ属 (Aluterus)" data={data_Aluterus}></Genus>
				<Genus genus="アオサハギ属 (Brachaluteres)" data={data_Brachaluteres}></Genus>
				<Genus genus="ハクセイハギ属 (Cantherhines)" data={data_Cantherhines}></Genus>
				<Genus genus="テングカワハギ属 (Oxymonacanthus)" data={data_Oxymonacanthus}></Genus>
				<Genus genus="ノコギリハギ属 (Paraluteres)" data={data_Paraluteres}></Genus>
				<Genus genus="ヨソギ属 (Paramonacanthus)" data={data_Paramonacanthus}></Genus>
				<Genus genus="ニシキカワハギ属 (Pervagor)" data={data_Pervagor}></Genus>
				<Genus genus="ハナツノハギ属 (Pseudalutarius)" data={data_Pseudalutarius}></Genus>
				<Genus genus="アミメハギ属 (Rudarius)" data={data_Rudarius}></Genus>
				<Genus genus="カワハギ属 (Stephanolepis)" data={data_Stephanolepis}></Genus>
				<Genus genus="ウマヅラハギ属 (Thamnaconus)" data={data_Thamnaconus}></Genus>

			</div>
		</Layout>
  	);
}
