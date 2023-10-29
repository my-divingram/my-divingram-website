import Link from "next/link";
import Image from "next/image";


function record(pagedata) {
    if (pagedata.record){
        return <div className="flex flex-wrap justify-center">
                    {pagedata.record.map((data) => (
                        <div key={data.fieldId} className="px-3 w-1/3 md:w-1/5">
                            <div>
                                <Link href={data.image.url}>
                                    <Image src={data.image.url} alt="image" width={300} height={200} style={{objectFit:"contain"}} unoptimized/>
                                </Link>
                                <p className="py-1 text-xs md:text-sm text-center text-black">{data.info}</p>
                            </div>
                        </div>
                    ))}
                </div>
    } else {
        return;
    }
}

export function Species({classes, pagedata}) {
    return (
        <div className="px-5 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">
            <p className="pt-5 text-xs md:text-sm text-left text-gray-700 font-medium"><Link href={"../"} className="underline hover:opacity-50">魚図鑑</Link> {">"} <Link href={"./"} className="underline hover:opacity-50">{classes}</Link> {">"} {pagedata.genus}</p>

            <h1 className="pt-5 text-xl md:text-2xl text-center text-gray-700 font-black">{pagedata.japaneseName}</h1>
            <h2 className="pt-2 pb-5 text-xs md:text-lg text-center text-gray-700 font-medium italic">{pagedata.latinName}</h2>

            <div className="md:px-3 flex justify-center items-center">
                <Link href={pagedata.thumbImg.url}>
                    <Image src={pagedata.thumbImg.url} alt="thumbnail" width={600} height={400} style={{objectFit:"contain"}} unoptimized/>
                </Link>
            </div>

            <p className="pt-2 text-sm md:text-base text-center text-gray-700">{pagedata.thumbInfo}</p>

            {pagedata.comment && <div dangerouslySetInnerHTML={{__html: `${pagedata.comment}`}} className="prose pt-10 prose-figure:flex prose-figure:justify-center prose-figure:m-0 prose-figure:pt-8 prose-figure:pb-2 prose-p:text-gray-700 prose-p:m-0 prose-p:py-1 text-sm md:text-base text-center max-w-none"></div>}
            <div className="h-10"></div>


            {record(pagedata)}

        </div>
    )
}
