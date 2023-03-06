import constant  from '../constant.js';
const { coinInfoContainer } = constant;

import {
    loadCoinInfo,
    coinsIdByName,
} from '../API.js';

export const renderCoinInfo = async (value) => {
    const coinID = coinsIdByName.get(`${value}`);
    console.log(coinsIdByName)
    const { 
        name: name, 
        quotes: {
            USD: {
                price: coinPrice,
                percent_change_15m: coinChange15m,
                percent_change_7d: coinChange7d, 
            }
        }
    } = await loadCoinInfo(coinID);
    coinInfoContainer.innerHTML = `
        <h4 class="card-title">${name}</h4>
        <p class="card-text">${coinPrice} $
        </br>
        Price change in 15 minutes: ${coinChange15m}%
        </br>
        Price change in 7 days: ${coinChange7d}%</p>
    `;
    // clickerButton.removeAttribute('disabled');
    // clickerButton.value = name;
    // clickerButton.textContent = `Mining ${name}`;
}