import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data = await client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]flatfish` , limit: 1 }});
	const data_Paralichthys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヒラメ属` , limit: 100 }});
	const data_Asterorhombus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]セイテンビラメ属` , limit: 100 }});
	const data_Bothus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ホシダルマガレイ属` , limit: 100 }});
	const data_Crossorhombus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]コウベダルマガレイ属` , limit: 100 }});
	const data_Engyprosopon = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ダルマガレイ属` , limit: 100 }});
	const data_Pleuronichthys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]メイタガレイ属` , limit: 100 }});
	const data_Aseraggodes = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]トビササウシノシタ属` , limit: 100 }});
	const data_Brachirus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ミナミシマウシノシタ属` , limit: 100 }});
	const data_Pardachirus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ミナミウシノシタ属` , limit: 100 }});
	const data_Soleichthys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]サザナミウシノシタ属` , limit: 100 }});
	const data_Cynoglossus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]オオシタビラメ属` , limit: 100 }});
	const data_Pseudorhombus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ガンゾウビラメ属` , limit: 100 }});
	const data_Tarphops = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]アラメガレイ属` , limit: 100 }});
	const data_Zebrias = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]シマウシノシタ属` , limit: 100 }});

	return {
    	props: {
			data_num: data.totalCount,
    		data_Paralichthys: data_Paralichthys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Asterorhombus: data_Asterorhombus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Bothus: data_Bothus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Crossorhombus: data_Crossorhombus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Engyprosopon: data_Engyprosopon.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Pleuronichthys: data_Pleuronichthys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Aseraggodes: data_Aseraggodes.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Brachirus: data_Brachirus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Pardachirus: data_Pardachirus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Soleichthys: data_Soleichthys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Cynoglossus: data_Cynoglossus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Pseudorhombus: data_Pseudorhombus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Tarphops: data_Tarphops.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Zebrias: data_Zebrias.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_num, data_Paralichthys, data_Asterorhombus, data_Bothus, data_Crossorhombus, data_Engyprosopon, data_Pleuronichthys, data_Aseraggodes, data_Brachirus, data_Pardachirus, data_Soleichthys, data_Cynoglossus, data_Pseudorhombus, data_Tarphops, data_Zebrias}) {

	return (
		<Layout title="カレイの仲間 | 僕らむの魚図鑑" description="カレイの仲間の一覧です" url="https://www.my-divingram.com/fish/flatfish" imageUrl="https://www.my-divingram.com/img/class/flatfish.jpeg">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">カレイの仲間</h1>
				<p className="pt-2 text-xs md:text-sm text-center text-gray-700 font-medium">掲載種 : {data_num}種</p>

				<Family family="ヒラメ科"></Family>
				<Genus genus="ヒラメ属 (Paralichthys)" data={data_Paralichthys}></Genus>
				<Genus genus="ガンゾウビラメ属 (Pseudorhombus)" data={data_Pseudorhombus}></Genus>
				<Genus genus="アラメガレイ属 (Tarphops)" data={data_Tarphops}></Genus>

				<Family family="ダルマガレイ科"></Family>
				<Genus genus="セイテンビラメ属 (Asterorhombus)" data={data_Asterorhombus}></Genus>
				<Genus genus="ホシダルマガレイ属 (Bothus)" data={data_Bothus}></Genus>
				<Genus genus="コウベダルマガレイ属 (Crossorhombus)" data={data_Crossorhombus}></Genus>
				<Genus genus="ダルマガレイ属 (Engyprosopon)" data={data_Engyprosopon}></Genus>

				<Family family="カレイ科"></Family>
				<Genus genus="メイタガレイ属 (Pleuronichthys)" data={data_Pleuronichthys}></Genus>

				<Family family="ササウシノシタ科"></Family>
				<Genus genus="トビササウシノシタ属 (Aseraggodes)" data={data_Aseraggodes}></Genus>
				<Genus genus="ミナミシマウシノシタ属 (Brachirus)" data={data_Brachirus}></Genus>
				<Genus genus="ミナミウシノシタ属 (Pardachirus)" data={data_Pardachirus}></Genus>
				<Genus genus="サザナミウシノシタ属 (Soleichthys)" data={data_Soleichthys}></Genus>
				<Genus genus="シマウシノシタ属 (Zebrias)" data={data_Zebrias}></Genus>

				<Family family="ウシノシタ科"></Family>
				<Genus genus="オオシタビラメ属 (Cynoglossus)" data={data_Cynoglossus}></Genus>

			</div>
		</Layout>
  	);
}
