import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data_Ophichthus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ウミヘビ属` , limit: 100 }});
	const data_Myrichthys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ゴイシウミヘビ属` , limit: 100 }});
	const data_Apterichtus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ゴマウミヘビ属` , limit: 100 }});
	const data_Ophisurus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ダイナンウミヘビ属` , limit: 100 }});
	const data_Brachysomophis = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]タツウミヘビ属` , limit: 100 }});
	const data_Callechelys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヒモウミヘビ属` , limit: 100 }});

	return {
    	props: {
    		data_Ophichthus: data_Ophichthus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Myrichthys: data_Myrichthys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Apterichtus: data_Apterichtus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Ophisurus: data_Ophisurus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Brachysomophis: data_Brachysomophis.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Callechelys: data_Callechelys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_Ophichthus, data_Myrichthys, data_Apterichtus, data_Ophisurus, data_Brachysomophis, data_Callechelys}) {

	return (
		<Layout title="ウミヘビの仲間">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">ウミヘビの仲間</h1>

				<Family family="ウミヘビ科"></Family>
				<Genus genus="ウミヘビ属 (Ophichthus)" data={data_Ophichthus}></Genus>
				<Genus genus="ゴイシウミヘビ属 (Myrichthys)" data={data_Myrichthys}></Genus>
				<Genus genus="ゴマウミヘビ属 (Apterichtus)" data={data_Apterichtus}></Genus>
				<Genus genus="ダイナンウミヘビ属 (Ophisurus)" data={data_Ophisurus}></Genus>
				<Genus genus="タツウミヘビ属 (Brachysomophis)" data={data_Brachysomophis}></Genus>
				<Genus genus="ヒモウミヘビ属 (Callechelys)" data={data_Callechelys}></Genus>

			</div>
		</Layout>
  	);
}
