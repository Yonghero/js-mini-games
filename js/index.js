let container = document.getElementById('container');
let imgArr = []; // 生成图片数组
for (let i = 1; i < 16; i++) {
    imgArr.push(`img/${i}.jpg`);
}
let config = {
    imgWidth: 220, // 每一张图片定宽
}
/**
 * 根据配置创建图片元素
 */
function renderImg() {
    imgArr.forEach((item, i) => {
        let img = document.createElement('img');
        img.src = item;
        img.style.position = 'absolute';
        img.style.width = config.imgWidth + 'px';
        img.onload = setImgPosition;
        img.style.transition = ".5s";
        container.appendChild(img);
    })
}
/**
 * 设置图片的坐标位置
 */
function setImgPosition() {
    let info = getImgInfo();
    let colArr = new Array(info.colNumber);
    colArr.fill(0);
    for (let i = 0; i < container.children.length; i++) {
        let img = container.children[i];
        let min = Math.min(...colArr);
        img.style.top = min + 'px';
        // 计算图片所在的是第几列
        let col = colArr.indexOf(min);
        let left = (col + 1) * info.gap + col * config.imgWidth;
        img.style.left = left + 'px';
        // 更新数组
        colArr[col] += img.height + info.gap;
    }
    container.style.height = Math.max(...colArr) + 'px';
}
/**
 * 获取图片的相关信息
 */
function getImgInfo() {
    let containerWidth = container.clientWidth;
    let colNumber = Math.floor(containerWidth / config.imgWidth); // 图片列数
    let leftSpace = containerWidth - colNumber * config.imgWidth; // 剩余空间
    let gap = leftSpace / (colNumber + 1); // 空隙大小
    return {
        colNumber,
        gap
    }
}
let timer;
window.onresize = ()=>{
    clearTimeout(timer);
    setTimeout(setImgPosition,300);
}
renderImg();