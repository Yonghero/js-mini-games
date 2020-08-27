/**
 * @param {*} scrollTop 滚动条滚动到的目标点
 * @param {*} options   滚动所需要的一些配置参数
 */
function scroll(scrollTop, options = {}) {
    // 合并配置
    let finalOptions = {
        dom: document.documentElement, // 需要滚动的容器
        duration: 1000,  // 滚动完成的总时间
        tick: 16, // 滚动一次的时间
        onStart: undefined, // 滚动开始前需要做的事情
        onEnd: undefined,// 滚动完成后需要做的事情
        ...options
    }

    let { dom, duration, tick, onStart, onEnd } = finalOptions;
    /**
     * 开始移动滚动条
     */
    // function scrollMove() {
    //     return new Promise((resolve, reject) => {
    //         if (dom.isScrolling) return;
    //         if (onStart) { onStart(resolve); }
    //         else { resolve() }
    //     }).then(() => {
    //         let timer = null;
    //         clearInterval(timer);

    //         let total = scrollTop - dom.scrollTop; // 需要移动的总距离
    //         let times = Math.ceil(duration / tick); // 需要移动的次数
    //         let dis = total / times;   // 每次移动多少距离 ：（目标 - 当前）/总共需要移动多少次 
    //         let count = 0;
    //         timer = setInterval(() => {
    //             dom.scrollTop += dis;
    //             count++;
    //             if (count === times) {
    //                 clearInterval(timer);
    //                 if (onEnd) onEnd();
    //                 else return;
    //                 dom.isScrolling = false;
    //             }
    //         }, tick);
    //     })
    // }
    async function scrollMove() {
        if (dom.isScrolling) return;
        if (onStart) { await onStart(); }
        else { resolve() }
        let timer = null;
        clearInterval(timer);
        let total = scrollTop - dom.scrollTop; // 需要移动的总距离
        let times = Math.ceil(duration / tick); // 需要移动的次数
        let dis = total / times;   // 每次移动多少距离 ：（目标 - 当前）/总共需要移动多少次 
        let count = 0;
        timer = setInterval(() => {
            dom.scrollTop += dis;
            count++;
            if (count === times) {
                clearInterval(timer);
                if (onEnd) onEnd();
                else return;
                dom.isScrolling = false;
            }
        }, tick);
    }
    scrollMove()

}