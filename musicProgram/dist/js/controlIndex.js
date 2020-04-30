(function($, root) {

    function ContorlIndex(len) {
        this.len = len;
        this.curIndex = 0;
    }
    ContorlIndex.prototype = {
        prev() {
            this.curIndex--;
            this.curIndex = (this.curIndex + len) % len
            console.log(this.curIndex);
            return this.curIndex;
        },
        next() {
            this.curIndex++;
            this.curIndex = (this.curIndex + len) % len
            return this.curIndex;
        }
    }
    root.ContorlIndex = ContorlIndex;
})(window.Zepto, window.player || (window.player = {}))