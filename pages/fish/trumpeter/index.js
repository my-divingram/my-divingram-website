import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data = await client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]trumpeter` , limit: 1 }});
	const data_Goniistius = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]タカノハダイ属` , limit: 100 }});

	return {
    	props: {
			data_num: data.totalCount,
    		data_Goniistius: data_Goniistius.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_num, data_Goniistius}) {

	return (
		<Layout title="タカノハダイの仲間 | 僕らむの魚図鑑" description="タカノハダイの仲間の一覧です" url="https://www.my-divingram.com/fish/trumpeter" imageUrl="https://www.my-divingram.com/img/class/trumpeter.jpeg">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">タカノハダイの仲間</h1>
				<p className="pt-2 text-xs md:text-sm text-center text-gray-700 font-medium">掲載種 : {data_num}種</p>

				<Family family="タカノハダイ科"></Family>
				<Genus genus="タカノハダイ属 (Goniistius)" data={data_Goniistius}></Genus>

			</div>
		</Layout>
  	);
}
