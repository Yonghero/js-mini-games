let img = document.getElementById('img');
/**
 * 点击图片回到顶部
 */
function clickMove() {
    img.onclick = function () {
        scroll(0, {
            onStart: function (resolve) {
                img.isScrolling = true;
                img.style.transform = 'scale(0.8,1.25)'; 
                let handler = () => {                    
                    img.removeEventListener('transitionend', handler);
                    img.style.bottom = '120%';
                    resolve();
                }
                img.addEventListener('transitionend', handler)
            },
            onEnd: function () {
                img.style.transition = 'none';
                img.style.bottom = -40 + 'px';
                setTimeout(() => {
                    img.style.transition = 'all .5s';
                    img.style.transform = 'scale(1)';
                    img.style.bottom = 40 + 'px';
                }, 5)

            }
        });

    }
}
clickMove();