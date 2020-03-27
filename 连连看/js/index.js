class LinkGame {
    constructor(options = {}) {
            const defaultOptions = {
                rows: 6,
                cols: 6,
                container: document.body,
                difficult: 1
            }
            this.options = {
                ...defaultOptions,
                ...options
            };
            this.render();
            //小方块的移动位置变换
            this.TowardEnum = { NONE: null, UP: { row: -1, col: 0 }, RIGHT: { row: 0, col: 1 }, DOWN: { row: 1, col: 0 }, LEFT: { row: 0, col: -1 } };
        }
        // 根据行数列数成对生成小方块  
        // 每一对的小方块都有相同的数字标记
        // 小方块的种数类型 重复生成需要的行列小方块
        // 小方块的方向判定 需要最外层多一层行和列 空格子才可以走
    _createE(tagName) {
        return document.createElement(tagName);
    }

    render() {
        let chooseOne = null;
        let chooseTwo = null;
        const options = this.options;
        options.container.style.width = 86 * options.cols + 'px';
        options.container.style.height = 78 * options.rows + 'px';

        // 生成一个二维数组 用于存放小方块
        const squraeSet = new Array(options.rows + 2);
        for (let i = 0; i < squraeSet.length; i++) {
            squraeSet[i] = new Array(options.cols + 2);
        }

        // 获取每对小方块的数字标记数组
        let temp = this.createNumFlag();

        // 生成小方块
        for (let i = 1; i <= options.rows; i++) {
            for (let j = 1; j <= options.cols; j++) {
                let div = this.createSquare(temp.pop(), i, j);
                squraeSet[i][j] = div;
                let self = this;
                div.onclick = function() {
                    // 页面加载时 第一次进行入判断 chooseOne为空 所以将当前点击的小方块赋值给chooseOne 
                    // 第二次再点击时 chooseOne不为空 看另外一半的判断 当前点击的小方块的num如果不能等于前一次点击的小方块的num 
                    // 证明两个不是一对 chooseOne又再次重新被赋值为当前小方块 知道两次点击的num值为相等 进入else 给chooseTwo赋值
                    if (chooseOne == null || chooseOne.num != this.num) {
                        chooseOne = this;

                    } else {
                        chooseTwo = this;
                        // 如果条件满足 就消除两个小方块
                        // 如果两次都点同一个 那可不行 所以前半个判断的作用是防止两次都点同一个

                        if (chooseOne != chooseTwo && self.checkLine(chooseOne.row, chooseOne.col, 0, self.TowardEnum.NONE, [], squraeSet, chooseTwo, chooseOne)) {
                            self.clearSquare(chooseOne.row, chooseOne.col, squraeSet);
                            self.clearSquare(chooseTwo.row, chooseTwo.col, squraeSet);
                        }
                        // 条件不满足 就清空 重来
                        chooseOne = null;
                        chooseTwo = null;
                    }
                    self.addStyle(chooseOne, chooseTwo, squraeSet);
                }
            }
        }
    };
    // 小方块开始进行移动 chooseOne 一步一步移动到 chooseTwo 所以重复移动 用递归
    checkLine(row, col, changeTimes, nowToward, path, squareSet, chooseTwo, chooseOne) {


        if (this.isExist(row, col, squareSet) && squareSet[row][col] == chooseTwo && changeTimes <= 3) {
            return true;
        }
        if (this.isExist(row, col, squareSet) && squareSet[row][col] != chooseOne ||
            changeTimes > 3 ||
            row < 0 || col < 0 || row >= squareSet.length || col >= squareSet[0].length ||
            path.indexOf(this.getLocaiton(row, col)) > -1) {
            path.pop();
            return false;
        };
        return this.checkLine(row - 1, col, nowToward == this.TowardEnum.UP ? changeTimes : changeTimes + 1, this.TowardEnum.UP, path, squareSet, chooseTwo, chooseOne) //up
            ||
            this.checkLine(row, col + 1, nowToward == this.TowardEnum.RIGHT ? changeTimes : changeTimes + 1, this.TowardEnum.RIGHT, path, squareSet, chooseTwo, chooseOne) //right
            ||
            this.checkLine(row + 1, col, nowToward == this.TowardEnum.DOWN ? changeTimes : changeTimes + 1, this.TowardEnum.DOWN, path, squareSet, chooseTwo, chooseOne) //right
            ||
            this.checkLine(row, col - 1, nowToward == this.TowardEnum.LEFT ? changeTimes : changeTimes + 1, this.TowardEnum.LEFT, path, squareSet, chooseTwo, chooseOne); //right;
    };
    getLocaiton(row, col) {
            return "" + row + "," + col;
        }
        // 小方块是否存在
    isExist(row, col, squareSet) {
        console.log(row, col);
        if (row > 0 && row < squareSet.length && col > 0 && col < squareSet[0].length && squareSet[row] && squareSet[row][col]) {
            return true;
        }
        return false;
    };
    // 清除小方块
    clearSquare(row, col, squareSet) {
        this.options.container.removeChild(squareSet[row][col]);
        squareSet[row][col] = null;
    };
    // 点击的小方块会变色！
    addStyle(chooseOne, chooseTwo, squareSet) {
        // chooseOne.style.opacity = '0.5';
        for (let i = 0; i < squareSet.length; i++) {
            for (let j = 0; j < squareSet[i].length; j++) {
                if (squareSet[i][j] && squareSet[i][j] == chooseOne) {
                    squareSet[i][j].style.opacity = '0.5';
                } else if (squareSet[i][j]) {
                    squareSet[i][j].style.opacity = '1';
                }

            }
        }
    }

    //创建小方块
    createSquare(num, row, col) {
        const div = this._createE('div');
        div.className = 'square';
        div.style.backgroundImage = `url("./img/${num}.png")`;
        div.num = num;
        div.row = row;
        div.col = col;
        div.style.left = 86 * col + 'px';
        div.style.top = 76 * row + 'px';
        this.options.container.appendChild(div);
        return div;

    };
    // 创建小方块的数字标记 同时对应着图片的路径
    createNumFlag() {
        const temp = [];
        const options = this.options;
        for (let i = 0; i < options.rows * options.cols / 2; i++) {
            let num = Math.floor(Math.random() * this._diffLevel());
            // 小方块成对出现 所以push两个 代表两个小方块的num是一样的
            temp.push(num);
            temp.push(num);
        }
        temp.sort(function() { return Math.random() - 0.5 });
        return temp;
    };
    // 困难等级判定 连连看的种数设置
    _diffLevel() {
        let types = 0;
        if (this.options.difficult == 1) {
            types = 10;
        } else if (this.options.difficult == 2) {
            types = 20;
        } else if (this.options.difficult == 3) {
            types = 29;
        }
        return types;
    }
}