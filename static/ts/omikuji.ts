enum OmikujiResult {
    Daikichi = '大吉',
    Chukichi = '中吉',
    Shokichi = '小吉',
    Suekichi = '末吉',
    Kyo = '凶',
    Daikyo = '大凶'
}

 
// おみくじを引く関数の定義
function drawOmikuji() {
    const results = Object.values(OmikujiResult);
    const index = Math.floor(Math.random() * (results.length));
    return results[index];
};

// おみくじを表示する要素の取得
const omikujiText = document.querySelector("#omikuji_result") as HTMLParagraphElement;


// ランダム表示関数
function omikujiRandomDisplay(): Promise<string> {
    const interval:number = 100;
    const displayDuration:number = 1500;

    return new Promise((resolve) => {
        const startTime = Date.now();
        const timer = setInterval(() => {
            omikujiText.textContent = drawOmikuji();
            if (Date.now() - startTime >= displayDuration){
                clearInterval(timer);
                resolve(drawOmikuji());
            }
        }, interval);
    });
}


// DOM解析済を前提に、クリック時にドローおみくじを実行

document.addEventListener("DOMContentLoaded", async () => {
    const drawButton = document.querySelector("#omikuji_button") as HTMLButtonElement;

    drawButton.addEventListener("click", async () => {
        const result = await omikujiRandomDisplay();
        omikujiText.textContent = `${result}`;
    });
});
