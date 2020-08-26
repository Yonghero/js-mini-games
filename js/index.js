var selectYear = document.getElementById('selectYear');
var selectMonth = document.getElementById('selectMonth');
var calendarDays = document.getElementById('days');
/**
 * 动态渲染日历内容
 */
function renderArea() {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    renderSelect(year, month);
    renderContent(year, month);
}
/**
 * 渲染日历的内容
 */
function renderContent(year, month) {
    var curYear = new Date().getFullYear();
    var curMonth = new Date().getMonth() + 1;
    var curDay = new Date().getDate();
    calendarDays.innerHTML = '';
    // 获取该年该月的天数
    var days = new Date(year, month, 0).getDate();
    // 获取该月1号为周几
    var weekDay = new Date(year, month - 1, 1).getDay();
    for (let i = 2 - weekDay; i <= days; i++) {
        var span = document.createElement('span');
        if (i >= 1) {
            span.innerHTML = i;
        }
        if (curYear == year && curMonth == month && curDay === i) {
            span.className = 'active';
        }
        calendarDays.appendChild(span);
    }
}
/**
 * 根据当前年份 渲染下拉列表前后50年的选项
 * @param {*} year 
 * @param {*} month 
 */
function renderSelect(year, month) {
    // 渲染年份
    for (let i = year - 50; i < year + 50; i++) {
        let option = document.createElement('option');
        option.innerHTML = i;
        option.value = i;
        selectYear.appendChild(option);
    }
    selectYear.value = year;
    // 渲染月份
    for (let i = 1; i <= 12; i++) {
        let option = document.createElement('option');
        option.innerHTML = i;
        option.value = i;
        selectMonth.appendChild(option);
    }
    selectMonth.value = month;
    // 绑定事件 选择不同年份和月份 渲染不同的日期天数
    selectMonth.onchange = selectYear.onchange = function () {
        renderContent(selectYear.value, selectMonth.value);
    }
    // 回到今天
    selectToday.onclick = function(){
        selectYear.value = year;
        selectMonth.value = month;
        renderContent(year,month);
    }
}
renderArea();