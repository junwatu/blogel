/**
 *  Gulp build
 */
 
"use strict";

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    paths = {
        scss: 'scss/**/*.scss',
        scssdest: 'public/css'
    },
    exec = require('child_process').exec;

gulp.task('scss', function() {
    gulp.src(paths.scss)
        .pipe(sass())
        .pipe(gulp.dest(paths.scssdest));
});


gulp.task('server', function() {
    exec('supervisor pagedek.js', function(err, stdout, stderr) {
        if (err != null) console.log(stderr);
        console.log(stdout);
    });

    exec('google-chrome http://localhost:5555', function(err, stdout, stderr) {
    	if(err != null) console.log(stderr);
    	console.log(stdout);
    });
});

gulp.task('watch', function() {
    gulp.watch(paths.scss, ['scss'])
});

gulp.task('default', ['scss', 'server', 'watch']);