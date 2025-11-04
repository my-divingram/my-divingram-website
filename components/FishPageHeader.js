import Link from "next/link";
import Image from "next/image";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import { getJapaneseName } from "/libs/utils"; // 共通関数
import FishSearch from "./FishSearch"; // 検索コンポーネント
import { getOptimizedMicroCMSImage } from "/libs/utils";

const kanaList = ["ア", "カ", "サ", "タ", "ナ", "ハ", "マ", "ヤ", "ラ", "ワ"];

export default function FishPageHeader({
    data_fish_slider,
    data_num,
    data_num_ja,
    data_fish, // recent_updates の最終更新日表示に必要
    allFishList, // FishSearch に渡す
    showSearch, // 検索を表示するか
    showIndex,  // 索引を表示するか
}) {
    return (
        <>
            <h1 className="pt-10 pb-5 text-xl md:text-2xl text-center text-sky-800 font-black">僕らむの魚図鑑</h1>

            <Splide options={{type:"loop", gap:"24px", drag:"free", perPage:10, breakpoints:{640:{perPage:3}}, autoScroll:{pauseOnHover:true, pauseOnFocus:false, rewind:false, speed:0.3}}} extensions={{AutoScroll}}>
                {data_fish_slider?.map((data) => ( // ?. を追加して安全に
                    <SplideSlide key={data.id}>
                        <div className="hover:opacity-80">
                            <Link href={`/fish/${data.class}/${data.latinName}`.replace(" ", "_")}>
                                <Image src={getOptimizedMicroCMSImage(data.thumbImg.url, 300)} alt={data.japaneseName} width={300} height={200} style={{objectFit:"contain"}} unoptimized={true} priority={true}/>
                                <h2 className="py-3 mb-2 text-xs md:text-sm text-center text-gray-700 font-medium">{getJapaneseName(data)}</h2>
                            </Link>
                        </div>
                    </SplideSlide>
                ))}
            </Splide>

            <p className="text-sm md:text-lg text-center text-gray-700 font-medium">掲載種 (海外種や淡水魚を含む) : {data_num}種</p>
            <p className="text-sm md:text-lg text-center text-gray-700 font-medium">うち日本産海水魚 : {data_num_ja}種</p>

            {/* data_fish が渡された時だけ最近の更新を表示 (index, kana で使用) */}
            {data_fish && data_fish[0] && (
                 <p className="pt-1 pb-1 text-xs md:text-sm text-center text-gray-700 font-medium">
                    最近の更新一覧は<Link href={"/fish/recent_updates"} className="underline hover:opacity-50">こちら</Link> (最終更新 : {data_fish[0].updatedAt.substr(0,10)})
                 </p>
            )}

            <p className="pb-1 text-xs md:text-sm text-center text-gray-700 font-medium">周縁性淡水魚は海水魚とみなす</p>
            <p className={`pb-5 text-xs md:text-sm text-center text-gray-700 font-medium`}>海外種は名称の末尾に*の注釈あり</p>

            {/* 検索 (index, kana のみ表示) */}
            {showSearch && allFishList && (
                <FishSearch allFishList={allFishList} />
            )}

            {/* 索引 (index, kana のみ表示) */}
            {showIndex && (
                <>
                    <p className="text-center text-sm md:text-lg text-gray-700 font-medium">索引</p>
                    <div className="pt-2 pb-10 flex justify-center space-x-3 text-gray-700 font-medium">
                        {kanaList.map((data) => (
                            <p key={data} className="text-xs md:text-base underline hover:opacity-50">
                                <Link href={`/fish/kana/${data}`}>
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