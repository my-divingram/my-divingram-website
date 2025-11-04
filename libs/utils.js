/**
 * 配列をシャッフルする
 */
export const shuffleArray = (array) => {
    const cloneArray = [...array];
    for (let i = cloneArray.length - 1; 0 <= i; i--) {
        let randomNum = Math.floor(Math.random() * (i + 1));
        let tmpStorage = cloneArray[i];
        cloneArray[i] = cloneArray[randomNum];
        cloneArray[randomNum] = tmpStorage;
    }
    return cloneArray;
};

/**
 * 海外種に * をつける
 */
export function getJapaneseName(data) {
    if (data.isOversea){
        return `${data.japaneseName}*`
    } else {
        return data.japaneseName;
    }
}

/**
 * カタカナをひらがなに変換する
 */
export const katakanaToHiragana = (str) => {
    return str.replace(/[\u30a1-\u30f6]/g, (match) => {
        return String.fromCharCode(match.charCodeAt(0) - 0x60);
    });
};

/**
 * microCMSの画像URLを、指定した幅のWebPに変換するURL文字列を返す
 * (unoptimized={true} と併用するための手動ローダー)
 * @param {string} src - microCMSのオリジナル画像URL
 * @param {number} width - 必要な画像の幅 (ピクセル)
 */
export function getOptimizedMicroCMSImage(src, width) {
  if (!src) {
    return null; // src がない場合は null を返す
  }

  try {
    const url = new URL(src);
    url.searchParams.set('w', width.toString());
    url.searchParams.set('q', '75'); // 品質を75に設定
    url.searchParams.set('fm', 'webp'); // WebP形式に強制変換
    return url.href;
  } catch (error) {
    console.error("Invalid image src for optimization:", src, error);
    return src; // エラーの場合は元のURLを返す
  }
}