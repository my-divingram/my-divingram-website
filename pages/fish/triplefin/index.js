import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data = await client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]triplefin` , limit: 1 }});
	const data_Helcogramma = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]クロマスク属` , limit: 100 }});
	const data_Springerichthys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヒメギンポ属` , limit: 100 }});
	const data_Enneapterygius = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヘビギンポ属` , limit: 100 }});
	const data_Ucla = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]カスリヘビギンポ属` , limit: 100 }});
	const data_Norfolkia = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ニセヘビギンポ属` , limit: 100 }});

	return {
    	props: {
			data_num: data.totalCount,
    		data_Helcogramma: data_Helcogramma.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Springerichthys: data_Springerichthys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Enneapterygius: data_Enneapterygius.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Ucla: data_Ucla.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Norfolkia: data_Norfolkia.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_num, data_Helcogramma, data_Springerichthys, data_Enneapterygius, data_Ucla, data_Norfolkia}) {

	return (
		<Layout title="ヘビギンポの仲間 | 僕らむの魚図鑑" description="ヘビギンポの仲間の一覧です" url="https://www.my-divingram.com/fish/triplefin" imageUrl="https://www.my-divingram.com/img/class/triplefin.jpeg">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">ヘビギンポの仲間</h1>
				<p className="pt-2 text-xs md:text-sm text-center text-gray-700 font-medium">掲載種 : {data_num}種</p>

				<Family family="ヘビギンポ科"></Family>
				<Genus genus="ヘビギンポ属 (Enneapterygius)" data={data_Enneapterygius}></Genus>
				<Genus genus="クロマスク属 (Helcogramma)" data={data_Helcogramma}></Genus>
				<Genus genus="ニセヘビギンポ属 (Norfolkia)" data={data_Norfolkia}></Genus>
				<Genus genus="ヒメギンポ属 (Springerichthys)" data={data_Springerichthys}></Genus>
				<Genus genus="カスリヘビギンポ属 (Ucla)" data={data_Ucla}></Genus>

			</div>
		</Layout>
  	);
}
