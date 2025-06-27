import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data = await client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]sculpin` , limit: 1 }});
	const data_Furcina = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]サラサカジカ属` , limit: 100 }});
	const data_Pseudoblennius = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]アナハゼ属` , limit: 100 }});
	const data_Vellitor = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]スイ属` , limit: 100 }});
	const data_Ocynectes = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]イダテンカジカ属` , limit: 100 }});

	return {
    	props: {
			data_num: data.totalCount,
    		data_Pseudoblennius: data_Pseudoblennius.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Furcina: data_Furcina.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Vellitor: data_Vellitor.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Ocynectes: data_Ocynectes.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_num, data_Furcina, data_Vellitor, data_Pseudoblennius, data_Ocynectes}) {

	return (
		<Layout title="カジカの仲間 | 僕らむの魚図鑑" description="カジカの仲間の一覧です" url="https://www.my-divingram.com/fish/sculpin" imageUrl="https://www.my-divingram.com/img/class/sculpin.jpeg">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">カジカの仲間</h1>
				<p className="pt-2 text-xs md:text-sm text-center text-gray-700 font-medium">掲載種 : {data_num}種</p>

				<Family family="カジカ科"></Family>
				<Genus genus="サラサカジカ属 (Furcina)" data={data_Furcina}></Genus>
				<Genus genus="イダテンカジカ属 (Ocynectes)" data={data_Ocynectes}></Genus>
				<Genus genus="アナハゼ属 (Pseudoblennius)" data={data_Pseudoblennius}></Genus>
				<Genus genus="スイ属 (Vellitor)" data={data_Vellitor}></Genus>

			</div>
		</Layout>
  	);
}
