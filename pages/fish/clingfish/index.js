import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data = await client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]clingfish` , limit: 1 }});
	const data_Propherallodus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヒメウバウオ属` , limit: 100 }});
	const data_Lepadichthys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ミサキウバウオ属` , limit: 100 }});
	const data_Conidens = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]アンコウウバウオ属` , limit: 100 }});
	const data_Diademichthys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ハシナガウバウオ属` , limit: 100 }});
	const data_Discotrema = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ウミシダウバウオ属` , limit: 100 }});
	const data_Pherallodichthys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]メシマウバウオ属` , limit: 100 }});

	return {
    	props: {
			data_num: data.totalCount,
    		data_Propherallodus: data_Propherallodus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Lepadichthys: data_Lepadichthys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Conidens: data_Conidens.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Diademichthys: data_Diademichthys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Discotrema: data_Discotrema.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Pherallodichthys: data_Pherallodichthys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_num, data_Propherallodus, data_Lepadichthys, data_Conidens, data_Diademichthys, data_Discotrema, data_Pherallodichthys}) {

	return (
		<Layout title="ウバウオの仲間">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">ウバウオの仲間</h1>
				<p className="pt-2 text-xs md:text-sm text-center text-gray-700 font-medium">掲載種 (未記載種を含む) : {data_num}種</p>

				<Family family="ウバウオ科"></Family>
				<Genus genus="アンコウウバウオ属 (Conidens)" data={data_Conidens}></Genus>
				<Genus genus="ハシナガウバウオ属 (Diademichthys)" data={data_Diademichthys}></Genus>
				<Genus genus="ウミシダウバウオ属 (Discotrema)" data={data_Discotrema}></Genus>
				<Genus genus="ミサキウバウオ属 (Lepadichthys)" data={data_Lepadichthys}></Genus>
				<Genus genus="メシマウバウオ属 (Pherallodichthys)" data={data_Pherallodichthys}></Genus>
				<Genus genus="ヒメウバウオ属 (Propherallodus)" data={data_Propherallodus}></Genus>

			</div>
		</Layout>
  	);
}
