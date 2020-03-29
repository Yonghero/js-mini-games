import * as map from './map.js'
// 给一个方向移动
function playMove(direction) {
    // 获取玩家当家的位置
    let playerPoint = getPlayerPoint();
    let nextPoint = getNextPoint(playerPoint.row, playerPoint.col, direction);
    // 下一个位置是否为墙
    if (nextPoint.value === map.WALL) {
        return false;
    }
    // 下一个位置是否为空白
    if (nextPoint.value === map.SPACE) {
        // 为空白 则交换位置
        exchange(playerPoint, nextPoint);
        return true;
    }
    // 下一个位置是否为盒子
    if (nextPoint.value === map.BOX) {
        // 如果要进行移动  还要判断该盒子的下一个位置是否可以移动
        let nextnextPoint = getNextPoint(nextPoint.row, nextPoint.col, direction);
        if (nextnextPoint.value === map.SPACE) {
            exchange(nextPoint, nextnextPoint);
            exchange(playerPoint, nextPoint);
            return true;
        } else {
            return false;
        }
    }
}
// map 里的位置进行交换
function exchange(point1, point2) {
    var temp = map.content[point1.row][point1.col];
    map.content[point1.row][point1.col] = map.content[point2.row][point2.col];
    map.content[point2.row][point2.col] = temp;
}
//  返回玩家位置
function getPlayerPoint() {
    for (let i = 0; i < map.rowNumber; i++) {
        for (let j = 0; j < map.colNumber; j++) {
            if (map.content[i][j] === map.PLAYER) {
                return {
                    row: i,
                    col: j,
                }
            }
        }
    }
    throw new Errow("游戏居然没有玩家！");
}
// 返回玩家要移动的下一个位置的信息
function getNextPoint(row, col, direction) {
    if (direction === "left") {
        return {
            row: row,
            col: col - 1,
            value: map.content[row][col - 1]
        }
    } else if (direction === "right") {
        return {
            row: row,
            col: col + 1,
            value: map.content[row][col + 1]
        }
    } else if (direction === "up") {
        return {
            row: row - 1,
            col: col,
            value: map.content[row - 1][col]
        }
    } else {
        return {
            row: row + 1,
            col: col,
            value: map.content[row + 1][col]
        }
    }
}
export function isWin() {
    for (let i = 0; i < map.correct.length; i++) {
        let p = map.correct[i];
        if (map.content[p.row][p.col] !== map.BOX) {
            return false;
        }
    }
    return true;
}
export default playMove;