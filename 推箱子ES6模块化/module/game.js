import play, { isWin } from './play.js'
import showUI from './ui.js';
showUI()
let over = false

window.onkeydown = function(e) {
    if (over) {
        return false;
    }
    let result = false;
    console.log(e.key);
    if (e.key == 'ArrowUp') {
        result = play("up");
    } else if (e.key == 'ArrowDown') {
        result = play('down');
    } else if (e.key == 'ArrowLeft') {
        result = play('left');
    } else if (e.key == 'ArrowRight') {
        result = play('right');
    }

    if (result) {
        showUI();
        if (isWin()) {
            console.log('游戏胜利');
            over = true;
        }
    }
}