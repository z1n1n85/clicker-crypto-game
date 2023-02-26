import constant from './constant.js';
const {
    playerBankValue,
    buttonInfoContainer,
    coinInfoContainer,
    miningZoneContainer,
    clickerButton,
    url,
    inputSearchCoin,
} = constant;

import saves from './saves.js';
const {
    playerBank,
} = saves;

import {
    loadCoinsList,
    coinsIdByName, 
    coinsNameList
} from './coinsInfo.js';

import { autocomplite } from './autocomplite.js';

// ===============================================================

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
        <h4 class="card-title">${name}</h4>
        <p class="card-text">${coinPrice} $
        </br>
        Price change in 15 minutes: ${coinChange15m}%
        </br>
        Price change in 7 days: ${coinChange7d}%</p>
    `;
    clickerButton.removeAttribute('disabled');
    clickerButton.value = name;
    clickerButton.textContent = `Mining ${name}`;
}

const renderCoinButton = () => {
    let htmlButton = [];
    coinData.forEach(e => {
        htmlButton.push(`
            <input type="radio" class="btn-check" name="coin-info" 
            id="radio-${e.name}" value=''>
            <label for="radio-${e.name}" class="btn btn btn-outline-secondary"
            id="${e.id}">${e.name}</label>
        `);
    });
    buttonInfoContainer.innerHTML = htmlButton.join('');
    coinData.forEach(e => {
        document.getElementById(e.id)
        .addEventListener(
            'click',
            () => {renderCoinInfo(e.api)}
        );
    });
}

const renderPlayerBank = () => {
    playerBankValue.textContent = `
        BTC: ${playerBank['Bitcoin']}. 
        DOGE: ${playerBank['Dogecoin']}. 
        LTC: ${playerBank['Litecoin']}. 
        ${playerBank['money']}$
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

// ===============================================================

window.onload = () => {
    loadCoinsList();
    renderPlayerBank();
}

clickerButton.addEventListener('click', () => {
    clickMining(clickerButton.value);
});

inputSearchCoin.addEventListener('input', () => {
    autocomplite(inputSearchCoin, coinsNameList);
    console.log('aaa')
});

