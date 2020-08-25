// 高斯模糊 body
// 旋转图片
// 歌曲信息
// 控制栏
(function($, root) {
    // 渲染背景图片和歌手图片
    function renderImage(src) {
        let img = new Image();
        img.src = src;
        img.onload = () => {
            $('.img-box img').attr('src', src);
            root.blurImg(img, $('body'));
        }
    }
    // 渲染歌手信息
    function renderInfo(data) {
        let str = ` <div class="singer-name">${data.singer}</div>
            <div class="sing-name">${data.song}</div>
            <div class="album">${data.album}</div>`;
        $('.song-info').html(str);
    }
    // 控制条收藏按钮是否显示
    function renderControl(isLike) {
        isLike ? $('.like').addClass('liking') : $('.like').removeClass('liking');
    }

    root.render = function(data) {
        renderImage(data.image);
        renderInfo(data);
        renderControl(data.isLike);
    }
})(window.Zepto, window.player || (window.player = {}));