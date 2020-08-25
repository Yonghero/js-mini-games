// 1. 游戏界面
// 2. 游戏玩法

import Puzzle from './ui.js'

// 配置拼图参数
const puzzle = new Puzzle({
    row: 3,
    col: 3,
    width: 500,
    height: 500,
    container: document.getElementById('game'),
    img: './img/lol.png'
})