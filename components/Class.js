import Link from "next/link";
import Image from "next/image";


export function Family({family}) {
    return (
        <h3 className="pt-6 pb-2 text-base md:text-lg text-center text-gray-700 font-medium border-b-4 border-dotted border-gray-500">{family}</h3>
    )
}

export function Genus({genus, data}) {
    return (
        <div>
            <h4 className="py-6 text-base md:text-lg text-center text-gray-700 font-medium">{genus}</h4>
            <div className="flex flex-wrap justify-center">
                {data.map((data) => (
                        <div key={data.id} className="px-3 w-1/3 md:w-1/6 hover:opacity-80">
                            <Link href={`${data.class}/${data.latinName}`.replace(" ", "_")}>
                                <Image src={data.thumbImg.url} alt="thumbnail" width={300} height={200} style={{objectFit:"contain"}} unoptimized/>
                                <h2 className="py-3 mb-2 text-xs md:text-base text-center text-gray-700 font-medium">{data.japaneseName}</h2>
                            </Link>
                        </div>
                    ))}
            </div>
        </div>
    )
}
