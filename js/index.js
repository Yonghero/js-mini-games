let infoArr = ['1山西襄汾饭店垮塌前视频曝光', '1特朗普正考虑限制中国学生赴美', '1谭松韵妈妈被撞案肇事者父亲回应', '1驻印度使馆回应印军再次非法越线', '1惊现帅气阿轩']
let ul = document.getElementsByClassName('searchList')[0];
let input = document.getElementById('sw');
let searchBar = document.getElementsByClassName('baseBar')[0];
let container = document.getElementsByClassName('container')[0];
let curIndex = -1;
/**
 * input输入关键字进行查找
 */
function search() {
    let keyWord = input.value;
    if (!keyWord) return;
    ul.innerHTML = ''
    let kwArr = infoArr.filter(it => it.includes(keyWord));
    if (kwArr.length !== 0) {
        kwArr.forEach(info => {
            let li = document.createElement('li');
            let newInfo = info.replace(new RegExp(keyWord, 'g'), (r) => {
                return `<span class='kw'>${r}</span>`
            })
            li.innerHTML = newInfo;
            ul.appendChild(li);
            showUl(true);
        })
    }
}
/**
 * 显示联想列表
 */
function showUl(bool) {
    if (bool) {
        ul.style.display = 'block';
    } else {
        ul.style.display = 'none';
    }
}

/**
 * 选中列表项时的样式
 */
function showLi() {
    if (ul.children.length !== 0) {
        let lis = Array.from(ul.children);
        lis.forEach(li => li.className = '')
        lis[curIndex].className = 'active';
        // ul.children[curIndex].classList.add('active');
    }
}
// 事件绑定
// 设定一个计时器 （防抖）
let timer = null;
input.oninput = () => {
    clearTimeout(timer);
    timer = setTimeout(search, 500);
}
input.onmouseenter = () => {
    searchBar.classList.add('searchBar');
    showUl(true);
}
container.onmouseover = (e) => {
    if (e.target.tagName === 'LI') {
        let lis = Array.from(ul.children);
        curIndex = lis.indexOf(e.target);
        showLi();
    }
}
ul.onclick = (e) => {
    if (e.target.tagName === 'LI') {
        input.value = ul.children[curIndex].innerText;
        searchBar.classList.remove('searchBar')
        showUl(false);
    }
}
document.body.onclick = (e) => {
    if (e.target.tagName !== 'BODY') return;
    searchBar.classList.remove('searchBar')
    showUl(false);
}

container.onkeydown = (e) => {
    if (e.key === 'ArrowUp') {
        curIndex--;
        if (curIndex < 0) curIndex = 0;
    }
    else if (e.key === 'ArrowDown') {
        curIndex++;
        if (curIndex >= ul.children.length) curIndex = ul.children.length - 1;
    }
    else if (e.key === 'Enter') {
        input.value = ul.children[curIndex].innerText;
        searchBar.classList.remove('searchBar')
        showUl(false);
    }
    else {
        return true;
    }
    showLi()
    return false;
}

