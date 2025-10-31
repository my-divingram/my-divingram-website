import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data = await client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]goatfish` , limit: 1 }});
	const data_Upeneus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヒメジ属` , limit: 100 }});
	const data_Mulloidichthys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]アカヒメジ属` , limit: 100 }});
	const data_Parupeneus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ウミヒゴイ属` , limit: 100 }});

	return {
    	props: {
			data_num: data.totalCount,
    		data_Upeneus: data_Upeneus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Mulloidichthys: data_Mulloidichthys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Parupeneus: data_Parupeneus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_num, data_Upeneus, data_Mulloidichthys, data_Parupeneus}) {

	return (
		<Layout title="ヒメジの仲間 | 僕らむの魚図鑑" description="ヒメジの仲間の一覧です" url="https://www.my-divingram.com/fish/goatfish" imageUrl="https://www.my-divingram.com/img/class/goatfish.jpeg">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">ヒメジの仲間</h1>
				<p className="pt-2 text-xs md:text-sm text-center text-gray-700 font-medium">掲載種 : {data_num}種</p>

				<Family family="ヒメジ科"></Family>
				<Genus genus="アカヒメジ属 (Mulloidichthys)" data={data_Mulloidichthys}></Genus>
				<Genus genus="ウミヒゴイ属 (Parupeneus)" data={data_Parupeneus}></Genus>
				<Genus genus="ヒメジ属 (Upeneus)" data={data_Upeneus}></Genus>

			</div>
		</Layout>
  	);
}
