import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
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

	return {
    	props: {
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
    	},
	};
};

export default function Home({data_Pseudojuloides, data_Terelabrus, data_Pseudolabrus, data_Pteragogus, data_Halichoeres, data_Choerodon, data_Suezichthys, data_Novaculichthys, data_Oxycheilinus, data_Novaculoides, data_Cirrhilabrus, data_Stethojulis, data_Coris, data_Bodianus, data_Cheilinus, data_Cheilio, data_Thalassoma}) {

	return (
		<Layout title="ベラの仲間">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">ベラの仲間</h1>

				<Family family="ベラ科"></Family>
				<Genus genus="カミナリベラ属 (Stethojulis)" data={data_Stethojulis}></Genus>
				<Genus genus="ササノハベラ属 (Pseudolabrus)" data={data_Pseudolabrus}></Genus>
				<Genus genus="タキベラ属 (Bodianus)" data={data_Bodianus}></Genus>
				<Genus genus="モチノウオ属 (Cheilinus)" data={data_Cheilinus}></Genus>
				<Genus genus="ホンベラ属 (Halichoeres)" data={data_Halichoeres}></Genus>
				<Genus genus="イトベラ属 (Suezichthys)" data={data_Suezichthys}></Genus>
				<Genus genus="イトヒキベラ属 (Cirrhilabrus)" data={data_Cirrhilabrus}></Genus>
				<Genus genus="イラ属 (Choerodon)" data={data_Choerodon}></Genus>
				<Genus genus="オオヒレテンスモドキ属" data={data_Novaculoides}></Genus>
				<Genus genus="オグロベラ属 (Pseudojuloides)" data={data_Pseudojuloides}></Genus>
				<Genus genus="ニシキベラ属 (Thalassoma)" data={data_Thalassoma}></Genus>
				<Genus genus="オハグロベラ属 (Pteragogus)" data={data_Pteragogus}></Genus>
				<Genus genus="オビテンスモドキ属 (Novaculichthys)" data={data_Novaculichthys}></Genus>
				<Genus genus="ホホスジモチノウオ属 (Oxycheilinus)" data={data_Oxycheilinus}></Genus>
				<Genus genus="カマスベラ属 (Cheilio)" data={data_Cheilio}></Genus>
				<Genus genus="カンムリベラ属 (Coris)" data={data_Coris}></Genus>
				<Genus genus="ミヤビベラ属 (Terelabrus)" data={data_Terelabrus}></Genus>

			</div>
		</Layout>
  	);
}
