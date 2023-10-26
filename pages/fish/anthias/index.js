import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data_Caprodon = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]アカイサキ属` , limit: 100 }});
	const data_Nemanthias = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]アカネハナゴイ属` , limit: 100 }});
	const data_Pyronotanthias = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]アカボシハナゴイ属` , limit: 100 }});
	const data_Plectranthias = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]イズハナダイ属` , limit: 100 }});
	const data_Odontanthias = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]イッテンサクラダイ属` , limit: 100 }});
	const data_Tosanoides = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]イトヒキハナダイ属` , limit: 100 }});
	const data_Sacura = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]サクラダイ属`, limit: 100 }});
	const data_Selenanthias = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]スミツキハナダイ属`, limit: 100 }});
	const data_Pseudanthias = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ナガハナダイ属`, limit: 100 }});
	const data_Mirolabrichthys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ハナゴイ属`, limit: 100 }});
	const data_Serranocirrhitus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ハナゴンベ属`, limit: 100 }});
	const data_Rabaulichthys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ホカケハナダイ属`, limit: 100 }});
	const data_Luzonichthys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ミナミハナダイ属`, limit: 100 }});
	const data_Symphysanodon = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]カワリハナダイ属`, limit: 100 }});
	const data_Callanthias = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]シキシマハナダイ属`, limit: 100 }});

	return {
    	props: {
    		data_Caprodon: data_Caprodon.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Nemanthias: data_Nemanthias.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Pyronotanthias: data_Pyronotanthias.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Plectranthias: data_Plectranthias.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Odontanthias: data_Odontanthias.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Tosanoides: data_Tosanoides.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Sacura: data_Sacura.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Selenanthias: data_Selenanthias.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Pseudanthias: data_Pseudanthias.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Mirolabrichthys: data_Mirolabrichthys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Serranocirrhitus: data_Serranocirrhitus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Rabaulichthys: data_Rabaulichthys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Luzonichthys: data_Luzonichthys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Symphysanodon: data_Symphysanodon.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Callanthias: data_Callanthias.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_Caprodon, data_Nemanthias, data_Pyronotanthias, data_Plectranthias, data_Odontanthias, data_Tosanoides, data_Sacura, data_Selenanthias, data_Pseudanthias, data_Mirolabrichthys, data_Serranocirrhitus, data_Rabaulichthys, data_Luzonichthys, data_Symphysanodon, data_Callanthias}) {

	return (
		<Layout title="ハナダイの仲間">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">ハナダイの仲間</h1>

				<Family family="ハナダイ科"></Family>
				<Genus genus="アカイサキ属 (Caprodon)" data={data_Caprodon}></Genus>
				<Genus genus="ミナミハナダイ属 (Luzonichthys)" data={data_Luzonichthys}></Genus>
				<Genus genus="ハナゴイ属 (Mirolabrichthys)" data={data_Mirolabrichthys}></Genus>
				<Genus genus="アカネハナゴイ属 (Nemanthias)" data={data_Nemanthias}></Genus>
				<Genus genus="イッテンサクラダイ属 (Odontanthias)" data={data_Odontanthias}></Genus>
				<Genus genus="イズハナダイ属 (Plectranthias)" data={data_Plectranthias}></Genus>
				<Genus genus="ナガハナダイ属 (Pseudanthias)" data={data_Pseudanthias}></Genus>
				<Genus genus="アカボシハナゴイ属 (Pyronotanthias)" data={data_Pyronotanthias}></Genus>
				<Genus genus="ホカケハナダイ属 (Rabaulichthys)" data={data_Rabaulichthys}></Genus>
				<Genus genus="サクラダイ属 (Sacura)" data={data_Sacura}></Genus>
				<Genus genus="スミツキハナダイ属 (Selenanthias)" data={data_Selenanthias}></Genus>
				<Genus genus="ハナゴンベ属 (Serranocirrhitus)" data={data_Serranocirrhitus}></Genus>
				<Genus genus="イトヒキハナダイ属 (Tosanoides)" data={data_Tosanoides}></Genus>

				<Family family="シキシマハナダイ科"></Family>
				<Genus genus="シキシマハナダイ属 (Callanthias)" data={data_Callanthias}></Genus>

				<Family family="カワリハナダイ科"></Family>
				<Genus genus="カワリハナダイ属 (Symphysanodon)" data={data_Symphysanodon}></Genus>

			</div>
		</Layout>
  	);
}
