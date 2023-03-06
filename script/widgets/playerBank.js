import constant from '../constant.js';
const {playerBankValue} = constant;

import saves from '../saves.js';
const {
    playerBank,
} = saves;

export const renderPlayerBank = () => {
    playerBankValue.textContent = `
        ${playerBank['money']}$
    `;
}