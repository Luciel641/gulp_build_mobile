/**
 * Created by Administrator on 2018/2/9.
 */
var gulp = require('gulp');
var concat = require('gulp-concat'); //合并css、js文件
var fileinclude = require('gulp-file-include'); //合并html文件
var replace = require('gulp-replace'); //文本替换
var runSequence=require('run-sequence'); //同步执行任务

// 合并拼接html
gulp.task('fileInclude',function () {
    return gulp.src(['page/*.html'])
        .pipe(fileinclude({
            prefix:'@@',
            basepath:'temp'
        }))
        .pipe(gulp.dest('../'));
});

// 替换资源引用路径
gulp.task('replace', function () {
    return gulp.src(['../*.html'])
        .pipe(replace('../../', ''))
        .pipe(gulp.dest('../'));
});

// 同步执行任务
gulp.task('runSequence',function () {
    runSequence('fileInclude','replace');
});

// 默认任务
gulp.task('default', function () {
    // 监听文件改动（监听的文件，执行的任务）
    var watcher = gulp.watch(['page/*.html','temp/*.html'], ['runSequence']);
    // 文件改动时执行
    watcher.on('change', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ',running tasks');
    });
});