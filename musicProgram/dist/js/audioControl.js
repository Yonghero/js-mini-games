(function($, root) {

    function AudioManager() {
        // 创建音频对象
        this.audio = new Audio();
        // 音频初始状态
        this.status = 'pause';
    }
    AudioManager.prototype = {
        // 开始播放
        play() {
            this.audio.play();
            this.status = 'play';
        },
        // 暂停播放
        pause() {
            this.audio.pause();
            this.status = 'pause';
        },
        // 加载音频文件
        getAudio(src) {
            this.audio.src = src;
            this.audio.load();
        },
        playTo(time) {
            this.audio.currentTime = time;
        }
    }
    root.audioManager = new AudioManager();

})(window.Zepto, window.player || (window.player = {}))