class WishCard {
    constructor(config) {
        this.wishContent = config.wishContent;
        this.wrapper = config.wrapper;
        this.maxWidht = this.wrapper.clientWidth - 150;
        this.maxHeight = this.wrapper.clientHeight - 150;
        this.zIndex = 0;
        this.createCard()
    }
    _createEl(dom, className) {
        var dom = document.createElement(dom);
        dom.className = className;
        return dom;
    }
    createCard() {
        // 生产愿望卡片
        const divItem = this._createEl('div', 'item');
        const divWish = this._createEl('div', 'wish');
        const spanClose = this._createEl('span', 'close');
        // 加入许愿内容
        divWish.innerHTML = this.wishContent;
        spanClose.innerHTML = 'x';
        //随机背景颜色
        divItem.style.background = `rgb(${this.getRandom(150, 255)},${this.getRandom(150, 255)},${this.getRandom(150, 255)})`;
        // 随机愿望卡片位置
        divItem.style.left = this.getRandom(0, this.maxWidht) + 'px';
        divItem.style.top = this.getRandom(0, this.maxHeight) + 'px';
        // 每次生成的卡片都不会被覆盖
        divItem.style.zIndex = this.zIndex;
        this.zIndex++;
        // 绑定拖动事件和删除事件
        divItem.onmousedown = (e) => {
            let left = parseFloat(divItem.style.left);
            let x = e.pageX;
            let top = parseFloat(divItem.style.top);
            let y = e.pageY;
            window.onmousemove = (e) => {
                let newX = e.pageX;
                let newY = e.pageY;
                divItem.style.left = newX - x + left + 'px'
                divItem.style.top = newY - y + top + 'px'
            },
                window.onmouseup = () => {
                    window.onmousemove = null;
                }
        }
        spanClose.onclick = () => {
            divItem.remove();
        }
        // 添加愿望卡片到包裹层
        divItem.appendChild(divWish);
        divItem.appendChild(spanClose);
        this.wrapper.appendChild(divItem);
    }
    getRandom(max, min) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}