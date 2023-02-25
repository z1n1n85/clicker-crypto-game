import constant from './constant.js';
const {url} = constant;

// ===============================================================

export let coinsIdByName = new Map();
export let coinsNameList = [];

export const loadCoinsList = async () => {
    try {
        let resolve = await fetch(`${url}coins`);
        let json = await resolve.json();
        json.forEach(e => {
            coinsIdByName.set(e.name, e.id);
            coinsNameList.push(e.name);
        });
    } catch(err) {
        throw new SyntaxError(`Error in loadCoinsList(): ${err}`);
    }
}

const loadCoinInfo = async (api) => {
    let resolve =
        await fetch(`https://api.coinpaprika.com/v1/tickers/${api}`);
    let json =
        await resolve.json();
    return json;
}