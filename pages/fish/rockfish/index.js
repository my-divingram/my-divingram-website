import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data_Sebastes = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]メバル属` , limit: 100 }});
	const data_Sebastiscus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]カサゴ属` , limit: 100 }});
	const data_Pterois = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ミノカサゴ属` , limit: 100 }});
	const data_Parapterois = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]セトミノカサゴ属` , limit: 100 }});
	const data_Dendrochirus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヒメヤマノカミ属` , limit: 100 }});
	const data_Taenianotus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ハダカハオコゼ属` , limit: 100 }});
	const data_Rhinopias = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ボロカサゴ属` , limit: 100 }});
	const data_Pteroidichthys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ツノカサゴ属` , limit: 100 }});
	const data_Scorpaenopsis = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]オニカサゴ属` , limit: 100 }});
	const data_Scorpaena = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]フサカサゴ属` , limit: 100 }});
	const data_Sebastapistes = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]マダラフサカサゴ属` , limit: 100 }});
	const data_Parascorpaena = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ネッタイフサカサゴ属` , limit: 100 }});
	const data_Scorpaenodes = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]イソカサゴ属` , limit: 100 }});
	const data_Caracanthus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ダンゴオコゼ属` , limit: 100 }});
	const data_Neosebastes = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヒレナガカサゴ属` , limit: 100 }});

	return {
    	props: {
    		data_Sebastes: data_Sebastes.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Sebastiscus: data_Sebastiscus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Pterois: data_Pterois.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Parapterois: data_Parapterois.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Dendrochirus: data_Dendrochirus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Taenianotus: data_Taenianotus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Rhinopias: data_Rhinopias.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Pteroidichthys: data_Pteroidichthys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Scorpaenopsis: data_Scorpaenopsis.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Scorpaena: data_Scorpaena.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Sebastapistes: data_Sebastapistes.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Parascorpaena: data_Parascorpaena.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Scorpaenodes: data_Scorpaenodes.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Caracanthus: data_Caracanthus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Neosebastes: data_Neosebastes.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_Sebastes, data_Sebastiscus, data_Pterois, data_Parapterois, data_Dendrochirus, data_Taenianotus, data_Rhinopias, data_Pteroidichthys, data_Scorpaenopsis, data_Scorpaena, data_Sebastapistes, data_Parascorpaena, data_Scorpaenodes, data_Caracanthus, data_Neosebastes}) {

	return (
		<Layout title="メバル・カサゴの仲間">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">メバル・カサゴの仲間</h1>

				<Family family="メバル科"></Family>
				<Genus genus="メバル属 (Sebastes)" data={data_Sebastes}></Genus>
				<Genus genus="カサゴ属 (Sebastiscus)" data={data_Sebastiscus}></Genus>

				<Family family="フサカサゴ科"></Family>
				<Genus genus="ミノカサゴ属 (Pterois)" data={data_Pterois}></Genus>
				<Genus genus="セトミノカサゴ属 (Parapterois)" data={data_Parapterois}></Genus>
				<Genus genus="ヒメヤマノカミ属 (Dendrochirus)" data={data_Dendrochirus}></Genus>
				<Genus genus="ハダカハオコゼ属 (Taenianotus)" data={data_Taenianotus}></Genus>
				<Genus genus="ボロカサゴ属 (Rhinopias)" data={data_Rhinopias}></Genus>
				<Genus genus="ツノカサゴ属 (Pteroidichthys)" data={data_Pteroidichthys}></Genus>
				<Genus genus="オニカサゴ属 (Scorpaenopsis)" data={data_Scorpaenopsis}></Genus>
				<Genus genus="フサカサゴ属 (Scorpaena)" data={data_Scorpaena}></Genus>
				<Genus genus="マダラフサカサゴ属 (Sebastapistes)" data={data_Sebastapistes}></Genus>
				<Genus genus="ネッタイフサカサゴ属 (Parascorpaena)" data={data_Parascorpaena}></Genus>
				<Genus genus="イソカサゴ属 (Scorpaenodes)" data={data_Scorpaenodes}></Genus>
				<Genus genus="ダンゴオコゼ属 (Caracanthus)" data={data_Caracanthus}></Genus>

				<Family family="ヒレナガカサゴ科"></Family>
				<Genus genus="ヒレナガカサゴ属 (Neosebastes)" data={data_Neosebastes}></Genus>

			</div>
		</Layout>
  	);
}
