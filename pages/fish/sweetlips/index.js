import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data = await client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]sweetlips` , limit: 1 }});
	const data_Parapristipoma = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]イサキ属` , limit: 100 }});
	const data_Plectorhinchus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]コショウダイ属` , limit: 100 }});
	const data_Diagramma = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]コロダイ属` , limit: 100 }});

	return {
    	props: {
			data_num: data.totalCount,
    		data_Parapristipoma: data_Parapristipoma.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Plectorhinchus: data_Plectorhinchus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Diagramma: data_Diagramma.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_num, data_Parapristipoma, data_Plectorhinchus, data_Diagramma}) {

	return (
		<Layout title="イサキの仲間 | 僕らむの魚図鑑" description="イサキの仲間の一覧です" url="https://my-divingram-website.vercel.app/fish/sweetlips" imageUrl="https://my-divingram-website.vercel.app/img/class/sweetlips.jpeg">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">イサキの仲間</h1>
				<p className="pt-2 text-xs md:text-sm text-center text-gray-700 font-medium">掲載種 : {data_num}種</p>

				<Family family="イサキ科"></Family>
				<Genus genus="コロダイ属 (Diagramma)" data={data_Diagramma}></Genus>
				<Genus genus="イサキ属 (Parapristipoma)" data={data_Parapristipoma}></Genus>
				<Genus genus="コショウダイ属 (Plectorhinchus)" data={data_Plectorhinchus}></Genus>

			</div>
		</Layout>
  	);
}
