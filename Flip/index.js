const ITEMNUMS = 100
const container = $('.container')
/**
 * 通过一个CSS选择器返回DOM
 * @param {*} css 
 */
function $(css) {
    return document.querySelector(css)
}

/**
 * 生成100个元素
 */
function init() {
    while (container.children.length < ITEMNUMS) {
        container.appendChild(createItem(container.children.length))
    }
}
/**
 * 创建一个div
 * @param {} content 文本内容
 */
function createItem(content) {
    const divItem = document.createElement('div')
    divItem.className = 'item'
    divItem.innerText = content
    return divItem
}
/**
 * 获取(min - max) 之间的一个随机数
 */
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}
/**
 * 添加一个元素
 */
function add() {
    const index = getRandom(0, 100)
    const flip = createFlip(container,1000)
    const domList = Array.from(container.children)
    const originDom = domList.find((dom, i) => i === index)
    const newDom = createItem(container.children.length)
    newDom.animate([{
        opacity: 0,
        backgroundColor: '#000'
    }, {
        opacity: 1,
        backgroundColor: '#fff'
    }], 500)
    container.insertBefore(newDom, originDom)
    flip.move()
    console.log('add');
}


/**
 * 随机排列
 */
function random() {
  
    for (let i = 0; i < container.children.length; i++) {
        const flip = createFlip(container,1000)
        const currentItem = container.children[i]
        const randomIndex = getRandom(0, container.children.length)
        if (randomIndex === i) continue
        const randomItem = container.children[randomIndex]
        const randomNextItem = randomItem.nextElementSibling

        container.insertBefore(randomItem, currentItem)
        container.insertBefore(currentItem, randomNextItem)

        flip.move()
    }
}

$('.add').onclick = add
$('.random').onclick = random




init()