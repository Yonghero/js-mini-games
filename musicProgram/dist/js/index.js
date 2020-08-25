var root = window.player;
var datalist;
var len;
var index = 0;
var audioManager = root.audioManager;
var contorlIndex;
var timer;
var Pro = root.pro;
var proObj;

function getData(url) {
    $.ajax({
        type: 'GET',
        url: url,
        success(data) {
            datalist = data;
            len = data.length;
            controlIndex = new root.ContorlIndex(len);
            proObj = new Pro(datalist[index].duration);
            bindEvent();
            // 页面第一次打开时 加载第一首歌
            $('body').trigger('play:change', 0);
            console.log(data);
        },
        error() {
            console.log('error');
        }
    })
}
// 绑定事件
function bindEvent() {
    // 注册自定义事件 用于切换歌曲时使用
    $('body').on('play:change', function(e, index) {
        // 开启进度条功能
        proObj = new Pro(datalist[index].duration);
        // 渲染页面内容
        root.render(datalist[index]);
        // 加载音乐
        audioManager.getAudio(datalist[index].audio);
        $('.img-box').attr('data-deg', 0);
        $('.img-box').css({
            transform: 'rotateZ(' + 0 + 'deg)',
            transition: 'none'
        })
        if (audioManager.status == 'play') {
            audioManager.play();
            proObj.start(0);
            rotateImg(0);
        } else {
            audioManager.pause();
            clearInterval(timer);
        }
    });
    // 上一首
    $('.prev').on('click', function() {
        index = controlIndex.prev();
        // 切歌时  把上一首的歌曲先停止 并将当前时间归0
        proObj.stop(0);
        $('body').trigger('play:change', index);
    });
    // 下一首
    $('.next').on('click', function() {
        index = controlIndex.next();
        proObj.stop(0);

        $('body').trigger('play:change', index);
    });
    // 播放
    $('.play').on('click', function() {
        if (audioManager.status == 'pause') {
            audioManager.play();
            var deg = $('.img-box').attr('data-deg') || 0;
            rotateImg(deg);
            // 开始播放时 启动时间累加
            proObj.start();
        } else {
            audioManager.pause();
            proObj.stop();
            clearInterval(timer);
        }
        $('.play').toggleClass('playing');
    });
};

function bindTouch() {
    var offset = $('.pro-bottom').offset();
    var left = offset.left;
    var width = offset.width;
    console.log(offset);

    $('.spot').on('touchstart', function() {
        proObj.stop();
    }).on('touchmove', function(ev) {
        var x = ev.changedTouches[0].clientX;
        console.log(x);
        var pre = (x - left) / width;
        if (pre > 0 && pre <= 1) {
            // 更新位置
            proObj.update(pre);
        }
    }).on('touchend', function(ev) {
        var x = ev.changedTouches[0].clientX;
        var pre = (x - left) / width;
        console.log(pre);
        if (pre > 0 && pre < 1) {
            var currentTime = pre * datalist[index].duration;
            audioManager.playTo(currentTime);
            audioManager.status = 'play';
            audioManager.muted = true;
            audioManager.play();
            $('.play').addClass('playing');
            proObj.start(pre);
        }
    })
}
// 歌曲播放时 旋转歌手图片
function rotateImg(deg) {
    clearInterval(timer);
    deg = parseInt(deg);
    timer = setInterval(() => {
        deg += 2;
        $('.img-box').attr('data-deg', deg);
        $('.img-box').css({
            transform: 'rotateZ(' + deg + 'deg)',
            transition: 'transform 0.2s linear'
        })
    }, 200);
}

getData('/dist/mock/data.json');
bindTouch();