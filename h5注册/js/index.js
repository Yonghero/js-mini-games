let form = document.getElementsByTagName('form')[0];
let inputs = document.querySelectorAll('input[data-sure]')

// input 必填项处理
form.oninput = (e) => {
    if (!!e.target.dataset['sure']) {
        let parentDom = e.target.parentNode;
        if (e.target.value !== '') {
            clearStrong(parentDom)
        } else {
            createStrong(parentDom)
        }
    }
}

let div;
// 下拉列表 必填项处理
form.onclick = (e) => {
    if(!!e.target.dataset['sure']){
        div = e.target;
    }
    e.target.parentNode.childNodes.forEach(node => {
        if (node.tagName === 'UL') {
            console.log(node);
            node.style.display = 'block';
        }
    })
    console.log(e.target);
    if(e.target.tagName === 'LI'){
        div.innerText = e.target.innerText;
        e.target.parentNode.style.display = 'none'
    }
}
// 提交时总体验证
form.onsubmit = (e) => {
    let isNull = false;
    inputs.forEach((input) => {
        let parentDom = input.parentNode;
        clearStrong(parentDom);
        if (input.value === '') {
            // 必填项为空
            createStrong(parentDom);
            isNull = true;
            return;
        }
    });
    isNull ? alert('必填项为填写！请按要求填写完整') : console.log('可以发送')
    return false;
}

// 重新提交 清除warn
function clearStrong(dom) {
    dom.childNodes.forEach((node) => {
        if (node.tagName === 'STRONG') {
            dom.removeChild(node);
        }
    })
}
// 创建warn
function createStrong(dom) {
    let warn = document.createElement('strong');
    warn.innerHTML = '必填项不能为空'
    dom.appendChild(warn);
}