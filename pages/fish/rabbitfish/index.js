import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data = await client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]rabbitfish` , limit: 1 }});
	const data_Siganus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]アイゴ属` , limit: 100 }});

	return {
    	props: {
			data_num: data.totalCount,
    		data_Siganus: data_Siganus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_num, data_Siganus}) {

	return (
		<Layout title="アイゴの仲間 | 僕らむの魚図鑑" description="アイゴの仲間の一覧です" url="https://my-divingram-website.vercel.app/fish/rabbitfish" imageUrl="https://my-divingram-website.vercel.app/img/class/rabbitfish.jpeg">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">アイゴの仲間</h1>
				<p className="pt-2 text-xs md:text-sm text-center text-gray-700 font-medium">掲載種 : {data_num}種</p>

				<Family family="アイゴ科"></Family>
				<Genus genus="アイゴ属 (Siganus)" data={data_Siganus}></Genus>

			</div>
		</Layout>
  	);
}
