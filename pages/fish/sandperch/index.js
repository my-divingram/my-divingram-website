import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data = await client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]sandperch` , limit: 1 }});
	const data_Parapercis = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]トラギス属` , limit: 100 }});
	const data_Osopsaron = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヒメトラギス属` , limit: 100 }});

	return {
    	props: {
			data_num: data.totalCount,
			data_Parapercis: data_Parapercis.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Osopsaron: data_Osopsaron.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_num, data_Parapercis, data_Osopsaron}) {

	return (
		<Layout title="トラギスの仲間 | 僕らむの魚図鑑" description="トラギスの仲間の一覧です" url="https://my-divingram-website.vercel.app/fish/sandperch" imageUrl="https://my-divingram-website.vercel.app/img/class/sandperch.jpeg">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">トラギスの仲間</h1>
				<p className="pt-2 text-xs md:text-sm text-center text-gray-700 font-medium">掲載種 : {data_num}種</p>

				<Family family="トラギス科"></Family>
				<Genus genus="トラギス属 (Parapercis)" data={data_Parapercis}></Genus>

				<Family family="ホカケトラギス科"></Family>
				<Genus genus="ヒメトラギス属 (Osopsaron)" data={data_Osopsaron}></Genus>
			</div>
		</Layout>
  	);
}
