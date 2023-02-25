import {
    coinsIdByName,
    coinsNameList,
} from './coinsInfo.js'

export const autocomplite = (input, array) => {
    let autocompList = input.nextElementSibling;
    autocompList.classList.remove('hidden');
    autocompList.classList.add('visible');
}