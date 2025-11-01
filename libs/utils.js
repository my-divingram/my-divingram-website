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