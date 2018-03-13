var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync').create();

/*１、LESS编译　压缩 合并（一般没有必要，预处理css都可以导包）*/
gulp.task('style', function () {
    //执行style任务时自动执行
    gulp.src('src/styles/*.less')
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulp.dest('dist/styles/'))
        .pipe(browserSync.reload({
            stream: true
        }));

});

/*２、JS合并、压缩、混淆*/
gulp.task('script', function () {
    gulp.src('src/scripts/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

/*３、img复制*/
gulp.task('image', function () {
    gulp.src('src/images/*.*')
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

/*４、html压缩*/
gulp.task('html', function () {
    gulp.src('src/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: ['dist']
        },
    }, function(err, bs) {
        console.log(bs.options.getIn(["urls", "local"]));
    });
    gulp.watch('src/styles/*.less', ['style']);
    gulp.watch('src/scripts/*.js', ['script']);
    gulp.watch('src/images/*.*', ['image']);
    gulp.watch('src/*.html', ['html']);

});

