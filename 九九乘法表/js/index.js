class Mul {
    constructor(options = {}) {
        const defaultOptions = {
            mulNum: 9,
            container: document.body,
            mulBaColor: '#fff',
            mulFtColor: '#000'
        };
        this.options = {
            ...defaultOptions,
            ...options
        };
        this.render();
    }

    _createE(tagName) {
            return document.createElement(tagName);
        }
        // 渲染乘法表
    render() {
        const options = this.options;
        const table = this._createE('table');
        const tbody = this._createE('tbody');
        let content = '';
        for (let i = 1; i <= options.mulNum; i++) {
            content += '<tr>';
            for (let j = 1; j <= i; j++) {
                content += `<td style="background-color:${options.mulBaColor};color:${options.mulFtColor}">${j}*${i}=${i*j}</td>`
            }
            content += '</tr>';
        }
        tbody.innerHTML = content;
        table.appendChild(tbody);
        this.options.container.appendChild(table);
    }
}