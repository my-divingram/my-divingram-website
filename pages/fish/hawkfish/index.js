import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data_Cirrhitichthys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]オキゴンベ属` , limit: 100 }});
	const data_Oxycirrhites = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]クダゴンベ属` , limit: 100 }});
	const data_Paracirrhites = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ホシゴンベ属` , limit: 100 }});
	const data_Neocirrhites = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ベニゴンベ属` , limit: 100 }});
	const data_Cirrhitops = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]スミツキゴンベ属` , limit: 100 }});
	const data_Cyprinocirrhites = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ウイゴンベ属` , limit: 100 }});

	return {
    	props: {
    		data_Cirrhitichthys: data_Cirrhitichthys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Oxycirrhites: data_Oxycirrhites.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Paracirrhites: data_Paracirrhites.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Neocirrhites: data_Neocirrhites.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Cirrhitops: data_Cirrhitops.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Cyprinocirrhites: data_Cyprinocirrhites.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_Cirrhitichthys, data_Oxycirrhites, data_Paracirrhites, data_Neocirrhites, data_Cirrhitops, data_Cyprinocirrhites}) {

	return (
		<Layout title="ゴンベの仲間">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">ゴンベの仲間</h1>

				<Family family="ゴンベ科"></Family>
				<Genus genus="オキゴンベ属 (Cirrhitichthys)" data={data_Cirrhitichthys}></Genus>
				<Genus genus="スミツキゴンベ属 (Cirrhitops)" data={data_Cirrhitops}></Genus>
				<Genus genus="ウイゴンベ属 (Cyprinocirrhites)" data={data_Cyprinocirrhites}></Genus>
				<Genus genus="ベニゴンベ属 (Neocirrhites)" data={data_Neocirrhites}></Genus>
				<Genus genus="クダゴンベ属 (Oxycirrhites)" data={data_Oxycirrhites}></Genus>
				<Genus genus="ホシゴンベ属 (Paracirrhites)" data={data_Paracirrhites}></Genus>

			</div>
		</Layout>
  	);
}
