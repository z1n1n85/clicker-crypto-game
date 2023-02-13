const playerBankContaienr = document.querySelector('#player-bank');
const buttonContainer = document.querySelector('#coin-btn-info');
const coinInfoContainer = document.querySelector('#coin-info');
const miningZoneContainer = document.querySelector('#mining-zone');
const clickerButton = document.querySelector('#clicker-button');

const coinData = [
    {
        api: 'btc-bitcoin',
        id: 'btc-info-button',
        name: 'BTC',
    }, {
        api: 'doge-dogecoin',
        id: 'doge-info-button',
        name: 'DOGE',
    }, {
        api: 'ltc-litecoin',
        id: 'ltc-info-button',
        name: 'LTC',
    }
];
let playerBank = new Map([
    ['money', 0],
    ['Bitcoin', 0],
    ['Dogecoin', 0],
    ['Litecoin', 0],
]);


const loadCoinInfo = async (api) => {
    let resolve =
        await fetch(`https://api.coinpaprika.com/v1/tickers/${api}`);
    let json =
        await resolve.json();
    return json;
}

const renderCoinInfo = async (api) => {
    let { 
        name: name, 
        quotes: {
            USD: {
                price: coinPrice,
                percent_change_15m: coinChange15m,
                percent_change_7d: coinChange7d, 
            }
        }
    } = await loadCoinInfo(api);
    coinInfoContainer.innerHTML = `
        <h1>${name}</h1>
        <h2>${coinPrice} $</h2>
        <h2>Price change in 15 minutes: ${coinChange15m}%</h2>
        <h2>Price change in 7 days: ${coinChange7d}%</h2>
    `;
    clickerButton.value = name;
    clickerButton.textContent = `Mining ${name}`;
}

const renderCoinButton = () => {
    let htmlButton = [];
    coinData.forEach(e => {
        htmlButton.push(`
            <input type="radio" name="coin-info" 
            id="radio-${e.name}" value=''>
            <label for="radio-${e.name}"
            id="${e.id}">${e.name}</label>
        `);
    });
    buttonContainer.innerHTML = htmlButton.join('');
    coinData.forEach(e => {
        document.getElementById(e.id)
        .addEventListener(
            'click',
            () => {renderCoinInfo(e.api)}
        );
    });
}

const renderPlayerBank = () => {
    playerBankContaienr.innerHTML = `
        <p>
            BTC: ${playerBank.get('Bitcoin')}. 
            DOGE: ${playerBank.get('Dogecoin')}. 
            LTC: ${playerBank.get('Litecoin')}. 
            ${playerBank.get('money')}$
        </p>
    `;
}

const clickMining = (coin) => {
    if (!(playerBank.has(`${coin}`))) {
        playerBank.set(`${coin}`, 1);
    } else {
        let n = playerBank.get(`${coin}`);
        n += 1;
        playerBank.set(`${coin}`, n);
    }
    renderPlayerBank();
}

clickerButton.addEventListener('click', () => {
    clickMining(clickerButton.value);
})

window.onload = () => {
    renderCoinButton();
    renderPlayerBank();
}