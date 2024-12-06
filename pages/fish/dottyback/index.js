import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data = await client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]dottyback` , limit: 1 }});
	const data_Labracinus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]メギス属` , limit: 100 }});
	const data_Pictichromis = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]クレナイニセスズメ属` , limit: 100 }});
	const data_Pseudochromis = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ニセスズメ属` , limit: 100 }});
	const data_Pseudoplesiops = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]タナバタメギス属` , limit: 100 }});

	return {
    	props: {
			data_num: data.totalCount,
    		data_Pseudochromis: data_Pseudochromis.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Pictichromis: data_Pictichromis.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Labracinus: data_Labracinus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Pseudoplesiops: data_Pseudoplesiops.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_num, data_Labracinus, data_Pictichromis, data_Pseudochromis, data_Pseudoplesiops}) {

	return (
		<Layout title="メギスの仲間 | 僕らむの魚図鑑" description="メギスの仲間の一覧です" url="https://www.my-divingram.com/fish/dottyback" imageUrl="https://www.my-divingram.com/img/class/dottyback.jpeg">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">メギスの仲間</h1>
				<p className="pt-2 text-xs md:text-sm text-center text-gray-700 font-medium">掲載種 : {data_num}種</p>

				<Family family="メギス科"></Family>
				<Genus genus="メギス属 (Labracinus)" data={data_Labracinus}></Genus>
				<Genus genus="クレナイニセスズメ属 (Pictichromis)" data={data_Pictichromis}></Genus>
				<Genus genus="ニセスズメ属 (Pseudochromis)" data={data_Pseudochromis}></Genus>
				<Genus genus="タナバタメギス属 (Pseudoplesiops)" data={data_Pseudoplesiops}></Genus>

			</div>
		</Layout>
  	);
}
