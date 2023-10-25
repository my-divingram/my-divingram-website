import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data_Lophiomus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]アンコウ属` , limit: 100 }});
	const data_Abantennarius = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ベニカエルアンコウ属` , limit: 100 }});
	const data_Antennarius = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]カエルアンコウ属` , limit: 100 }});
	const data_Fowlerichthys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ソウシカエルアンコウ属` , limit: 100 }});

	return {
    	props: {
    		data_Lophiomus: data_Lophiomus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Abantennarius: data_Abantennarius.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Antennarius: data_Antennarius.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Fowlerichthys: data_Fowlerichthys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_Lophiomus, data_Abantennarius, data_Antennarius, data_Fowlerichthys}) {

	return (
		<Layout title="アンコウの仲間">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">アンコウの仲間</h1>

				<Family family="アンコウ科"></Family>
				<Genus genus="アンコウ属 (Lophiomus)" data={data_Lophiomus}></Genus>

				<Family family="カエルアンコウ科"></Family>
				<Genus genus="ベニカエルアンコウ属 (Abantennarius)" data={data_Abantennarius}></Genus>
				<Genus genus="カエルアンコウ属 (Antennarius)" data={data_Antennarius}></Genus>
				<Genus genus="ソウシカエルアンコウ属 (Fowlerichthys)" data={data_Fowlerichthys}></Genus>

			</div>
		</Layout>
  	);
}
