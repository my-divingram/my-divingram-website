import Head from "next/head";
import Layout from "/components/Layout";
import { Family, Genus } from "/components/Class";
import { fetchAllPages } from "/libs/fetch_all_pages";
import { categoryList } from "/constants/categories";
import { categoryStructure } from "/constants/category-structure";

//SSG
export const getStaticProps = async(context) => {
    const classParam = context.params.class;
    const allFishInCategory = await fetchAllPages("uwphoto", {
        filters: `class[equals]${classParam}`,
        // fields: 'japaneseName,genus,thumbImg,latinName,class' // 必要最小限に絞ると更に高速化
    });

    // 取得した全魚種を「属 (genus) の key」でグループ分け（高速化のため）
    const fishByGenus = allFishInCategory.reduce((acc, fish) => {
        const genusKey = fish.genus;
        if (!acc[genusKey]) {
            acc[genusKey] = [];
        }
        acc[genusKey].push(fish);
        return acc;
    }, {});

    // constants/category-structure.js から、このカテゴリの並び順定義を取得
    const structure = categoryStructure[classParam] || [];

    const pageData = structure.map(family => ({
        familyName: family.familyName,
        genusName: family.genusName.map(genusDef => {
            const items = fishByGenus[genusDef.key] || [];
            return {
                genusName: genusDef.displayName,
                items: items.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName, "ja"))
            };
        })
        .filter(genus => genus.items.length > 0)
    }));

    const categoryInfo = categoryList.find(
        cat => cat.href === `fish/${classParam}`
    ) || { name: classParam, img: "", alt: "" };

    return {
        props: {
            pageData: pageData,
            categoryInfo: categoryInfo,
            data_num: allFishInCategory.length,
            classParam: classParam,
        },
    };
};

export const getStaticPaths = async () => {
    const paths = categoryList.map(cat => ({
        params: { class: cat.href.split('/')[1] }
    }));

    return {
        paths,
        fallback: false,
    };
};

export default function CategoryPage({ pageData, categoryInfo, data_num, classParam }) {
    const title = `${categoryInfo.name} | 僕らむの魚図鑑`;
    const description = `${categoryInfo.name}の一覧です`;
    const url = `https://www.my-divingram.com/fish/${classParam}`;
    const imageUrl = categoryInfo.img
        ? `https://www.my-divingram.com${categoryInfo.img}`
        : "https://www.my-divingram.com/img/logo/favicon_small.jpg";

    // 構造化データ(JSON-LD)の作成
    const baseUrl = "https://www.my-divingram.com";

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "TOP",
                "item": baseUrl
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "僕らむの魚図鑑",
                "item": `${baseUrl}/fish`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": categoryInfo.name, // 例: "ハゼの仲間"
                "item": url
            }
        ]
    };

	return (
		<Layout title={title} description={description} url={url} imageUrl={imageUrl}>
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />
            </Head>

			<div className="px-5 md:px-20 font-sans">

				<h1 className="pt-10 text-xl md:text-2xl text-center text-sky-800 font-black">
                    {categoryInfo.name}
                </h1>
				<p className="pt-2 text-xs md:text-sm text-center text-gray-700 font-medium">
                    掲載種 : {data_num}種
                </p>

                {pageData.map(family => (
                    <div key={family.familyName}>
                        {family.genusName.length > 0 &&
                            <Family
                                family={family.familyName}
                            />
                        }
                        {family.genusName.map(genus => (
                            <Genus
                                key={genus.genusName}
                                genus={genus.genusName}
                                data={genus.items}
                            />
                        ))}
                    </div>
                ))}
			</div>
		</Layout>
  	);
}