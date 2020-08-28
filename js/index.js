var game = document.getElementsByClassName('game')[0];
var itemObj = []; // 根据该数组生成游戏项
var itemNo = 4; // 游戏项数
var itemMax = 6; // 游戏图片需要的种类
/**
 * 初始化渲染游戏界面
 */
function renderInit() {
    createItem();
    handlerItem();
}
/**
 * 为每一个游戏项添加相应的处理事件，玩法
 */
function handlerItem() {
    itemObj.forEach((item) => {
        item.dom.onclick = function () {
            // 不能翻转的情况
            let len = itemObj.filter(item => item.status === 'back' || item.status == 'flipping').length
            if (len >= 2 || item.status === 'succeed') return;
            // 能翻转的情况
            item.status = 'flipping';
            this.className = 'flip';
            setTimeout(() => {
                item.status = 'back';
            }, 50);
            // 判断两次翻转的游戏项是否一致
            let backObj = itemObj.filter(item => item.status === 'back');
            if (backObj[0] && backObj[0].number === item.number) {
                setTimeout(() => {
                    backObj[0].dom.className = 'success',
                        item.dom.className = 'success';
                    backObj[0].status = 'succeed'
                    item.status = 'succeed';
                }, 500)
            }
            else if (backObj[0] && backObj[0].number !== item.number) {
                setTimeout(() => {
                    backObj[0].status = 'front';
                    item.status = 'front';
                    backObj[0].dom.className = 'back';
                    item.dom.className = 'back';
                }, 500) 
            }
            let sucLen = itemObj.filter((item) => item.status === 'front').length;
            if (sucLen === 0) {
                setTimeout(()=>{
                    alert('游戏成功');
                    location.reload();
                },50)
            }
        }
    })
}
/**
 * 生成每一个游戏项
 */
function createItem() {
    bulidItemObj();
    itemObj.forEach((item) => {
        let li = document.createElement('li');
        li.innerHTML = `<img src='./img/${item.number}.jpg'></img>`
        game.appendChild(li);
        item.dom = li;
    })
}
/**
 * 构造生成游戏项的数组
 */
function bulidItemObj() {
    itemObj = new Array(itemNo);
    for (let i = 0; i < itemObj.length; i += 2) {
        let number = randomNumber(itemMax + 1, 1);
        itemObj[i] = {
            number, // 游戏图片的类型
            status: 'front' // 游戏状态
        };
        itemObj[i + 1] = {
            number,
            status: 'front'
        }
    }
    // 打乱每一个游戏项
    itemObj.sort(() => {
        return Math.random() - 0.5;
    })
}
/**
 * 生成随机数
 */
function randomNumber(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
}

renderInit();