import { client } from "/libs/client";
import Layout from "/components/Layout";
import {Family, Genus} from "/components/Class";

// SSG
export const getStaticProps = async() => {
	const data = await client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]blenny` , limit: 1 }});
	const data_Petroscirtes = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ハタタテギンポ属` , limit: 100 }});
	const data_Salarias = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヤエヤマギンポ属` , limit: 100 }});
	const data_Mimoblennius = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]マツバギンポ属` , limit: 100 }});
	const data_Helcogramma = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]クロマスク属` , limit: 100 }});
	const data_Plagiotremus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]テンクロスジギンポ属` , limit: 100 }});
	const data_Meiacanthus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヒゲニジギンポ属` , limit: 100 }});
	const data_Springerichthys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヒメギンポ属` , limit: 100 }});
	const data_Exallias = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]セダカギンポ属` , limit: 100 }});
	const data_Crossosalarias = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]エリグロギンポ属` , limit: 100 }});
	const data_Blenniella = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ハナカエルウオ属` , limit: 100 }});
	const data_Cirripectes = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]タテガミカエルウオ属` , limit: 100 }});
	const data_Ecsenius = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ニラミギンポ属` , limit: 100 }});
	const data_Aspidontus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]クロスジギンポ属` , limit: 100 }});
	const data_Limnichthys = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]トビギンポ属` , limit: 100 }});
	const data_Neoclinus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]コケギンポ属` , limit: 100 }});
	const data_Trichonotus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ベラギンポ属` , limit: 100 }});
	const data_Istiblennius = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]カエルウオ属` , limit: 100 }});
	const data_Enneapterygius = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヘビギンポ属` , limit: 100 }});
	const data_Ucla = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]カスリヘビギンポ属` , limit: 100 }});
	const data_Norfolkia = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ニセヘビギンポ属` , limit: 100 }});
	const data_Omobranchus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ナベカ属` , limit: 100 }});
	const data_Entomacrodus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]スジギンポ属` , limit: 100 }});
	const data_Cirrisalarias = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]シシマイギンポ属` , limit: 100 }});
	const data_Alticus = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]タマカエルウオ属` , limit: 100 }});
	const data_Rhabdoblennius = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ロウソクギンポ属` , limit: 100 }});
	const data_Andamia = await client.get({ endpoint: "uwphoto", queries: { filters: `genus[equals]ヨダレカケ属` , limit: 100 }});

	return {
    	props: {
			data_num: data.totalCount,
    		data_Blenniella: data_Blenniella.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Petroscirtes: data_Petroscirtes.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Salarias: data_Salarias.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Mimoblennius: data_Mimoblennius.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Helcogramma: data_Helcogramma.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Plagiotremus: data_Plagiotremus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Meiacanthus: data_Meiacanthus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Springerichthys: data_Springerichthys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Exallias: data_Exallias.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Crossosalarias: data_Crossosalarias.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Cirripectes: data_Cirripectes.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Ecsenius: data_Ecsenius.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Aspidontus: data_Aspidontus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Limnichthys: data_Limnichthys.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Neoclinus: data_Neoclinus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Trichonotus: data_Trichonotus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
			data_Istiblennius: data_Istiblennius.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Enneapterygius: data_Enneapterygius.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Ucla: data_Ucla.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Norfolkia: data_Norfolkia.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Omobranchus: data_Omobranchus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Entomacrodus: data_Entomacrodus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Cirrisalarias: data_Cirrisalarias.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Alticus: data_Alticus.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Rhabdoblennius: data_Rhabdoblennius.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    		data_Andamia: data_Andamia.contents.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName), "ja"),
    	},
	};
};

export default function Home({data_num, data_Blenniella, data_Petroscirtes, data_Salarias, data_Mimoblennius, data_Helcogramma, data_Plagiotremus, data_Meiacanthus, data_Springerichthys, data_Exallias, data_Crossosalarias, data_Cirripectes, data_Ecsenius, data_Aspidontus, data_Limnichthys, data_Neoclinus, data_Trichonotus, data_Istiblennius, data_Enneapterygius, data_Ucla, data_Norfolkia, data_Omobranchus, data_Entomacrodus, data_Cirrisalarias, data_Alticus, data_Rhabdoblennius, data_Andamia}) {

	return (
		<Layout title="ギンポの仲間">
			<div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">ギンポの仲間</h1>
				<p className="pt-2 text-xs md:text-sm text-center text-gray-700 font-medium">掲載種 : {data_num}種</p>

				<Family family="ベラギンポ科"></Family>
				<Genus genus="ベラギンポ属 (Trichonotus)" data={data_Trichonotus}></Genus>

				<Family family="トビギンポ科"></Family>
				<Genus genus="トビギンポ属 (Limnichthys)" data={data_Limnichthys}></Genus>

				<Family family="ヘビギンポ科"></Family>
				<Genus genus="ヘビギンポ属 (Enneapterygius)" data={data_Enneapterygius}></Genus>
				<Genus genus="クロマスク属 (Helcogramma)" data={data_Helcogramma}></Genus>
				<Genus genus="ニセヘビギンポ属 (Norfolkia)" data={data_Norfolkia}></Genus>
				<Genus genus="ヒメギンポ属 (Springerichthys)" data={data_Springerichthys}></Genus>
				<Genus genus="カスリヘビギンポ属 (Ucla)" data={data_Ucla}></Genus>

				<Family family="コケギンポ科"></Family>
				<Genus genus="コケギンポ属 (Neoclinus)" data={data_Neoclinus}></Genus>

				<Family family="イソギンポ科"></Family>
				<Genus genus="タマカエルウオ属 (Alticus)" data={data_Alticus}></Genus>
				<Genus genus="ヨダレカケ属 (Andamia)" data={data_Andamia}></Genus>
				<Genus genus="クロスジギンポ属 (Aspidontus)" data={data_Aspidontus}></Genus>
				<Genus genus="ハナカエルウオ属 (Blenniella)" data={data_Blenniella}></Genus>
				<Genus genus="タテガミカエルウオ属 (Cirripectes)" data={data_Cirripectes}></Genus>
				<Genus genus="シシマイギンポ属 (Cirrisalarias)" data={data_Cirrisalarias}></Genus>
				<Genus genus="エリグロギンポ属 (Crossosalarias)" data={data_Crossosalarias}></Genus>
				<Genus genus="ニラミギンポ属 (Ecsenius)" data={data_Ecsenius}></Genus>
				<Genus genus="スジギンポ属 (Entomacrodus)" data={data_Entomacrodus}></Genus>
				<Genus genus="セダカギンポ属 (Exallias)" data={data_Exallias}></Genus>
				<Genus genus="カエルウオ属 (Istiblennius)" data={data_Istiblennius}></Genus>
				<Genus genus="ヒゲニジギンポ属 (Meiacanthus)" data={data_Meiacanthus}></Genus>
				<Genus genus="マツバギンポ属 (Mimoblennius)" data={data_Mimoblennius}></Genus>
				<Genus genus="ナベカ属 (Omobranchus)" data={data_Omobranchus}></Genus>
				<Genus genus="ハタタテギンポ属 (Petroscirtes)" data={data_Petroscirtes}></Genus>
				<Genus genus="テンクロスジギンポ属 (Plagiotremus)" data={data_Plagiotremus}></Genus>
				<Genus genus="ヤエヤマギンポ属 (Salarias)" data={data_Salarias}></Genus>
				<Genus genus="ロウソクギンポ属 (Rhabdoblennius)" data={data_Rhabdoblennius}></Genus>

			</div>
		</Layout>
  	);
}
