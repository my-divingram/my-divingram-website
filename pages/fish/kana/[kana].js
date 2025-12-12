import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { client } from "/libs/client";
import Layout from "/components/Layout";
import { useRouter } from "next/router";
import { useState, useMemo, useEffect } from "react";
import FishPageHeader from "/components/FishPageHeader";
import FishPageFooter from "/components/FishPageFooter";
import { fetchAllPages } from "/libs/fetch_all_pages"; // サーバー用
import { shuffleArray } from "/libs/utils"; // クライアント安全
import { getOptimizedMicroCMSImage } from "/libs/utils";

// SSG
export const getStaticProps = async (context) => {
    const kana = context.params.kana;

    const kana50 = {
        "ア": ["ア", "イ", "ウ", "エ", "オ", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
        "カ": ["カ", "キ", "ク", "ケ", "コ", "ガ", "ギ", "グ", "ゲ", "ゴ", "-", "-", "-", "-", "-"],
        "サ": ["サ", "シ", "ス", "セ", "ソ", "ザ", "ジ", "ズ", "ゼ", "ゾ", "-", "-", "-", "-", "-"],
        "タ": ["タ", "チ", "ツ", "テ", "ト", "ダ", "ヂ", "ヅ", "デ", "ド", "-", "-", "-", "-", "-"],
        "ナ": ["ナ", "ニ", "ヌ", "ネ", "ノ", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
        "ハ": ["ハ", "ヒ", "フ", "ヘ", "ホ", "バ", "ビ", "ブ", "ベ", "ボ", "パ", "ピ", "プ", "ペ", "ポ"],
        "マ": ["マ", "ミ", "ム", "メ", "モ", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
        "ヤ": ["ヤ", "-", "ユ", "-", "ヨ", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
        "ラ": ["ラ", "リ", "ル", "レ", "ロ", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
        "ワ": ["ワ", "-", "ヲ", "-", "ン", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
    };

    const charsInRow = kana50[kana].filter(char => char !== "-");
    const kanaFilters = charsInRow.map(char => `japaneseName[begins_with]${char}`).join("[or]");

    // 並列実行
    const [
        allKanaData,
        data_fish,
        data_fish_ja,
        data_fish_freshwater,
        data_fish_slider,
        allFishList
    ] = await Promise.all([
        fetchAllPages("uwphoto", {
            filters: kanaFilters,
            fields: 'id,japaneseName,class,latinName,isOversea,thumbImg,habitat'
        }),
        client.get({ endpoint: "uwphoto", queries: { filters: `book[contains]魚`, orders: `-updatedAt`, limit: 1}}),
        client.get({ endpoint: "uwphoto", queries: { filters: `book[contains]魚[and]isOversea[equals]false`, orders: `-updatedAt`, limit: 1}}),
        client.get({ endpoint: "uwphoto", queries: { filters: `class[equals]freshwaterfish` , limit: 1 }}),
        client.get({ endpoint: "uwphoto", queries: { filters: `book[contains]魚[and]isSpotlight[equals]true`, orders: `-updatedAt`, limit: 40}}),
        fetchAllPages("uwphoto", {
            filters: `book[contains]魚`,
            fields: 'id,japaneseName,class,latinName,isOversea,habitat'
        })
    ]);

    const sortedKanaData = allKanaData.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName, "ja"));

    return {
        props: {
            kana: kana,
            kanaData: sortedKanaData,
            data_fish: data_fish.contents,
            data_fish_slider: shuffleArray(data_fish_slider.contents), // 共通関数
            data_num: data_fish.totalCount,
            data_num_ja: data_fish_ja.totalCount,
            allFishList: allFishList,
        },
    };
};

export const getStaticPaths = async() => {
    const kanaList = ["ア", "カ", "サ", "タ", "ナ", "ハ", "マ", "ヤ", "ラ", "ワ"];
    const paths = kanaList.map((data) => ({params: { kana: data },}));
    return {
        paths,
        fallback: false,
    };
};

export default function KanaList({
    kana,
    kanaData,
    data_fish,
    data_fish_slider,
    data_num,
    data_num_ja,
    allFishList
}){
    const description = '伊豆を中心に国内外を問わず未だ見ぬ魚を探して潜っているトラベルダイバーの"僕のだいびんぐらむ"です。個人で撮影した生態写真で魚図鑑を制作しています。'
    const url = `https://www.my-divingram.com/fish/${kana}`
    const router = useRouter();
    const [isInitialized, setIsInitialized] = useState(false);
    const [regionFilter, setRegionFilter] = useState(null);
    const [selectedHabitats, setSelectedHabitats] = useState([]);

    // 初期ロード時: URL -> State
    useEffect(() => {
        if (!router.isReady) return;
        const { region, habitats } = router.query;

        if (region) setRegionFilter(region);
        if (habitats) setSelectedHabitats(habitats.split(','));
        setIsInitialized(true);
    }, [router.isReady]);

    // State変更時: State -> URL更新
    useEffect(() => {
        if (!isInitialized || !router.isReady) return;

        const query = { ...router.query };
        let changed = false;

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

        if (changed) {
            router.replace({
                pathname: router.pathname,
                query: query
            }, undefined, { shallow: true });
        }
    }, [regionFilter, selectedHabitats, router.isReady, isInitialized]);

    const clearAllFilters = () => {
        setRegionFilter(null);
        setSelectedHabitats([]);
    };

    const toggleRegion = (type) => {
        setRegionFilter(prev => prev === type ? null : type);
    };

    const toggleHabitat = (habitat) => {
        setSelectedHabitats(prev =>
            prev.includes(habitat)
                ? prev.filter(h => h !== habitat)
                : [...prev, habitat]
        );
    };

    const isFilterActive = (regionFilter !== null && regionFilter !== "all") || selectedHabitats.length > 0;

    const filteredData = useMemo(() => {
        const isRegionAll = regionFilter === null;
        const isHabitatAll = selectedHabitats.length === 0;

        if (isRegionAll && isHabitatAll) return kanaData;

        return kanaData.filter(fish => {
            // 地域フィルタ
            if (!isRegionAll) {
                const isDomestic = !fish.isOversea;
                if (regionFilter === 'domestic' && !isDomestic) return false;
                if (regionFilter === 'oversea' && isDomestic) return false;
            }

            // 生息域フィルタ
            if (!isHabitatAll) {
                const fishHabitats = fish.habitat || [];
                const hasAllSelected = selectedHabitats.every(h => fishHabitats.includes(h));
                if (!hasAllSelected) return false;
            }
            return true;
        });
    }, [kanaData, regionFilter, selectedHabitats]);

    return (
        <Layout title="僕らむの魚図鑑" description={description} url={url} imageUrl="https://www.my-divingram.com/img/logo/favicon_small.jpg">
            <div className="px-3 md:px-20 font-sans">
                <Head>
                    <meta name="robots" content="noindex" />
                </Head>

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
                />

                <h1 className="pb-10 text-center text-xl md:text-2xl text-sky-800 font-black">
                    {kana}行
                </h1>

               <div className="flex flex-wrap justify-center">
					{filteredData.map((data) => (
                        <div key={data.id} className="px-3 w-1/3 md:w-1/6 hover:opacity-80">
                            <Link href={`/fish/${data.class}/${data.latinName}`.replaceAll(" ", "_")} className="relative block">
                                {data.isOversea && (
                                    <div className="absolute top-0 right-0 w-[30%] max-w-[60px] bg-gray-800/50 z-10 shadow-sm pointer-events-none">
                                        <div className="w-full h-auto px-[10%] py-[10%]">
                                            <svg viewBox="0 0 30 10" className="w-full h-auto block fill-white">
                                                <text x="50%" y="50%" dy=".35em" textAnchor="middle" fontSize="9" fontWeight="bold" style={{dominantBaseline: "auto"}}>
                                                    海外種
                                                </text>
                                            </svg>
                                        </div>
                                    </div>
                                )}
                                <Image src={getOptimizedMicroCMSImage(data.thumbImg.url, 300)} alt={data.japaneseName} width={300} height={200} style={{objectFit:"contain"}} unoptimized={true} priority={true} className="w-full h-auto"/>
                                <h2 className="py-3 mb-2 text-xs md:text-base text-center text-gray-700 font-medium">{data.japaneseName}</h2>
                            </Link>
                        </div>
                    ))}

                    {filteredData.length === 0 && (
                        <div className="py-10 w-full text-center text-gray-500 text-sm">
                            条件に一致する種は見つかりませんでした。
                        </div>
                    )}
				</div>

                <FishPageFooter />
            </div>
        </Layout>
    )
}