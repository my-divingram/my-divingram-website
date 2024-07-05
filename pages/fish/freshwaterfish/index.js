import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data = await client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]freshwaterfish` , limit: 1 }});
	const data_Candidia = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]カワムツ属` , limit: 100 }});
	const data_Opsariichthys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ハス属` , limit: 100 }});
	const data_Rhinogobius = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヨシノボリ属` , limit: 100 }});
	const data_Tridentiger = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]チチブ属` , limit: 100 }});

	return {
    	props: {
			data_num: data.totalCount,
    		data_Candidia: data_Candidia.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Opsariichthys: data_Opsariichthys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Rhinogobius: data_Rhinogobius.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Tridentiger: data_Tridentiger.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_num, data_Candidia, data_Opsariichthys, data_Rhinogobius, data_Tridentiger}) {

	return (
		<Layout title="淡水魚 | 僕らむの魚図鑑" description="淡水魚の一覧です" url="https://my-divingram-website.vercel.app/fish/freshwaterfish" imageUrl="https://my-divingram-website.vercel.app/img/class/freshwaterfish.jpeg">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">淡水魚</h1>
				<p className="pt-2 text-xs md:text-sm text-center text-gray-700 font-medium">掲載種 : {data_num}種</p>

				<Family family="コイ科"></Family>
				{/* 589 */}
				<Genus genus="カワムツ属 (Candidia)" data={data_Candidia}></Genus>
				{/* 590 */}
				<Genus genus="ハス属 (Opsariichthys)" data={data_Opsariichthys}></Genus>

				<Family family="ハゼ科"></Family>
				{/* 4167 */}
				<Genus genus="ヨシノボリ属 (Rhinogobius)" data={data_Rhinogobius}></Genus>
				{/* 4230 */}
				<Genus genus="チチブ属 (Tridentiger)" data={data_Tridentiger}></Genus>

			</div>
		</Layout>
  	);
}