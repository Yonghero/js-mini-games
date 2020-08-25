
/**
 * c1-c3 代表三根柱子
 * 操作数组里的数据代表操作汉诺塔
 */
var columns = {
    c1: [3, 2, 1],
    c2: [],
    c3: []
}
var minWidth = 80; // 汉诺塔的最小宽度 
var addWidth = 40; // 汉诺塔每增一级增加的宽度

function render() {
    for (var key in columns) {
        var dom = document.getElementById(key);
        dom.innerHTML = '';
        renderOne(columns[key], dom);
    }

    /**s
     * @param {*} column 渲染到哪一根柱子 
     * @param {*} arr 渲染的数据
     */
    function renderOne(arr, column) {
        arr.forEach(item => {
            let div = document.createElement('div');
            div.style.width = minWidth + (item - 1) * addWidth + 'px';
            column.appendChild(div);
        });
    }
    if(columns['c1'].length == 0 && columns['c2'].length ==0){
        setTimeout(()=>{
            alert('游戏胜利')
        },50)
    }
}
render();

// 移动汉诺塔
function handlerMove() {
    var btns = document.querySelectorAll('.btn');
    btns = [].slice.call(btns);
    btns.forEach(btn => {

        btn.onclick = function () {
            fromTo(this.dataset.form, this.dataset.to)
        }
    })
}
// 移动规则
function fromTo(from, to) {
    var fromLast = columns[from][columns[from].length - 1];
    var toLast = columns[to][columns[to].length - 1];
    if (columns[from].length === 0) return;
    else if (fromLast > toLast) return;
    else {
        columns[to].push(columns[from].pop());
        render();
    }
}
handlerMove()