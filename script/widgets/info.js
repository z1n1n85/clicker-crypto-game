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
        <h4 class="left-align">${name}</h4>
        <hr class="tui-divider"></hr> 
        <ul class="left-align">
        <li> ${coinPrice} $ </li>
        <li> Price change in 15 minutes: ${coinChange15m}% </li>
        <li> Price change in 7 days: ${coinChange7d}% </li>
        </ul>
    `;
    // clickerButton.removeAttribute('disabled');
    // clickerButton.value = name;
    // clickerButton.textContent = `Mining ${name}`;
}