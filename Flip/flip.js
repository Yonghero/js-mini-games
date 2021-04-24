const createFlip = (() => {
    return (container,duration) => {
        // first last invent play
        /**
         * 记录每个容器内部的子元素的位置
         */
        function recordMap() {
            const map = new Map()
            for (let i = 0; i < container.children.length; i++) {
                const ele = container.children[i];
                const { left, top } = ele.getBoundingClientRect()
                map.set(ele, { left, top })
            }
            return map
        }
        // 元素起始位置
        const firstMap = recordMap()
        return {
            move() {
                const lastMap = recordMap()
                for (let i = 0; i < container.children.length; i++) {
                    const ele = container.children[i];
                    const prevDom = firstMap.get(ele)
                    const currentDom = lastMap.get(ele)
                    if (!prevDom) continue
                    const left = prevDom.left - currentDom.left
                    const top = prevDom.top - currentDom.top
                    if (left === 0 && top === 0) continue
                    ele.animate([{
                        transform: `translate(${left}px,${top}px)`
                    }, {
                        transform: ''
                    }], duration)
                }
            }
        }
    }
})()