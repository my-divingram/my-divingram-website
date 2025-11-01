import { useState, useMemo } from "react";
import Link from "next/link";
import { katakanaToHiragana, getJapaneseName } from "/libs/utils";

export default function FishSearch({ allFishList }) {
    const [searchTerm, setSearchTerm] = useState("");

    const searchResults = useMemo(() => {
        if (!searchTerm) return [];

        const termHira = katakanaToHiragana(searchTerm.toLowerCase());
        const termLower = searchTerm.toLowerCase();

        const filteredList = allFishList.filter(fish => {
            const nameHira = katakanaToHiragana(fish.japaneseName.toLowerCase());
            const matchJapanese = nameHira.includes(termHira);
            const nameLatin = fish.latinName?.toLowerCase() || "";
            const matchLatin = nameLatin.includes(termLower);
            return matchJapanese || matchLatin;
        });
        return filteredList.sort((a, b) => a.japaneseName.localeCompare(b.japaneseName, "ja"));

    }, [searchTerm, allFishList]);

    return (
        <div className="pb-5 max-w-xs md:max-w-sm mx-auto relative">
            <p className="pb-2 text-center text-sm md:text-lg text-gray-700 font-medium">検索</p>
            <input
                type="search"
                placeholder="和名 または 学名 を入力"
                className="w-full p-3 text-xs md:text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {searchTerm && (
                <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-80 overflow-y-auto z-10">
                    {searchResults.length > 0 ? (
                        <ul>
                            {searchResults.slice(0, 50).map((fish) => (
                                <li key={fish.id} className="border-b last:border-b-0">
                                    <Link
                                        href={`/fish/${fish.class}/${fish.latinName}`.replace(" ", "_")}
                                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-sky-50 transition-colors"
                                        onClick={() => setSearchTerm("")}
                                    >
                                        {getJapaneseName(fish)}
                                        <span className="block text-xs text-gray-500 italic">{fish.latinName}</span>
                                    </Link>
                                </li>
                            ))}
                            {searchResults.length > 50 && (
                                <li className="px-4 py-3 text-center text-sm text-gray-500 italic">...</li>
                            )}
                        </ul>
                    ) : (
                        <p className="p-4 text-center text-sm text-gray-500">Not Found</p>
                    )}
                </div>
            )}
        </div>
    );
}