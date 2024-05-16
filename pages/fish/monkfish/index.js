import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data = await client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]monkfish` , limit: 1 }});
	const data_Lophiomus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]アンコウ属` , limit: 100 }});
	const data_Abantennarius = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ベニカエルアンコウ属` , limit: 100 }});
	const data_Antennarius = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]カエルアンコウ属` , limit: 100 }});
	const data_Fowlerichthys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ソウシカエルアンコウ属` , limit: 100 }});
	const data_Nudiantennarius = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]Nudiantennarius` , limit: 100 }});

	return {
    	props: {
			data_num: data.totalCount,
    		data_Lophiomus: data_Lophiomus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Abantennarius: data_Abantennarius.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Antennarius: data_Antennarius.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Fowlerichthys: data_Fowlerichthys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Nudiantennarius: data_Nudiantennarius.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_num, data_Lophiomus, data_Abantennarius, data_Antennarius, data_Fowlerichthys, data_Nudiantennarius}) {

	return (
		<Layout title="アンコウの仲間">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">アンコウの仲間</h1>
				<p className="pt-2 text-xs md:text-sm text-center text-gray-700 font-medium">掲載種 : {data_num}種</p>

				<Family family="アンコウ科"></Family>
				<Genus genus="アンコウ属 (Lophiomus)" data={data_Lophiomus}></Genus>

				<Family family="カエルアンコウ科"></Family>
				<Genus genus="ベニカエルアンコウ属 (Abantennarius)" data={data_Abantennarius}></Genus>
				<Genus genus="カエルアンコウ属 (Antennarius)" data={data_Antennarius}></Genus>
				<Genus genus="ソウシカエルアンコウ属 (Fowlerichthys)" data={data_Fowlerichthys}></Genus>
				<Genus genus="Nudiantennarius属" data={data_Nudiantennarius}></Genus>

			</div>
		</Layout>
  	);
}
