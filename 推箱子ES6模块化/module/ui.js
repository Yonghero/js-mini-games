import * as map from './map.js';

const game = document.getElementById('game');
const mapRow = map.rowNumber;
const mapCol = map.colNumber;
const piectWidth = 45;
const pieceHeight = 45;

// 设置容器大小
function setGameContent() {
    game.style.width = mapCol * piectWidth + 'px';
    game.style.height = mapRow * pieceHeight + 'px';
}

// 设置内容区
function setContent() {
    game.innerHTML = '';
    // 读出每个小块类型然后绘制他
    for (let row = 0; row < mapRow; row++) {
        for (let col = 0; col < mapCol; col++) {
            setOnePiece(row, col);
        }
    }
};
// 绘制每一个小块的内容
function setOnePiece(row, col) {
    let div = document.createElement('div');
    let value = map.content[row][col];
    div.className = 'item';
    div.style.left = piectWidth * col + 'px';
    div.style.top = pieceHeight * row + 'px';
    // 是否为墙
    if (value === map.WALL) {
        div.classList.add('wall');
    } else if (value === map.PLAYER) {
        div.classList.add('player');
    }
    // 是否为箱子
    else if (value === map.BOX) {
        // 并且该位置是否为正确的箱子
        if (isCorrect(row, col)) {
            div.classList.add('correct-box');
        } else {
            // 否则为普通的箱子 还未放置到正确箱子的位置上 
            div.classList.add('box');
        }
    }
    // 是否为空白
    else {
        // 空白位置是否为可以正确放箱子的地方
        if (isCorrect(row, col)) {
            div.classList.add('correct');
        } else {
            // 否则单纯的就是空白
            return;
        }
    }
    game.appendChild(div);
}
// 判断该位置是否为正确的箱子
function isCorrect(row, col) {
    return map.correct.find((c) => { return c.row === row && c.col === col }) !== undefined;
}
export default function() {
    setGameContent();
    setContent();
}