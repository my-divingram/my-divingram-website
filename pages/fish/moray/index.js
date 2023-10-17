import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data_Gymnothorax = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ウツボ属` , limit: 100 }});
	const data_Echidna = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]アラシウツボ属` , limit: 100 }});
	const data_Enchelycore = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]コケウツボ属` , limit: 100 }});
	const data_Muraena = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]トラウツボ属` , limit: 100 }});
	const data_Rhinomuraena = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ハナヒゲウツボ属` , limit: 100 }});

	return {
    	props: {
    		data_Gymnothorax: data_Gymnothorax.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Echidna: data_Echidna.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Enchelycore: data_Enchelycore.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Muraena: data_Muraena.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Rhinomuraena: data_Rhinomuraena.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_Gymnothorax, data_Echidna, data_Enchelycore, data_Muraena, data_Rhinomuraena}) {

	return (
		<Layout title="ウツボの仲間">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">ウツボの仲間</h1>

				<Family family="ウツボ科"></Family>
				<Genus genus="ウツボ属 (Gymnothorax)" data={data_Gymnothorax}></Genus>
				<Genus genus="アラシウツボ属 (Echidna)" data={data_Echidna}></Genus>
				<Genus genus="コケウツボ属 (Enchelycore)" data={data_Enchelycore}></Genus>
				<Genus genus="トラウツボ属 (Muraena)" data={data_Muraena}></Genus>
				<Genus genus="ハナヒゲウツボ属 (Rhinomuraena)" data={data_Rhinomuraena}></Genus>

			</div>
		</Layout>
  	);
}