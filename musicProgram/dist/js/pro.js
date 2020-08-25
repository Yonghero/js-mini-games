// 处理进度条 
(function($, root) {
    // 进度条对象
    function Pro(duration) {
        this.duration = duration;
        this.renderAllTime();
        this.frameId = null;
        this.lastPre = 0;
        this.preTime = 0;
    }
    Pro.prototype = {
            // 渲染歌曲总时间
            renderAllTime() {
                let allTime = this.formatTime(this.duration);
                $('.all-time').html(allTime);
            },
            // 启动时间
            start(p) {
                this.lastPre = p === undefined ? this.lastPre : p;
                cancelAnimationFrame(this.frameId);
                var startTime = new Date().getTime();
                var self = this;

                function frame() {

                    var moveTime = new Date().getTime();
                    var pre = self.lastPre + (moveTime - startTime) / ((self.duration) * 1000);
                    self.preTime = pre;

                    if (pre < 1) {
                        self.update(pre);
                    } else {
                        cancelAnimationFrame(self.frameId);
                    }
                    self.frameId = requestAnimationFrame(frame);
                }
                frame();
            },
            // 停止时间
            stop(p) {
                cancelAnimationFrame(this.frameId);
                // 同一首歌暂停的情况下 先保存当期的百分比
                this.lastPre = this.preTime;
                // 通过p 判断是否已经切换下一首歌 
                if (p === 0) {
                    $('.cur-time').html("00:00");
                    $('.pro-top').css('transform', 'translateX(-100%)');
                }
            },
            // 更新时间和进度条
            update(pre) {
                var currTime = this.formatTime(pre * this.duration);
                $('.cur-time').html(currTime);
                var preX = (pre - 1) * 100 + '%';
                $('.pro-top').css('transform', 'translateX(' + preX + ')');

            },
            // 格式化时间格式
            formatTime(duration) {
                var duration = Math.round(duration);
                var minute = Math.floor(duration / 60);
                let second = duration % 60;

                minute >= 10 ? minute = minute : minute = '0' + minute;
                second >= 10 ? second = second : second = '0' + second;

                return minute + ':' + second;
            }
        }
        //

    root.pro = Pro;
})(window.Zepto, window.player || (window.player = {}))