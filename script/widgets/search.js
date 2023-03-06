export const autocomplite = (input, array) => {
    let list = input.nextElementSibling;
    const search = (input, array) => {
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
            if (searchResultHTML.length != 0){
                list.innerHTML = '<li class="list-group-item">Loading result...</li>';
                setTimeout(() => {
                    list.innerHTML = searchResultHTML.join('');
                }, 0);
            } else {
                list.innerHTML = '<li class="list-group-item">Result not found :(</li>';
            }
        } else {
            list.classList.add('close');
        }
    }
    input.addEventListener('input', () => {
        search(input, array);
    });
    input.addEventListener('focus', () => {
        if (input.value.trim() !== ''){
            list.classList.remove('close');
        }
    })
    input.addEventListener('blur', () => {
        list.classList.add('close');
    });
}