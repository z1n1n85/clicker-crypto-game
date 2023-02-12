const buttonContainer = document.querySelector('#button-container');
const coinInfoContainer = document.querySelector('#coin-info-container');
const coinArray = [
    {
        coinApi: 'btc-bitcoin',
        coinID: 'btc-info-button',
        buttonName: 'BTC',
    }, {
        coinApi: 'doge-dogecoin',
        coinID: 'doge-info-button',
        buttonName: 'DOGE',
    }, {
        coinApi: 'ltc-litecoin',
        coinID: 'ltc-info-button',
        buttonName: 'LTC',
    }
];

const loadCoinInfo = async (coinApi) => {
    let resolve =
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinApi}`);
    let json =
        await resolve.json();
    return json;
}

const renderCoinInfo = async (coinApi) => {
    let { 
        name: coinName, 
        quotes: {
            USD: {
                price: coinPrice,
                percent_change_15m: coinChange15m,
                percent_change_7d: coinChange7d, 
            }
        }
    } = await loadCoinInfo(coinApi);
    coinInfoContainer.innerHTML = `
        <h1>${coinName}</h1>
        <h2>${coinPrice} $</h2>
        <h2>Price change in 15 minutes: ${coinChange15m}%</h2>
        <h2>Price change in 7 days: ${coinChange7d}%</h2>
    `;
}

const renderCoinButton = () => {
    let htmlButton = [];
    coinArray.forEach(e => {
        htmlButton.push(`
            <li>
                <button id='${e.coinID}'>${e.buttonName}</button>
            </li>
        `);
    });
    buttonContainer.innerHTML = htmlButton.join('');
    coinArray.forEach(e => {
        document.getElementById(e.coinID)
        .addEventListener(
            'click',
            () => {renderCoinInfo(e.coinApi)}
        );
    });
}

renderCoinButton();