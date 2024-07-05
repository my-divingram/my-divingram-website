import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data = await client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]shark` , limit: 1 }});
	const data_Heterodontus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ネコザメ属` , limit: 100 }});
	const data_Carcharias = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]シロワニ属` , limit: 100 }});
	const data_Rhincodon = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ジンベエザメ属` , limit: 100 }});
	const data_Cephaloscyllium = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ナヌカザメ属` , limit: 100 }});
	const data_Triaenodon = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ネムリブカ属` , limit: 100 }});
	const data_Carcharhinus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]メジロザメ属` , limit: 100 }});
	const data_Sphyrna = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]シュモクザメ属` , limit: 100 }});
	const data_Squatina = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]カスザメ属` , limit: 100 }});
	const data_Squalus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ツノザメ属` , limit: 100 }});

	return {
    	props: {
			data_num: data.totalCount,
    		data_Heterodontus: data_Heterodontus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Carcharias: data_Carcharias.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Rhincodon: data_Rhincodon.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Cephaloscyllium: data_Cephaloscyllium.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Triaenodon: data_Triaenodon.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Carcharhinus: data_Carcharhinus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Sphyrna: data_Sphyrna.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Squatina: data_Squatina.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Squalus: data_Squalus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_num, data_Heterodontus, data_Carcharias, data_Rhincodon, data_Cephaloscyllium, data_Triaenodon, data_Carcharhinus, data_Sphyrna, data_Squatina, data_Squalus}) {

	return (
		<Layout title="サメの仲間 | 僕らむの魚図鑑" description="サメの仲間の一覧です" url="https://my-divingram-website.vercel.app/fish/shark" imageUrl="https://my-divingram-website.vercel.app/img/class/shark.jpeg">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">サメの仲間</h1>
				<p className="pt-2 text-xs md:text-sm text-center text-gray-700 font-medium">掲載種 : {data_num}種</p>

				<Family family="ネコザメ科"></Family>
				<Genus genus="ネコザメ属 (Heterodontus)" data={data_Heterodontus}></Genus>

				<Family family="ジンベエザメ科"></Family>
				<Genus genus="ジンベエザメ属 (Rhincodon)" data={data_Rhincodon}></Genus>

				<Family family="オオワニザメ科"></Family>
				<Genus genus="シロワニ属 (Carcharias)" data={data_Carcharias}></Genus>

				<Family family="トラザメ科"></Family>
				<Genus genus="ナヌカザメ属 (Cephaloscyllium)" data={data_Cephaloscyllium}></Genus>

				<Family family="メジロザメ科"></Family>
				<Genus genus="メジロザメ属 (Carcharhinus)" data={data_Carcharhinus}></Genus>
				<Genus genus="ネムリブカ属 (Triaenodon)" data={data_Triaenodon}></Genus>

				<Family family="シュモクザメ科"></Family>
				<Genus genus="シュモクザメ属 (Sphyrna)" data={data_Sphyrna}></Genus>

				<Family family="ツノザメ科"></Family>
				<Genus genus="ツノザメ属 (Squalus)" data={data_Squalus}></Genus>

				<Family family="カスザメ科"></Family>
				<Genus genus="カスザメ属 (Squatina)" data={data_Squatina}></Genus>

			</div>
		</Layout>
  	);
}
