// 1. 游戏界面
export default class Puzzle {
    constructor({ row, col, width, height, container, img } = {}) {
        this.row = row;
        this.col = col;
        this.width = width;
        this.height = height;
        this.container = container;
        this.img = img;
        this.setContainer();
        this.setContent();
        this.emptyBlock;

    };

    /**
     * 设置拼图容器大小
     */
    setContainer() {
        this.container.style.width = this.width + 'px';
        this.container.style.height = this.height + 'px';
        this.container.style.border = `2px solid #000`;
        this.container.style.position = 'relative';
    };
    /**
     * 设置拼图内容
     */
    setContent() {
        let correctArr = this.getContentPosition();
        let points = [...correctArr];
        let changeArr = this.setRandomPosition(points);
        for (let j = 0; j < this.row * this.col; j++) {
            this.setOnePiece(changeArr[j].row, changeArr[j].col, correctArr[j].row, correctArr[j].col, j < this.row * this.col - 1);
        }
    };

    /**
     * 设置小方块的位置
     */
    getContentPosition() {
        let divArr = [];
        for (let row = 0; row < this.row; row++) {
            for (let col = 0; col < this.col; col++) {
                divArr.push({
                    row,
                    col
                })
            }
        }
        return divArr;
    };
    /**
     *  将小方块的位置打乱
     */
    setRandomPosition(arr) {
        const newArr = arr.sort(function() {
            return Math.random() - 0.5;
        });
        return newArr;
    };
    /**
     * 绘制一个方块格 
     * @param (crow,ccol) 打乱顺序后的位置
     * @param (nrow,ncol) 正确位置的顺序
     */
    setOnePiece(crow, ccol, nrow, ncol, isappend) {
        let lock = false;
        let div = this._createE('div');
        // 保存小方块的大小
        let divWidth = this.width / this.col;
        let divHeight = this.height / this.row;
        div.correctX = divWidth * ncol + 'px';;
        div.correctY = divHeight * nrow + 'px';
        div.style.position = 'absolute';
        div.style.width = divWidth + 'px';
        div.style.height = divHeight + 'px';
        // 设置小方块的位置
        div.style.left = divWidth * ccol + 'px';
        div.style.top = divHeight * crow + 'px';
        div.style.boxSizing = `border-box`;
        div.style.border = `1px solid red`;
        div.style.backgroundImage = `url(${this.img})`;
        div.style.backgroundPosition = `-${divWidth * nrow}px -${divHeight * ncol}px`;
        div.style.transition = 'all .5s';
        // 每个小方块绑定事件
        let self = this;
        div.onclick = function() {

            if (self.isWin()) {
                self.lock = true;
                setTimeout(function() {
                    alert('游戏结束')
                }, 3000);
            }
            if (!self.lock) {

                let xdis = Math.abs(parseFloat(this.style.left) - parseFloat(self.emptyBlock.style.left));
                xdis = Math.floor(parseFloat(xdis));
                console.log(xdis);
                let ydis = Math.abs(parseFloat(this.style.top) - parseFloat(self.emptyBlock.style.top));
                ydis = Math.floor(parseFloat(ydis));
                console.log(ydis);
                console.log(parseFloat(divWidth));
                if (xdis + ydis !== Math.floor(parseInt(divWidth)) && xdis + ydis !== Math.floor(parseInt(divHeight))) {
                    return;
                }

                let x = this.style.left;
                let y = this.style.top;
                console.log(self.emptyBlock);
                this.style.left = self.emptyBlock.style.left;
                this.style.top = self.emptyBlock.style.top;
                self.emptyBlock.style.left = x;
                self.emptyBlock.style.top = y;
            }

        }
        if (isappend) {
            this.container.append(div);
        } else {
            this.emptyBlock = div;
        }
    };
    _createE(tagName) {
        return document.createElement(tagName);
    }
    isWin() {
        for (let i = 0; i < this.container.children.length; i++) {
            let dom = this.container.children[i];
            if (dom.style.left === dom.correctX && dom.style.top === dom.correctY) {
                return true;
            }
        }
        return false;
    }
}