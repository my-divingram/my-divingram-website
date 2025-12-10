import Link from "next/link";
import Image from "next/image";
import { getOptimizedMicroCMSImage } from "/libs/utils";

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
                            <Link
                                href={`${data.class}/${data.latinName}`.replace(" ", "_")}
                                className="relative block"
                            >
                                {data.isOversea && (
                                    <div className="absolute top-0 right-0 w-[25%] max-w-[60px] bg-sky-800/70 z-10 shadow-sm pointer-events-none">
                                        <div className="w-full h-auto px-[10%] py-[10%]">
                                            <svg viewBox="0 0 30 10" className="w-full h-auto block fill-white">
                                                <text
                                                    x="50%"
                                                    y="50%"
                                                    dy=".35em"
                                                    textAnchor="middle"
                                                    fontSize="9"
                                                    fontWeight="bold"
                                                    style={{dominantBaseline: "auto"}}
                                                >
                                                    海外種
                                                </text>
                                            </svg>
                                        </div>
                                    </div>
                                )}

                                <Image
                                    src={getOptimizedMicroCMSImage(data.thumbImg.url, 300)}
                                    alt={data.japaneseName}
                                    width={300}
                                    height={200}
                                    style={{objectFit:"contain"}}
                                    unoptimized={true}
                                    priority={true}
                                    className="w-full h-auto"
                                />
                                <h2 className="py-3 mb-2 text-xs md:text-base text-center text-gray-700 font-medium">{data.japaneseName}</h2>
                            </Link>
                        </div>
                    ))}
            </div>
        </div>
    )
}
