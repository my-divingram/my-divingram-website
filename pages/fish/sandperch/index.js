import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data = await client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]sandperch` , limit: 1 }});
	const data_Parapercis = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]トラギス属` , limit: 100 }});
	const data_Osopsaron = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヒメトラギス属` , limit: 100 }});
	const data_Trichonotus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ベラギンポ属` , limit: 100 }});
	const data_Limnichthys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]トビギンポ属` , limit: 100 }});
	const data_Uranoscopus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ミシマオコゼ属` , limit: 100 }});
	const data_Pteropsaron = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ホカケトラギス属` , limit: 100 }});

	return {
    	props: {
			data_num: data.totalCount,
			data_Parapercis: data_Parapercis.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Osopsaron: data_Osopsaron.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Trichonotus: data_Trichonotus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Limnichthys: data_Limnichthys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Uranoscopus: data_Uranoscopus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Pteropsaron: data_Pteropsaron.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_num, data_Parapercis, data_Osopsaron, data_Trichonotus, data_Limnichthys, data_Uranoscopus, data_Pteropsaron}) {

	return (
		<Layout title="ワニギスの仲間 | 僕らむの魚図鑑" description="ワニギスの仲間の一覧です" url="https://www.my-divingram.com/fish/sandperch" imageUrl="https://www.my-divingram.com/img/class/sandperch.jpeg">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">ワニギスの仲間</h1>
				<p className="pt-2 text-xs md:text-sm text-center text-gray-700 font-medium">掲載種 : {data_num}種</p>

				<Family family="トラギス科"></Family>
				<Genus genus="トラギス属 (Parapercis)" data={data_Parapercis}></Genus>

				<Family family="ホカケトラギス科"></Family>
				<Genus genus="ヒメトラギス属 (Osopsaron)" data={data_Osopsaron}></Genus>
				<Genus genus="ホカケトラギス属 (Pteropsaron)" data={data_Pteropsaron}></Genus>

				<Family family="ベラギンポ科"></Family>
				<Genus genus="ベラギンポ属 (Trichonotus)" data={data_Trichonotus}></Genus>

				<Family family="トビギンポ科"></Family>
				<Genus genus="トビギンポ属 (Limnichthys)" data={data_Limnichthys}></Genus>

				<Family family="ミシマオコゼ科"></Family>
				<Genus genus="ミシマオコゼ属 (Uranoscopus)" data={data_Uranoscopus}></Genus>

			</div>
		</Layout>
  	);
}
