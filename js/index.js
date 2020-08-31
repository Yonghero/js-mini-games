let container = document.getElementById('divcontainer');
let curDiv; // 保留拖拽的课程 用于放入课程表中

container.ondragstart = (e) => {
    curDiv = e.target;

}
container.ondrop = (e) => {
    let dom = e.target;

    // 1.课程复制到课程表中
    console.log( !!dom.dataset.nomove );
    
    if (curDiv.parentNode.tagName === 'DIV' && dom.tagName === 'LI' && !dom.dataset.nomove) {
        let newDiv = curDiv.cloneNode(true);
        dom.appendChild(newDiv)
    }
    // 2.课程表中的课程移动到其它位置
    else if (e.target.parentNode.tagName === 'UL' && !dom.dataset.nomove) {
        dom.appendChild(curDiv);
    }
    else if (e.target.parentNode.tagName === 'DIV' && curDiv.parentNode.tagName === 'LI') {
        // 3.课程表中的课程移出课程表算是删除
        curDiv.remove();
    }

}
container.ondragover = (e) => {
    e.preventDefault();
    if( curDiv.parentNode.tagName === 'div') {
        e.dataTransfer.dropEffect = 'copy'
    }
    else if (curDiv.parentNode.tagName === 'LI') {
        e.dataTransfer.dropEffect = 'move';
    }
}