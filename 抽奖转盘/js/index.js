class Roulette {
    constructor(options = {}) {
            // 默认配置
            const defaultOptions = {
                container: document.body,
                rotateNum: 8,
            }
            this.options = {
                ...defaultOptions,
                ...options
            }
            this.createPanAndBtn();
        }
        // 创建元素
    _createE(tagName) {
        return document.createElement(tagName);
    };
    // 随机度数
    get rotateDeg() {
        return Math.floor(Math.random() * 360);
    };

    // 给轮盘按钮绑定旋转事件
    event(pan, rotateBtn) {

        let lock = true;
        rotateBtn.onclick = () => {
            if (lock) {
                lock = false;
                let deg = this.rotateDeg;
                this.deg = deg;
                console.log(this);
                let degs = deg + 360 * this.options.rotateNum;

                pan.style.transform = `rotate(${degs}deg)`;
                pan.style.transition = 'all 5s';

            }
        }
        pan.addEventListener('webkitTransitionEnd', () => {
            pan.style.transform = `rotate(${this.deg}deg)`;
            pan.style.transition = 'none';
            lock = true;
            console.log(this.deg);
            //开奖
            this.lottery(this.deg);
        });
    };
    // 得到度数 开奖
    lottery(deg) {
        var str = '';
        if (deg < 45 && deg > 0) {
            //二等奖
            str = '二等奖'
        } else if (deg > 90 && deg < 135 || deg > 270 && deg < 315) {
            //三等奖
            str = '三等奖'
        } else if (deg > 45 && deg < 90 || deg > 135 && deg < 180 || deg > 225 && deg < 270 || deg > 315 && deg < 360) {
            //四等奖
            str = '四等奖'
        } else if (deg > 180 && deg < 225) {
            str = '一等奖'
                //一等奖
        }

        alert('大吉大利 恭喜获得' + str + '!')

    };
    // 创建转盘
    createPanAndBtn() {
        // 创建轮盘和按钮
        const pan = this._createE('div');
        const rotateBtn = this._createE('div');
        const panImg = this._createE('img');
        const rotateBtnImg = this._createE('img');
        panImg.src = '/公益课直播项目/抽奖转盘/img/pan.png';
        rotateBtnImg.src = '/公益课直播项目/抽奖转盘/img/btn.png';
        pan.appendChild(panImg);
        rotateBtn.appendChild(rotateBtnImg);
        pan.setAttribute('id', 'pan');
        rotateBtn.setAttribute('id', 'btn');
        this.options.container.appendChild(pan);
        this.options.container.appendChild(rotateBtn);
        // 调用旋转事件
        this.event(pan, rotateBtn);

    }
}