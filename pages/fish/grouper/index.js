import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data = await client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]grouper` , limit: 1 }});
	const data_Epinephelus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]アカハタ属` , limit: 100 }});
	const data_Cephalopholis = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ユカタハタ属` , limit: 100 }});
	const data_Aethaloperca = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]クロハタ属` , limit: 100 }});
	const data_Plectropomus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]スジアラ属` , limit: 100 }});
	const data_Variola = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]バラハタ属` , limit: 100 }});
	const data_Gracila = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]タテスジハタ属` , limit: 100 }});
	const data_Chromileptes = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]サラサハタ属` , limit: 100 }});
	const data_Diploprion = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]キハッソク属` , limit: 100 }});
	const data_Aulacocephalus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ルリハタ属` , limit: 100 }});
	const data_Liopropoma = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ハナスズキ属` , limit: 100 }});
	const data_Grammistes = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヌノサラシ属` , limit: 100 }});
	const data_Belonoperca = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヤミスズキ属` , limit: 100 }});
	const data_Anyperodon = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]アズキハタ属` , limit: 100 }});
	const data_Pogonoperca = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]アゴハタ属` , limit: 100 }});
	const data_Paralabrax = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]Paralabrax`, limit: 100 }});

	return {
    	props: {
			data_num: data.totalCount,
    		data_Epinephelus: data_Epinephelus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Cephalopholis: data_Cephalopholis.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Aethaloperca: data_Aethaloperca.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Plectropomus: data_Plectropomus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Variola: data_Variola.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Gracila: data_Gracila.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Chromileptes: data_Chromileptes.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Diploprion: data_Diploprion.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Aulacocephalus: data_Aulacocephalus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Liopropoma: data_Liopropoma.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Grammistes: data_Grammistes.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Belonoperca: data_Belonoperca.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Anyperodon: data_Anyperodon.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Pogonoperca: data_Pogonoperca.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Paralabrax: data_Paralabrax.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_num, data_Epinephelus, data_Cephalopholis, data_Aethaloperca, data_Plectropomus, data_Variola, data_Gracila, data_Chromileptes, data_Diploprion, data_Aulacocephalus, data_Liopropoma, data_Grammistes, data_Belonoperca, data_Anyperodon, data_Pogonoperca, data_Paralabrax}) {

	return (
		<Layout title="ハタの仲間 | 僕らむの魚図鑑" description="ハタの仲間の一覧です" url="https://www.my-divingram.com/fish/grouper" imageUrl="https://www.my-divingram.com/img/class/grouper.jpeg">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">ハタの仲間</h1>
				<p className="pt-2 text-xs md:text-sm text-center text-gray-700 font-medium">掲載種 : {data_num}種</p>

				<Family family="ハタ科"></Family>
				<Genus genus="ルリハタ属 (Aulacocephalus)" data={data_Aulacocephalus}></Genus>
				<Genus genus="ヤミスズキ属 (Belonoperca)" data={data_Belonoperca}></Genus>
				<Genus genus="キハッソク属 (Diploprion)" data={data_Diploprion}></Genus>
				<Genus genus="クロハタ属 (Aethaloperca)" data={data_Aethaloperca}></Genus>
				<Genus genus="アズキハタ属 (Anyperodon)" data={data_Anyperodon}></Genus>
				<Genus genus="ユカタハタ属 (Cephalopholis)" data={data_Cephalopholis}></Genus>
				<Genus genus="サラサハタ属 (Chromileptes)" data={data_Chromileptes}></Genus>
				<Genus genus="アカハタ属 (Epinephelus)" data={data_Epinephelus}></Genus>
				<Genus genus="タテスジハタ属 (Gracila)" data={data_Gracila}></Genus>
				<Genus genus="Paralabrax属" data={data_Paralabrax}></Genus>
				<Genus genus="スジアラ属 (Plectropomus)" data={data_Plectropomus}></Genus>
				<Genus genus="アゴハタ属 (Pogonoperca)" data={data_Pogonoperca}></Genus>
				<Genus genus="バラハタ属 (Variola)" data={data_Variola}></Genus>
				<Genus genus="ヌノサラシ属 (Grammistes)" data={data_Grammistes}></Genus>
				<Genus genus="ハナスズキ属 (Liopropoma)" data={data_Liopropoma}></Genus>

			</div>
		</Layout>
  	);
}
