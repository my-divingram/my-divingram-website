import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data_Dasyatis = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]アカエイ属` , limit: 100 }});
	const data_Himantura = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]アミメオトメエイ属` , limit: 100 }});
	const data_Pastinachus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ツカエイ属` , limit: 100 }});
	const data_Taeniura = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]マダラエイ属` , limit: 100 }});
	const data_Neotrygon = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヤッコエイ属` , limit: 100 }});
	const data_Rhinoptera = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ウシバナトビエイ属` , limit: 100 }});
	const data_Aetobatus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]マダラトビエイ属` , limit: 100 }});
	const data_Mobula = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]イトマキエイ属` , limit: 100 }});
	const data_Manta = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]オニイトマキエイ属` , limit: 100 }});
	const data_Myliobatis = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]トビエイ属` , limit: 100 }});
	const data_Urolophus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヒラタエイ属` , limit: 100 }});


	return {
    	props: {
    		data_Dasyatis: data_Dasyatis.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Himantura: data_Himantura.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Pastinachus: data_Pastinachus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Taeniura: data_Taeniura.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Neotrygon: data_Neotrygon.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Rhinoptera: data_Rhinoptera.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Aetobatus: data_Aetobatus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Mobula: data_Mobula.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Manta: data_Manta.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Myliobatis: data_Myliobatis.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Urolophus: data_Urolophus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_Dasyatis, data_Himantura, data_Pastinachus, data_Taeniura, data_Neotrygon, data_Rhinoptera, data_Aetobatus, data_Mobula, data_Manta, data_Myliobatis, data_Urolophus}) {

	return (
		<Layout title="エイの仲間">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">エイの仲間</h1>

				<Family family="アカエイ科"></Family>
				<Genus genus="アカエイ属 (Dasyatis)" data={data_Dasyatis}></Genus>
				<Genus genus="アミメオトメエイ属 (Himantura)" data={data_Himantura}></Genus>
				<Genus genus="ツカエイ属 (Pastinachus)" data={data_Pastinachus}></Genus>
				<Genus genus="マダラエイ属 (Taeniura)" data={data_Taeniura}></Genus>
				<Genus genus="ヤッコエイ属 (Neotrygon)" data={data_Neotrygon}></Genus>

				<Family family="ヒラタエイ科"></Family>
				<Genus genus="ヒラタエイ属 (Urolophus)" data={data_Urolophus}></Genus>

				<Family family="トビエイ科"></Family>
				<Genus genus="トビエイ属 (Myliobatis)" data={data_Myliobatis}></Genus>
				<Genus genus="ウシバナトビエイ属 (Rhinoptera)" data={data_Rhinoptera}></Genus>
				<Genus genus="マダラトビエイ属 (Aetobatus)" data={data_Aetobatus}></Genus>
				<Genus genus="イトマキエイ属 (Mobula)" data={data_Mobula}></Genus>
				<Genus genus="オニイトマキエイ属 (Manta)" data={data_Manta}></Genus>

			</div>
		</Layout>
  	);
}
