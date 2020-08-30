let timer = null;
let container = document.getElementsByClassName('container')[0];
let center = document.getElementsByClassName('center')[0];
let colorArr = ['#CC9999', '#FFFFCC', '#CCCC99', '#FFCCCC', '#FFFF99', '#CCCCFF'];
let num = 0; // 起始数字
/**
 * 游戏开始
 */
function start() {
    timer = setInterval(() => {
        let span = document.createElement('span');
        span.innerHTML = num;
        let bool = isRight(num);
        let color = getRandom(colorArr.length, 0);
        if (bool) {
            span.style.color = colorArr[color];
            span.style.textShadow = `0px 0px 3px ${colorArr[color]}`;
            center.innerHTML = num;
            var div = document.createElement('div');
            div.innerHTML = num;
            div.className = 'center';
            div.style.color = colorArr[color];
            setTimeout(() => {
                div.style.transform = `translate(${getRandom(300, -300)}%,${getRandom(300, -300)}%)`;
                div.style.opacity = '0';
            }, 50)
            document.body.appendChild(div);
            // 动画结束移除dom
            div.addEventListener('transitionend', () => {
                div.remove();
            })
        }
        container.appendChild(span);
        //让滚动条一直滚动到最底部
        // document.documentElement.scrollTop = document.documentElement.scrollHeight;
        num++;
        span.scrollIntoView();// 让页面滚动到该元素的位置

    }, 100)
}
function stop() {
    clearInterval(timer);
    timer = null;
}
/**
 * 判断是否满足条件，赋予颜色
 * @param {*} num 
 */
function isRight(num) {
    if (num < 2) {
        return false;
    }
    for (let i = 2; i < num; i++) {
        if (num % i === 0) return false
    }
    return true
}
/**
 * 获取随机数
 * @param {*} max 
 * @param {*} min 
 */
function getRandom(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
}
document.documentElement.onclick = function () {
    if (timer) {
        stop();
    } else {
        start();
    }
}
