import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data = await client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]wrasse` , limit: 1 }});
	const data_Pseudojuloides = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]オグロベラ属` , limit: 100 }});
	const data_Terelabrus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ミヤビベラ属` , limit: 100 }});
	const data_Pseudolabrus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ササノハベラ属` , limit: 100 }});
	const data_Pteragogus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]オハグロベラ属` , limit: 100 }});
	const data_Halichoeres = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ホンベラ属` , limit: 100 }});
	const data_Choerodon = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]イラ属` , limit: 100 }});
	const data_Suezichthys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]イトベラ属` , limit: 100 }});
	const data_Novaculichthys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]オビテンスモドキ属` , limit: 100 }});
	const data_Oxycheilinus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ホホスジモチノウオ属` , limit: 100 }});
	const data_Novaculoides = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]オオヒレテンスモドキ属` , limit: 100 }});
	const data_Cirrhilabrus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]イトヒキベラ属` , limit: 100 }});
	const data_Stethojulis = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]カミナリベラ属` , limit: 100 }});
	const data_Coris = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]カンムリベラ属` , limit: 100 }});
	const data_Bodianus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]タキベラ属` , limit: 100 }});
	const data_Cheilinus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]モチノウオ属` , limit: 100 }});
	const data_Cheilio = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]カマスベラ属` , limit: 100 }});
	const data_Thalassoma = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ニシキベラ属` , limit: 100 }});
	const data_Labroides = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ソメワケベラ属` , limit: 100 }});
	const data_Hemigymnus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]タレクチベラ属` , limit: 100 }});
	const data_Parajulis = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]キュウセン属` , limit: 100 }});
	const data_Cymolutes = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]タテヤマベラ属` , limit: 100 }});
	const data_Anampses = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ススキベラ属` , limit: 100 }});
	const data_Pseudocoris = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]シラタキベラダマシ属` , limit: 100 }});
	const data_Labrichthys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]クロベラ属` , limit: 100 }});
	const data_Novaculops = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]テンスモドキ属` , limit: 100 }});
	const data_Iniistius = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]テンス属` , limit: 100 }});
	const data_Hologymnosus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]シロタスキベラ属` , limit: 100 }});
	const data_Semicossyphus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]コブダイ属` , limit: 100 }});
	const data_Epibulus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ギチベラ属` , limit: 100 }});
	const data_Labropsis = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]マナベベラ属` , limit: 100 }});
	const data_Gomphosus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]クギベラ属` , limit: 100 }});
	const data_Paracheilinus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]クジャクベラ属` , limit: 100 }});
	const data_Pseudocheilinus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ニセモチノウオ属` , limit: 100 }});
	const data_Macropharyngodon = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ノドグロベラ属` , limit: 100 }});
	const data_Wetmorella = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ハシナガベラ属` , limit: 100 }});
	const data_Xyrichtys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ホンテンスモドキ属` , limit: 100 }});

	return {
    	props: {
			data_num: data.totalCount,
    		data_Pseudojuloides: data_Pseudojuloides.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Terelabrus: data_Terelabrus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Pseudolabrus: data_Pseudolabrus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Pteragogus: data_Pteragogus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Halichoeres: data_Halichoeres.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Choerodon: data_Choerodon.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Suezichthys: data_Suezichthys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Novaculichthys: data_Novaculichthys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Oxycheilinus: data_Oxycheilinus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Novaculoides: data_Novaculoides.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Cirrhilabrus: data_Cirrhilabrus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Stethojulis: data_Stethojulis.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Coris: data_Coris.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Bodianus: data_Bodianus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Cheilinus: data_Cheilinus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Cheilio: data_Cheilio.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Thalassoma: data_Thalassoma.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Labroides: data_Labroides.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Hemigymnus: data_Hemigymnus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Parajulis: data_Parajulis.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Cymolutes: data_Cymolutes.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Anampses: data_Anampses.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Pseudocoris: data_Pseudocoris.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Labrichthys: data_Labrichthys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Novaculops: data_Novaculops.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Iniistius: data_Iniistius.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Hologymnosus: data_Hologymnosus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Semicossyphus: data_Semicossyphus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Epibulus: data_Epibulus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Labropsis: data_Labropsis.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Gomphosus: data_Gomphosus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Paracheilinus: data_Paracheilinus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Pseudocheilinus: data_Pseudocheilinus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Macropharyngodon: data_Macropharyngodon.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Wetmorella: data_Wetmorella.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Xyrichtys: data_Xyrichtys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_num, data_Pseudojuloides, data_Terelabrus, data_Pseudolabrus, data_Pteragogus, data_Halichoeres, data_Choerodon, data_Suezichthys, data_Novaculichthys, data_Oxycheilinus, data_Novaculoides, data_Cirrhilabrus, data_Stethojulis, data_Coris, data_Bodianus, data_Cheilinus, data_Cheilio, data_Thalassoma, data_Labroides, data_Hemigymnus, data_Parajulis, data_Cymolutes, data_Anampses, data_Pseudocoris, data_Labrichthys, data_Novaculops, data_Iniistius, data_Hologymnosus, data_Semicossyphus, data_Epibulus, data_Labropsis, data_Gomphosus, data_Paracheilinus, data_Pseudocheilinus, data_Macropharyngodon, data_Wetmorella, data_Xyrichtys}) {

	return (
		<Layout title="ベラの仲間 | 僕らむの魚図鑑" description="ベラの仲間の一覧です" url="https://my-divingram-website.vercel.app/fish/wrasse" imageUrl="https://my-divingram-website.vercel.app/img/class/wrasse.jpeg">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">ベラの仲間</h1>
				<p className="pt-2 text-xs md:text-sm text-center text-gray-700 font-medium">掲載種 (未記載種を含む) : {data_num}種</p>

				<Family family="ベラ科"></Family>
				<Genus genus="カマスベラ属 (Cheilio)" data={data_Cheilio}></Genus>
				<Genus genus="キュウセン属 (Parajulis)" data={data_Parajulis}></Genus>
				<Genus genus="ギチベラ属 (Epibulus)" data={data_Epibulus}></Genus>
				<Genus genus="ホホスジモチノウオ属 (Oxycheilinus)" data={data_Oxycheilinus}></Genus>
				<Genus genus="ハシナガベラ属 (Wetmorella)" data={data_Wetmorella}></Genus>
				<Genus genus="モチノウオ属 (Cheilinus)" data={data_Cheilinus}></Genus>
				<Genus genus="イトヒキベラ属 (Cirrhilabrus)" data={data_Cirrhilabrus}></Genus>
				<Genus genus="クジャクベラ属 (Paracheilinus)" data={data_Paracheilinus}></Genus>
				<Genus genus="ニセモチノウオ属 (Pseudocheilinus)" data={data_Pseudocheilinus}></Genus>
				<Genus genus="オハグロベラ属 (Pteragogus)" data={data_Pteragogus}></Genus>
				<Genus genus="タキベラ属 (Bodianus)" data={data_Bodianus}></Genus>
				<Genus genus="イラ属 (Choerodon)" data={data_Choerodon}></Genus>
				<Genus genus="コブダイ属 (Semicossyphus)" data={data_Semicossyphus}></Genus>
				<Genus genus="ミヤビベラ属 (Terelabrus)" data={data_Terelabrus}></Genus>
				<Genus genus="ススキベラ属 (Anampses)" data={data_Anampses}></Genus>
				<Genus genus="カンムリベラ属 (Coris)" data={data_Coris}></Genus>
				<Genus genus="クギベラ属 (Gomphosus)" data={data_Gomphosus}></Genus>
				<Genus genus="ホンベラ属 (Halichoeres)" data={data_Halichoeres}></Genus>
				<Genus genus="タレクチベラ属 (Hemigymnus)" data={data_Hemigymnus}></Genus>
				<Genus genus="シロタスキベラ属 (Hologymnosus)" data={data_Hologymnosus}></Genus>
				<Genus genus="クロベラ属 (Labrichthys)" data={data_Labrichthys}></Genus>
				<Genus genus="ソメワケベラ属 (Labroides)" data={data_Labroides}></Genus>
				<Genus genus="マナベベラ属 (Labropsis)" data={data_Labropsis}></Genus>
				<Genus genus="ノドグロベラ属 (Macropharyngodon)" data={data_Macropharyngodon}></Genus>
				<Genus genus="シラタキベラダマシ属 (Pseudocoris)" data={data_Pseudocoris}></Genus>
				<Genus genus="オグロベラ属 (Pseudojuloides)" data={data_Pseudojuloides}></Genus>
				<Genus genus="カミナリベラ属 (Stethojulis)" data={data_Stethojulis}></Genus>
				<Genus genus="ニシキベラ属 (Thalassoma)" data={data_Thalassoma}></Genus>
				<Genus genus="タテヤマベラ属 (Cymolutes)" data={data_Cymolutes}></Genus>
				<Genus genus="テンス属 (Iniistius)" data={data_Iniistius}></Genus>
				<Genus genus="オビテンスモドキ属 (Novaculichthys)" data={data_Novaculichthys}></Genus>
				<Genus genus="オオヒレテンスモドキ属 (Novaculoides)" data={data_Novaculoides}></Genus>
				<Genus genus="テンスモドキ属 (Novaculops)" data={data_Novaculops}></Genus>
				<Genus genus="ホンテンスモドキ属 (Xyrichtys)" data={data_Xyrichtys}></Genus>
				<Genus genus="ササノハベラ属 (Pseudolabrus)" data={data_Pseudolabrus}></Genus>
				<Genus genus="イトベラ属 (Suezichthys)" data={data_Suezichthys}></Genus>

			</div>
		</Layout>
  	);
}
