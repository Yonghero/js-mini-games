var gulp = require('gulp');
var { series, src, dest } = require('gulp');
var { watch } = require('gulp');
var htmlClean = require('gulp-htmlclean');
var debug = require('gulp-strip-debug');
var postCss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cleanCss = require('gulp-clean-css');
var less = require('gulp-less');
var uglify = require('gulp-imagemin');
// 开启服务器
var connect = require('gulp-connect');
// 判断环境
var pathMod = process.env.NODE_ENV == 'development';
// export NODE_ENV=development 设置环境变量

var folder = {
    src: 'src/',
    dist: 'dist/',
};

function html(cb) {
    let page = src(folder.src + 'html/*')
        .pipe(connect.reload())
    if (!pathMod) {
        page.pipe(htmlClean())
    }
    page.pipe(dest(folder.dist + 'html/'));
    return page;
    cb();
}

function css(cb) {
    let page = src(folder.src + 'css/*')
        .pipe(less())
        .pipe(postCss([autoprefixer()]))
        .pipe(connect.reload())
    if (!pathMod) {
        page.pipe(cleanCss())
    }
    page.pipe(dest(folder.dist + 'css/'));
    return page;
    cb();
}

function js(cb) {
    let page = src(folder.src + 'js/*')
        .pipe(connect.reload())
    if (!pathMod) {
        page.pipe(debug())
    }
    page.pipe(dest(folder.dist + 'js/'));
    return page;
    cb();
}

function image(cb) {
    return src(folder.src + 'image/*')
        .pipe(dest(folder.dist + 'image/'))
    cb();
}

function server(cb) {
    return connect.server({
        port: 8888,
        // 发生更改时刷新
        livereload: true
    })
    cb();
}
watch([folder.src + 'html/*', folder.src + 'css/*', folder.src + 'js/*', folder.src + 'image/*'], series(html, css, js, image));

exports.default = series(html, css, js, image, server);



// gulp.task('html', function(cb) {
//     gulp.src(folder.src + 'html/*')
//         .pipe(gulp.dest(folder.dist + 'html/'))
//     cb();
// })

// gulp.task('default', series(['html']));