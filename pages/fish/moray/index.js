import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data = await client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]moray` , limit: 1 }});
	const data_Gymnothorax = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ウツボ属` , limit: 100 }});
	const data_Echidna = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]アラシウツボ属` , limit: 100 }});
	const data_Enchelycore = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]コケウツボ属` , limit: 100 }});
	const data_Rhinomuraena = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ハナヒゲウツボ属` , limit: 100 }});
	const data_Anarchias = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]タカマユウツボ属` , limit: 100 }});

	return {
    	props: {
			data_num: data.totalCount,
    		data_Gymnothorax: data_Gymnothorax.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Echidna: data_Echidna.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Enchelycore: data_Enchelycore.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Rhinomuraena: data_Rhinomuraena.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Anarchias: data_Anarchias.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_num, data_Gymnothorax, data_Echidna, data_Enchelycore, data_Rhinomuraena, data_Anarchias}) {

	return (
		<Layout title="ウツボの仲間 | 僕らむの魚図鑑" description="ウツボの仲間の一覧です" url="https://www.my-divingram.com/fish/moray" imageUrl="https://www.my-divingram.com/img/class/moray.jpeg">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">ウツボの仲間</h1>
				<p className="pt-2 text-xs md:text-sm text-center text-gray-700 font-medium">掲載種 (未記載種を含む) : {data_num}種</p>

				<Family family="ウツボ科"></Family>
				<Genus genus="タカマユウツボ属 (Anarchias)" data={data_Anarchias}></Genus>
				<Genus genus="アラシウツボ属 (Echidna)" data={data_Echidna}></Genus>
				<Genus genus="コケウツボ属 (Enchelycore)" data={data_Enchelycore}></Genus>
				<Genus genus="ウツボ属 (Gymnothorax)" data={data_Gymnothorax}></Genus>
				<Genus genus="ハナヒゲウツボ属 (Rhinomuraena)" data={data_Rhinomuraena}></Genus>

			</div>
		</Layout>
  	);
}
