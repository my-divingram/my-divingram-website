import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data = await client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]ray` , limit: 1 }});
	const data_Hemitrygon = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]アカエイ属` , limit: 100 }});
	const data_Pateobatis = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]オグロオトメエイ属` , limit: 100 }});
	const data_Pastinachus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ツカエイ属` , limit: 100 }});
	const data_Taeniurops = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]マダラエイ属` , limit: 100 }});
	const data_Neotrygon = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヤッコエイ属` , limit: 100 }});
	const data_Rhinoptera = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ウシバナトビエイ属` , limit: 100 }});
	const data_Aetobatus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]マダラトビエイ属` , limit: 100 }});
	const data_Mobula = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]イトマキエイ属` , limit: 100 }});
	const data_Myliobatis = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]トビエイ属` , limit: 100 }});
	const data_Urolophus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヒラタエイ属` , limit: 100 }});
	const data_Taeniura = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]Taeniura` , limit: 100 }});


	return {
    	props: {
			data_num: data.totalCount,
    		data_Hemitrygon: data_Hemitrygon.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Pateobatis: data_Pateobatis.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Pastinachus: data_Pastinachus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Taeniurops: data_Taeniurops.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Neotrygon: data_Neotrygon.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Rhinoptera: data_Rhinoptera.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Aetobatus: data_Aetobatus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Mobula: data_Mobula.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Myliobatis: data_Myliobatis.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Urolophus: data_Urolophus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Taeniura: data_Taeniura.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_num, data_Hemitrygon, data_Pateobatis, data_Pastinachus, data_Taeniurops, data_Neotrygon, data_Rhinoptera, data_Aetobatus, data_Mobula, data_Myliobatis, data_Urolophus, data_Taeniura}) {

	return (
		<Layout title="エイの仲間">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">エイの仲間</h1>
				<p className="pt-2 text-xs md:text-sm text-center text-gray-700 font-medium">掲載種 : {data_num}種</p>

				<Family family="ヒラタエイ科"></Family>
				<Genus genus="ヒラタエイ属 (Urolophus)" data={data_Urolophus}></Genus>

				<Family family="アカエイ科"></Family>
				<Genus genus="アカエイ属 (Hemitrygon)" data={data_Hemitrygon}></Genus>
				<Genus genus="ヤッコエイ属 (Neotrygon)" data={data_Neotrygon}></Genus>
				<Genus genus="ツカエイ属 (Pastinachus)" data={data_Pastinachus}></Genus>
				<Genus genus="オグロオトメエイ属 (Pateobatis)" data={data_Pateobatis}></Genus>
				<Genus genus="マダラエイ属 (Taeniurops)" data={data_Taeniurops}></Genus>
				<Genus genus="Taeniura属" data={data_Taeniura}></Genus>

				<Family family="トビエイ科"></Family>
				<Genus genus="トビエイ属 (Myliobatis)" data={data_Myliobatis}></Genus>
				<Genus genus="マダラトビエイ属 (Aetobatus)" data={data_Aetobatus}></Genus>
				<Genus genus="ウシバナトビエイ属 (Rhinoptera)" data={data_Rhinoptera}></Genus>
				<Genus genus="イトマキエイ属 (Mobula)" data={data_Mobula}></Genus>

			</div>
		</Layout>
  	);
}
