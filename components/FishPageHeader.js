import Link from "next/link";
import Image from "next/image";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import FishSearch from "./FishSearch";
import { getOptimizedMicroCMSImage } from "/libs/utils";

const kanaList = ["ア", "カ", "サ", "タ", "ナ", "ハ", "マ", "ヤ", "ラ", "ワ"];
const allHabitats = ["海水", "汽水", "淡水"];

const getHabitatColor = (habitatName) => {
    switch (habitatName) {
        case "海水": return "bg-blue-200 text-blue-700 border-blue-700";
        case "汽水": return "bg-sky-100 text-sky-700 border-sky-700";
        case "淡水": return "bg-cyan-100 text-cyan-700 border-cyan-700";
        default: return "bg-gray-100 text-gray-700 border-gray-700";
    }
};

export default function FishPageHeader({
    data_fish_slider,
    data_num,
    data_num_ja,
    data_fish,
    allFishList,
    showSearch,
    showIndex,
    regionFilter,
    toggleRegion,
    selectedHabitats,
    toggleHabitat,
    clearAllFilters,
    isFilterActive,
    filteredCount
}) {
    const getQueryObj = () => {
        const query = {};
        if (regionFilter && regionFilter !== 'all') query.region = regionFilter;
        if (selectedHabitats && selectedHabitats.length > 0) query.habitats = selectedHabitats.join(',');
        return query;
    };

    return (
        <>
            <h1 className="pt-10 pb-5 text-xl md:text-2xl text-center text-sky-800 font-black">僕らむの魚図鑑</h1>

            <Splide options={{type:"loop", gap:"24px", drag:"free", perPage:10, breakpoints:{640:{perPage:3}}, autoScroll:{pauseOnHover:true, pauseOnFocus:false, rewind:false, speed:0.3}}} extensions={{AutoScroll}}>
                {data_fish_slider?.map((data) => (
                    <SplideSlide key={data.id}>
                        <div className="hover:opacity-80">
                            <Link href={`/fish/${data.class}/${data.latinName}`.replaceAll(" ", "_")}>
                                <Image src={getOptimizedMicroCMSImage(data.thumbImg.url, 300)} alt={data.japaneseName} width={300} height={200} style={{objectFit:"contain"}} unoptimized={true} priority={true}/>
                                <h2 className="py-3 mb-2 text-xs md:text-sm text-center text-gray-700 font-medium">{data.japaneseName}</h2>
                            </Link>
                        </div>
                    </SplideSlide>
                ))}
            </Splide>

            <p className="pt-2 text-sm md:text-lg text-center text-gray-700 font-medium">掲載種 : {data_num}種</p>
            <p className="pb-4 text-sm md:text-lg text-center text-gray-700 font-medium">うち日本産魚類 : {data_num_ja}種</p>

            {/* {data_fish && data_fish[0] && (
                 <p className="pt-1 pb-6 text-xs md:text-sm text-center text-gray-700 font-medium">
                    最近の更新一覧は<Link href={"/fish/recent_updates"} className="underline hover:opacity-50">こちら</Link> (最終更新 : {data_fish[0].updatedAt.substr(0,10)})
                 </p>
            )} */}

            {/* フィルタボタンエリア */}
            {toggleRegion && (
                <div className="pt-2 pb-6 flex flex-col items-center gap-3 select-none">
                    <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-2">
                        <div className="flex gap-1">
                            <button
                                onClick={() => toggleRegion('domestic')}
                                className={`px-3 py-1 text-[10px] md:text-xs font-bold border rounded-full shadow-sm transition-all duration-200
                                    ${regionFilter === 'domestic' ? "text-sky-800 bg-white border-sky-800" : "text-gray-400 bg-gray-100 border-gray-300 opacity-60 hover:opacity-100"}`}
                            >
                                国内種
                            </button>
                            <button
                                onClick={() => toggleRegion('oversea')}
                                className={`px-3 py-1 text-[10px] md:text-xs font-bold border rounded-full shadow-sm transition-all duration-200
                                    ${regionFilter === 'oversea' ? "text-sky-800 bg-white border-sky-800" : "text-gray-400 bg-gray-100 border-gray-300 opacity-60 hover:opacity-100"}`}
                            >
                                海外種
                            </button>
                        </div>

                        <div className="flex gap-1">
                            {allHabitats.map((h) => {
                                const isActive = selectedHabitats?.includes(h);
                                return (
                                    <button
                                        key={h}
                                        onClick={() => toggleHabitat(h)}
                                        className={`px-3 py-1 text-[10px] md:text-xs font-bold border rounded-full shadow-sm transition-all duration-200
                                            ${isActive ? getHabitatColor(h) : "bg-gray-100 text-gray-400 border-gray-300 opacity-60 hover:opacity-100"}`}
                                    >
                                        {h}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {isFilterActive && (
                        <div className="flex items-center gap-3 animate-fade-in-up">
                            <span className="text-xs md:text-sm text-gray-700 font-medium">
                                該当種 : {filteredCount}種
                            </span>
                            <button
                                onClick={clearAllFilters}
                                className="flex items-center gap-1 px-3 py-1 text-[11px] text-gray-500 bg-gray-50 hover:bg-gray-200 rounded-full transition-colors shadow-sm"
                            >
                                <span>条件をクリア</span>
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* 検索 */}
            {showSearch && allFishList && (
                <FishSearch allFishList={allFishList} />
            )}

            {/* 索引 */}
            {showIndex && (
                <>
                    <p className="text-center text-sm md:text-lg text-gray-700 font-medium">索引</p>
                    <div className="pt-2 pb-10 flex justify-center space-x-3 text-gray-700 font-medium">
                        {kanaList.map((data) => (
                            <p key={data} className="text-xs md:text-base underline hover:opacity-50">
                                <Link
                                    href={{
                                        pathname: `/fish/kana/${data}`,
                                        query: getQueryObj()
                                    }}
                                >
                                    {data}
                                </Link>
                            </p>
                        ))}
                    </div>
                </>
            )}
        </>
    );
}