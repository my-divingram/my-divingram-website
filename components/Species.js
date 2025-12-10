import Link from "next/link";
import Image from "next/image";
import { getOptimizedMicroCMSImage } from "/libs/utils";

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

function record(pagedata) {
    if (pagedata.record){
        return <div className="flex flex-wrap justify-center">
                    {pagedata.record.map((data) => (
                        <div key={data.fieldId} className="px-1 w-1/3 md:w-1/5">
                            <div>
                                <Link href={data.image.url} className="block">
                                    <Image src={getOptimizedMicroCMSImage(data.image.url, 300)} alt="image" width={300} height={200} style={{objectFit:"contain"}} unoptimized={true} className="mx-auto"/>
                                </Link>
                                <p className="pt-1 pb-2 text-[10px] md:text-[11px] text-center text-gray-700">{data.info}</p>
                            </div>
                        </div>
                    ))}
                </div>
    } else {
        return;
    }
}

export function Species({classes, categoryUrl, pagedata}) {
    return (
        <div className="px-5 md:px-20 font-sans">
            <div className="px-5">
                <p className="pt-5 text-xs md:text-sm text-left text-gray-700 font-medium">
                    <Link href={"/fish"} className="underline hover:opacity-50">魚図鑑</Link>
                    {" > "}
                    <Link href={categoryUrl} className="underline hover:opacity-50">{classes}</Link>
                    {" > "}
                    {pagedata.genus}
                </p>

                <h1 className="pt-5 text-xl md:text-2xl text-center text-gray-700 font-black">{pagedata.japaneseName}</h1>
                <h2 className="pt-2 pb-3 text-xs md:text-lg text-center text-gray-700 font-medium italic">{pagedata.latinName}</h2>

                <div className="flex flex-wrap justify-center items-center gap-2 pb-5">

                    {pagedata.isOversea ? (
                        <span className="mr-3 px-3 py-1 text-[10px] md:text-xs font-bold text-sky-800 bg-white border border-sky-800 rounded-full shadow-sm">
                            海外種
                        </span>
                    ) : (
                        <span className="mr-3 px-3 py-1 text-[10px] md:text-xs font-bold text-sky-800 bg-white border border-sky-800 rounded-full shadow-sm">
                            国内種
                        </span>
                    )}

                    {pagedata.habitat && pagedata.habitat.map((h, index) => (
                        <span
                            key={index}
                            className={`px-3 py-1 text-[10px] md:text-xs font-bold border rounded-full shadow-sm ${getHabitatColor(h)}`}
                        >
                            {h}
                        </span>
                    ))}
                </div>

                <div className="md:px-3 flex justify-center items-center">
                    <Link href={pagedata.thumbImg.url}>
                        <Image src={getOptimizedMicroCMSImage(pagedata.thumbImg.url, 600)} alt={pagedata.japaneseName} width={600} height={400} style={{objectFit:"contain"}} unoptimized={true} priority={true}/>
                    </Link>
                </div>

                <p className="pt-2 text-xs md:text-sm text-center text-gray-700">{pagedata.thumbInfo}</p>

                {pagedata.comment && <div
                    dangerouslySetInnerHTML={{__html: `${pagedata.comment}`}}
                    className="
                        pt-5
                        prose prose-sm md:prose-base
                        prose-p:leading-relaxed
                        max-w-4xl
                        mx-auto
                        prose-a:text-sky-600
                        prose-figcaption:text-xs
                        md:prose-figcaption:text-sm
                        prose-figcaption:text-gray-700
                        prose-figcaption:text-center
                        prose-figcaption:mt-2
                        prose-strong:font-extrabold
                    "
                />}

                <div className="h-10"></div>
            </div>


            {record(pagedata)}

        </div>
    )
}
