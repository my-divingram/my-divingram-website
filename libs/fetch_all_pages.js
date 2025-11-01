import { client } from "/libs/client";

/**
 * microCMSから全ページのデータを取得する
 * ※サーバーサイド専用（getStaticProps など）
 */
export const fetchAllPages = async (endpoint, baseQueries = {}) => {
    const limit = 100;
    let allContents = [];
    const firstQueries = { ...baseQueries, limit: limit, offset: 0 };
    const firstResponse = await client.get({
        endpoint: endpoint,
        queries: firstQueries
    });
    allContents = firstResponse.contents;
    const totalCount = firstResponse.totalCount;

    if (totalCount > limit) {
        const remainingRequests = [];
        for (let offset = limit; offset < totalCount; offset += limit) {
            const queries = { ...baseQueries, limit: limit, offset: offset };
            remainingRequests.push(
                client.get({ endpoint: endpoint, queries: queries })
            );
        }
        const additionalResponses = await Promise.all(remainingRequests);
        additionalResponses.forEach(response => {
            allContents.push(...response.contents);
        });
    }
    return allContents;
};