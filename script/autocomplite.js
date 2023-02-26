import constant from './constant.js';
const { inputSearchCoin, } = constant;

// ===============================================================

export const autocomplite = (input, array) => {
    let list = input.nextElementSibling;
    let val = input.value.trim().toLowerCase()
    if (val !== ''){
        let searchResultHTML = [];
        list.classList.remove('close');
        array.forEach(e => {
            if (e.toLowerCase().search(val) != -1){
                let valStart = e.toLowerCase().indexOf(val);
                let valEnd = valStart + val.length;
                let strPre = e.slice(0, valStart);
                let strVal = e.slice(valStart, valEnd);
                let strPost = e.slice(valEnd);
                searchResultHTML.push(`
                    <li class="list-group-item">
                        ${strPre}<b>${strVal}</b>${strPost}
                    </li>`
                );
            }
        });
        list.innerHTML = searchResultHTML.join('');
    } else {
        list.classList.add('close');
    }
}