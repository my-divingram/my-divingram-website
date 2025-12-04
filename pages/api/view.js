import { Redis } from '@upstash/redis';

console.log("--- DEBUG ENV VARS ---");
console.log("KV_REST_API_URL:", process.env.KV_REST_API_URL ? "Exists (Length: " + process.env.KV_REST_API_URL.length + ")" : "UNDEFINED");
console.log("KV_REST_API_TOKEN:", process.env.KV_REST_API_TOKEN ? "Exists" : "UNDEFINED");

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
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { path, japaneseName } = req.body;
  if (!path) return res.status(400).send('Missing path');

  try {
    const today = getJSTDate();
    const rankingKey = `page_ranking:${today}`; // キー名: page_ranking:2025-01-01

    // 1. 今日のランキングにカウントアップ
    await redis.zincrby(rankingKey, 1, path);

    // 2. 古いデータを残さないよう、このランキングデータの寿命を「3日」に設定
    // (今日が終わっても、念のため少しの間は残しておき、その後自動削除)
    await redis.expire(rankingKey, 60 * 60 * 24 * 3);

    // 3. 和名の保存 (辞書データはずっと消えない場所に保存)
    if (japaneseName) {
        await redis.hset('fish_names', { [path]: japaneseName });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Redis Error:', error);
    res.status(500).json({ error: 'Error incrementing view' });
  }
}