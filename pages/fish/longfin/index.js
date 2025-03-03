import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data = await client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]longfin` , limit: 1 }});
	const data_Calloplesiops = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]シモフリタナバタウオ属` , limit: 100 }});
	const data_Assessor = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ツバメタナバタウオ属` , limit: 100 }});
	const data_Plesiops = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]タナバタウオ属` , limit: 100 }});
	const data_Acanthoplesiops = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]フチドリタナバタウオ属` , limit: 100 }});

	return {
    	props: {
			data_num: data.totalCount,
			data_Calloplesiops: data_Calloplesiops.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Assessor: data_Assessor.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Plesiops: data_Plesiops.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Acanthoplesiops: data_Acanthoplesiops.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_num, data_Calloplesiops, data_Acanthoplesiops, data_Assessor, data_Plesiops}) {

	return (
		<Layout title="タナバタウオの仲間 | 僕らむの魚図鑑" description="タナバタウオの仲間の一覧です" url="https://www.my-divingram.com/fish/longfin" imageUrl="https://www.my-divingram.com/img/class/longfin.jpeg">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">タナバタウオの仲間</h1>
				<p className="pt-2 text-xs md:text-sm text-center text-gray-700 font-medium">掲載種 : {data_num}種</p>

				<Family family="タナバタウオ科"></Family>
				<Genus genus="フチドリタナバタウオ属 (Acanthoplesiops)" data={data_Acanthoplesiops}></Genus>
				<Genus genus="ツバメタナバタウオ属 (Assessor)" data={data_Assessor}></Genus>
				<Genus genus="シモフリタナバタウオ属 (Calloplesiops)" data={data_Calloplesiops}></Genus>
				<Genus genus="タナバタウオ属 (Plesiops)" data={data_Plesiops}></Genus>

			</div>
		</Layout>
  	);
}
