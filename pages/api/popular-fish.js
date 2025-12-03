import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

function getJSTDate() {
    const date = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Tokyo" }));
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

export default async function handler(req, res) {
  try {
    const todayKey = `page_ranking:${getJSTDate()}`;

    const rankingRaw = await redis.zrange(todayKey, 0, 9, {
      rev: true,
      withScores: true
    });

    if (rankingRaw.length === 0) {
      return res.status(200).json([]);
    }

    let paths = [];
    let tempRanking = [];

    if (typeof rankingRaw[0] === 'object' && !Array.isArray(rankingRaw[0])) {
       for (const item of rankingRaw) {
         const path = item.member || item.value;
         paths.push(path);
         tempRanking.push({ path, views: item.score });
       }
    } else {
       for (let i = 0; i < rankingRaw.length; i += 2) {
         const path = rankingRaw[i];
         paths.push(path);
         tempRanking.push({ path, views: rankingRaw[i + 1] });
       }
    }

    let namesMap = {};
    if (paths.length > 0) {
        for (const path of paths) {
            const name = await redis.hget('fish_names', path);
            namesMap[path] = name;
        }
    }

    const rankingData = tempRanking.map(item => {
        const latinNameFromUrl = String(item.path).split('/').pop().replace(/_/g, ' ').replace(/%20/g, ' ');
        return {
            path: item.path,
            japaneseName: namesMap[item.path] || null,
            latinName: latinNameFromUrl,
            views: item.views
        };
    });

    res.status(200).json(rankingData);

  } catch (error) {
    console.error("Redis Fetch Error:", error);
    res.status(500).json({ error: 'Failed to fetch ranking' });
  }
}