import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useMemo, useEffect } from "react";
import { client } from "/libs/client";
import Layout from "/components/Layout";
import FishPageHeader from "/components/FishPageHeader";
import FishPageFooter from "/components/FishPageFooter";
import { fetchAllPages } from "/libs/fetch_all_pages";
import { shuffleArray } from "/libs/utils";
import { categoryList } from "/constants/categories";

export const getStaticProps = async() => {
    const [
        data_fish,
        data_fish_ja,
        data_fish_slider,
        allFishList
    ] = await Promise.all([
        client.get({ endpoint: "uwphoto", queries: { filters: `book[contains]魚`, orders: `-updatedAt`, limit: 1}}),
        client.get({ endpoint: "uwphoto", queries: { filters: `book[contains]魚[and]isOversea[equals]false`, orders: `-updatedAt`, limit: 1}}),
        client.get({ endpoint: "uwphoto", queries: { filters: `book[contains]魚[and]isSpotlight[equals]true`, orders: `-updatedAt`, limit: 40}}),
        fetchAllPages("uwphoto", {
            filters: `book[contains]魚`,
            fields: 'id,japaneseName,class,latinName,isOversea,habitat'
        })
    ]);

    return {
        props: {
            data_fish: data_fish.contents,
            data_fish_slider: shuffleArray(data_fish_slider.contents),
            data_num: data_fish.totalCount,
            data_num_ja: data_fish_ja.totalCount,
            allFishList: allFishList,
        },
    };
};

function Home({data_fish, data_fish_slider, data_num, data_num_ja, allFishList}) {
    const description = '伊豆を中心に国内外を問わず未だ見ぬ魚を探して潜っているトラベルダイバーの"僕のだいびんぐらむ"です。個人で撮影した生態写真で魚図鑑を制作しています。'

    const router = useRouter();
    const [isInitialized, setIsInitialized] = useState(false);
    const [regionFilter, setRegionFilter] = useState(null);
    const [selectedHabitats, setSelectedHabitats] = useState([]);

    // マウント時にURLからStateを復元
    useEffect(() => {
        if (!router.isReady) return;
        const { region, habitats } = router.query;

        if (region) {
            setRegionFilter(region);
        }
        if (habitats) {
            setSelectedHabitats(habitats.split(','));
        }
        setIsInitialized(true);
    }, [router.isReady]);

    // State変更時にURLを更新 (shallowルーティング)
    useEffect(() => {
        if (!isInitialized || !router.isReady) return;

        const query = { ...router.query };
        let changed = false;

        // regionの設定
        if (regionFilter && regionFilter !== "all") {
            if (query.region !== regionFilter) {
                query.region = regionFilter;
                changed = true;
            }
        } else {
            if (query.region) {
                delete query.region;
                changed = true;
            }
        }

        // habitatsの設定
        if (selectedHabitats.length > 0) {
            const hStr = selectedHabitats.join(',');
            if (query.habitats !== hStr) {
                query.habitats = hStr;
                changed = true;
            }
        } else {
            if (query.habitats) {
                delete query.habitats;
                changed = true;
            }
        }

        // URLが変更になる場合のみ更新を実行
        if (changed) {
            router.replace({
                pathname: router.pathname,
                query: query
            }, undefined, { shallow: true });
        }
    }, [regionFilter, selectedHabitats, isInitialized, router.isReady]);

    const clearAllFilters = () => {
        setRegionFilter(null);
        setSelectedHabitats([]);
    };

    const toggleRegion = (region) => {
        setRegionFilter(prev => prev === region ? null : region);
    };

    const toggleHabitat = (habitat) => {
        setSelectedHabitats(prev =>
            prev.includes(habitat)
                ? prev.filter(h => h !== habitat)
                : [...prev, habitat]
        );
    };

    const isFilterActive = (regionFilter !== null && regionFilter !== "all") || selectedHabitats.length > 0;

    const filteredFish = useMemo(() => {
        return allFishList.filter(fish => {
            if (regionFilter === "domestic" && fish.isOversea) return false;
            if (regionFilter === "oversea" && !fish.isOversea) return false;

            if (selectedHabitats.length > 0) {
                if (!fish.habitat || !Array.isArray(fish.habitat)) return false;
                const hasAll = selectedHabitats.every(h => fish.habitat.includes(h));
                if (!hasAll) return false;
            }
            return true;
        });
    }, [allFishList, regionFilter, selectedHabitats]);

    const activeCategories = useMemo(() => {
        const classSet = new Set();
        filteredFish.forEach(fish => {
            if (!fish.class) return;
            if (Array.isArray(fish.class)) {
                fish.class.forEach(c => classSet.add(c));
            } else {
                classSet.add(fish.class);
            }
        });
        return classSet;
    }, [filteredFish]);


    // 構造化データ
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "TOP", "item": "https://www.my-divingram.com" },
            { "@type": "ListItem", "position": 2, "name": "僕らむの魚図鑑", "item": "https://www.my-divingram.com/fish" }
        ]
    };

    return (
        <Layout title="僕らむの魚図鑑" description={description} url="https://www.my-divingram.com/fish" imageUrl="https://www.my-divingram.com/img/logo/favicon_small.jpg">
            <Head>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
            </Head>

            <div className="px-3 md:px-20 font-sans">

                <FishPageHeader
                    data_fish_slider={data_fish_slider}
                    data_num={data_num}
                    data_num_ja={data_num_ja}
                    data_fish={data_fish}
                    allFishList={allFishList}
                    showSearch={true}
                    showIndex={true}
                    regionFilter={regionFilter}
                    toggleRegion={toggleRegion}
                    selectedHabitats={selectedHabitats}
                    toggleHabitat={toggleHabitat}
                    clearAllFilters={clearAllFilters}
                    isFilterActive={isFilterActive}
                    filteredCount={filteredFish.length}
                />

                <div className="grid px-3 gap-3 grid-cols-3 md:grid-cols-6">
                    {categoryList.map((cat) => {
                        const catId = cat.href.split("/").pop();
                        const isActive = activeCategories.has(catId);
                        return (
                            <div key={cat.name} className={`flex justify-center transition-all duration-300 ${isActive ? "hover:opacity-80" : "grayscale opacity-50"}`}>
                                <Link
                                    href={{
                                        pathname: cat.href,
                                        query: {
                                            ...(regionFilter && regionFilter !== 'all' ? { region: regionFilter } : {}),
                                            ...(selectedHabitats.length > 0 ? { habitats: selectedHabitats.join(',') } : {})
                                        }
                                    }}
                                    className={!isActive ? "cursor-default pointer-events-none" : ""}
                                >
                                    <Image
                                        src={cat.img}
                                        alt={cat.alt}
                                        width={300}
                                        height={200}
                                        style={{objectFit:"contain"}}
                                    />
                                    <h2 className={`py-3 text-xs md:text-base text-center font-medium ${isActive ? "text-gray-700" : "text-gray-400"}`}>
                                        {cat.name}
                                    </h2>
                                </Link>
                            </div>
                        );
                    })}
                </div>

                <FishPageFooter />
            </div>
        </Layout>
    )
}

export default Home