<template>
  <div class="wrap">
    <div class="date-pick-header">
      <div class="pick-operator" ref="operator" @click="handelOperator">
        <div class="btn prev-year" />
        <div class="btn prev-month"></div>
        <span style="user-select: none;">{{ this.showObj.year }}年{{ this.showObj.month + 1 }}月</span>
        <div class="btn next-month"></div>
        <div class="btn next-year"></div>
      </div>
      <div class="pick-weeks">
        <span>日</span>
        <span>一</span>
        <span>二</span>
        <span>三</span>
        <span>四</span>
        <span>五</span>
        <span>六</span>
      </div>
    </div>
    <div class="date-pick-content">
      <div
        v-for="(item, index) in dateList"
        @click="emitDate(item.date, index)"
        :key="index"
        :class="{
          invalid: item.invalid,
          today: item.isToday,
          current: item.isSelect,
        }"
      >
        {{ item.value }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showObj: {
        year: "",
        month: "",
        week: "",
        day: "",
      },
      dateList: [{ value: "1", invalid: false, isToday: true, isSelect: true }],
    };
  },
  created() {
    this.setShowDate(new Date());
  },
  methods: {
    /**
     * 日历核心计算方法
     */
    _setDate() {
      const { year, month, day } = this.showObj;
      const DayOfMilliseconds = 86400000; // 一天毫秒数
      const _Date = []; // 需要渲染到界面上的日期对象集合
      const FirstWeek = new Date(year, month); // 本月第一周
      const start =
        FirstWeek.getTime() - DayOfMilliseconds * FirstWeek.getDay();
      for (let i = 0; i < 42; i++) {
        _Date.push(new Date(start + i * DayOfMilliseconds));
      }
      this.dateList = _Date.map((date) => {
        const _day = date.getDate();
        const _month = date.getMonth()
        return {
          value: _day,
          invalid: date.getMonth() !== month,
          isToday: _day === day && _month === month,
          isSelect: _day === day && _month === month,
          date,
        };
      });
    },
    emitDate(date, index) {
      console.log(date);
      this.dateList.forEach((date, dateIndex) => {
        if (index === dateIndex) {
          date.isSelect = true;
        } else {
          date.isSelect = false;
        }
      });
    },
    handelOperator(e) {
      const originDom = e.target;
      const classList = Array.from(originDom.classList);
      const { year, month } = this.showObj;
      let reYear = year,reMonth = month

      if (classList.includes("prev-month")) {
        reMonth -= 1
      }

      if (classList.includes("prev-year")) {
        reYear -= 1
      }

      if (classList.includes("next-month")) {
        reMonth += 1
      }

      if (classList.includes("next-year")) {
        reYear += 1
      }
      this.setShowDate(new Date(reYear, reMonth));
      this._setDate()

    },
    setShowDate(date) {
      const today = new Date(date);
      this.showObj = {
        year: today.getFullYear(),
        month: today.getMonth(),
        week: today.getDay(),
        day: today.getDate(),
      };
    },
  },
  mounted() {
    this._setDate();
  },
};
</script>

<style>
.wrap {
  width: 400px;
  height: 400px;
  color: #606266;
  border: 1px solid #e4e7ed;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  background: #fff;
  border-radius: 4px;
  line-height: 30px;
  margin: auto;
}
.date-pick-header {
  width: 100%;
  height: 100px;
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
}
.date-pick-content {
  width: 100%;
  height: 300px;
}
.btn {
  width: 30px;
  height: 30px;
  line-height: 30px;
  display: inline-block;
  vertical-align: middle;
  margin: 5px;
  cursor: pointer;
}
.pick-operator {
  height: 30px;
  line-height: 30px;
  text-align: center;
}
.prev-year {
  background: url("./arrow.webp");
  background-size: 100% 100%;
  transform: rotate(180deg);
}
.prev-month {
  height: 25px;
  width: 25px;
  background: url("./arrow.webp");
  background-size: 100% 100%;
  transform: rotate(180deg);
}

.prev-year {
  background: url("./arrow.webp");
  background-size: 100% 100%;
  transform: rotate(180deg);
}
.next-month {
  height: 25px;
  width: 25px;
  background: url("./arrow.webp");
  background-size: 100% 100%;
}

.next-year {
  background: url("./arrow.webp");
  background-size: 100% 100%;
}

.pick-weeks {
  width: 100%;
  height: 70px;
  line-height: 70px;
  text-align: center;
  display: flex;
}
.pick-weeks span {
  display: inline-block;
  padding: 5px;
  width: 45px;
}
.date-pick-content {
  text-align: center;
  color: #c0c4cc;
}
.date-pick-content div {
  display: inline-block;
  padding: 5px;
  width: 45px;
  height: 40px;
  line-height: 40px;
  border-radius: 50%;
  user-select: none;
  cursor: pointer;
  color: darkblue;
}
.date-pick-content div.invalid {
  color: #c0c4cc;
}
.date-pick-content div.current {
  color: #fff !important;
  background-color: #409eff;
}
.date-pick-content div.today {
  color: #409eff;
}
</style>