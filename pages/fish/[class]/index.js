import Head from "next/head";
import Layout from "/components/Layout";
import { Family, Genus } from "/components/Class";
import { fetchAllPages } from "/libs/fetch_all_pages";
import { categoryList } from "/constants/categories";
import { categoryStructure } from "/constants/category-structure";
import { useRouter } from "next/router";
import { useState, useMemo, useEffect } from "react";

const getHabitatColor = (habitatName) => {
    switch (habitatName) {
        case "海水":
            return "bg-blue-200 text-blue-700 border-blue-700";
        case "汽水":
            return "bg-sky-100 text-sky-700 border-sky-700";
        case "淡水":
            return "bg-cyan-100 text-cyan-700 border-cyan-700";
        default:
            return "bg-gray-100 text-gray-700 border-gray-700";
    }
};

// SSG
export const getStaticProps = async(context) => {
    const classParam = context.params.class;
    const allFishInCategory = await fetchAllPages("uwphoto", {
        filters: `class[equals]${classParam}`,
    });

    const fishByGenus = allFishInCategory.reduce((acc, fish) => {
        const genusKey = fish.genus;
        if (!acc[genusKey]) {
            acc[genusKey] = [];
        }
        acc[genusKey].push(fish);
        return acc;
    }, {});

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

    const router = useRouter();

    const [regionFilter, setRegionFilter] = useState(null);
    const [selectedHabitats, setSelectedHabitats] = useState([]);
    const allHabitats = ["海水", "汽水", "淡水"];

    useEffect(() => {
        if (!router.isReady) return;
        const { region, habitats } = router.query;
        if (region === 'domestic' || region === 'oversea') {
            setRegionFilter(region);
        }
        if (habitats) {
            const habitatArray = habitats.split(',');
            const validHabitats = habitatArray.filter(h => allHabitats.includes(h));
            if (validHabitats.length > 0) {
                setSelectedHabitats(validHabitats);
            }
        }
    }, [router.isReady, router.query]);

    const clearAllFilters = () => {
        setRegionFilter(null);
        setSelectedHabitats([]);
    };

    const toggleRegion = (type) => {
        if (regionFilter === type) {
            setRegionFilter(null);
        } else {
            setRegionFilter(type);
        }
    };

    const toggleHabitat = (habitat) => {
        if (selectedHabitats.includes(habitat)) {
            setSelectedHabitats(selectedHabitats.filter(h => h !== habitat));
        } else {
            setSelectedHabitats([...selectedHabitats, habitat]);
        }
    };

    const filteredPageData = useMemo(() => {
        const isRegionAll = regionFilter === null;
        const isHabitatAll = selectedHabitats.length === 0;

        if (isRegionAll && isHabitatAll) {
            return pageData;
        }

        return pageData.map(family => {
            const filteredGenera = family.genusName.map(genus => {
                const filteredItems = genus.items.filter(fish => {
                    if (!isRegionAll) {
                        const isDomestic = !fish.isOversea;
                        if (regionFilter === 'domestic' && !isDomestic) return false;
                        if (regionFilter === 'oversea' && isDomestic) return false;
                    }

                    if (!isHabitatAll) {
                        const fishHabitats = fish.habitat || [];
                        const hasAllSelected = selectedHabitats.every(h => fishHabitats.includes(h));
                        if (!hasAllSelected) return false;
                    }

                    return true;
                });

                return {
                    ...genus,
                    items: filteredItems
                };
            }).filter(genus => genus.items.length > 0);

            return {
                ...family,
                genusName: filteredGenera
            };
        }).filter(family => family.genusName.length > 0);
    }, [pageData, regionFilter, selectedHabitats]);

    const currentDataCount = useMemo(() => {
        return filteredPageData.reduce((total, family) => {
            return total + family.genusName.reduce((subTotal, genus) => subTotal + genus.items.length, 0);
        }, 0);
    }, [filteredPageData]);

    const isFilterActive = regionFilter !== null || selectedHabitats.length > 0;

    // 構造化データ
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
                "name": categoryInfo.name,
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
                    掲載種 : {currentDataCount}種
                    {currentDataCount !== data_num && <span className="text-gray-700 text-xs md:text-sm ml-1"> (全{data_num}種)</span>}
                </p>

                <div className="pt-4 pb-2 flex flex-col items-center gap-3 select-none">

                    <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-2">

                        <div className="flex gap-1">
                            <button
                                onClick={() => toggleRegion('domestic')}
                                className={`px-3 py-1 text-[10px] md:text-xs font-bold border rounded-full shadow-sm transition-all duration-200
                                    ${regionFilter === 'domestic'
                                        ? "text-sky-800 bg-white border-sky-800"
                                        : "text-gray-400 bg-gray-100 border-gray-300 opacity-60 hover:opacity-100"
                                    }`}
                            >
                                国内種
                            </button>
                            <button
                                onClick={() => toggleRegion('oversea')}
                                className={`px-3 py-1 text-[10px] md:text-xs font-bold border rounded-full shadow-sm transition-all duration-200
                                    ${regionFilter === 'oversea'
                                        ? "text-sky-800 bg-white border-sky-800"
                                        : "text-gray-400 bg-gray-100 border-gray-300 opacity-60 hover:opacity-100"
                                    }`}
                            >
                                海外種
                            </button>
                        </div>

                        <div className="flex gap-1">
                            {allHabitats.map((h) => {
                                const isActive = selectedHabitats.includes(h);
                                return (
                                    <button
                                        key={h}
                                        onClick={() => toggleHabitat(h)}
                                        className={`px-3 py-1 text-[10px] md:text-xs font-bold border rounded-full shadow-sm transition-all duration-200
                                            ${isActive
                                                ? getHabitatColor(h)
                                                : "bg-gray-100 text-gray-400 border-gray-300 opacity-60 hover:opacity-100"
                                            }`}
                                    >
                                        {h}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {isFilterActive && (
                        <button
                            onClick={clearAllFilters}
                            className="flex items-center gap-1 px-3 py-1 text-[11px] text-gray-500 bg-gray-50 hover:bg-gray-200 rounded-full transition-colors shadow-sm"
                            title="条件をクリア"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                            </svg>
                            <span>条件をクリア</span>
                        </button>
                    )}

                </div>

                {filteredPageData.map(family => (
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

                {filteredPageData.length === 0 && (
                    <div className="py-20 text-center text-gray-500 text-sm">
                        条件に一致する種は見つかりませんでした。
                    </div>
                )}
			</div>
		</Layout>
  	);
}