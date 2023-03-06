import constant from './constant.js';
const {
    inputSearchCoin,
    buttonSearchCoin,
} = constant;

import {
    loadCoinsList,
    coinsNameList,
} from './API.js';

import { renderCoinInfo } from './widgets/info.js'

import { renderPlayerBank } from './widgets/playerBank.js'

import { autocomplite } from './widgets/search.js';

// ===============================================================

window.onload = () => {
    loadCoinsList()
        .then(
            autocomplite(inputSearchCoin, coinsNameList)
        );
    renderPlayerBank();
    buttonSearchCoin.addEventListener('click', () => {
        renderCoinInfo(inputSearchCoin.value);
    });
}
