/**
 *  Gulp build
 */
 
"use strict";

var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var exec = require('child_process').exec;
var uglify = require('gulp-uglify');

var paths = {
        scss: 'scss/**/*.scss',
        scssdest: 'public/css',
        js: 'public/js/pagedekui.js',
        jsdest: 'public/js/dist' 
    };

/**
 * Tasks
 */

gulp.task('scss', function() {
    gulp.src(paths.scss)
        .pipe(sass())
        .pipe(gulp.dest(paths.scssdest));
});

gulp.task('uglify', function(){
    gulp.src(paths.js)
        .pipe(uglify())
        .pipe(gulp.dest(paths.jsdest));
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
    gulp.watch(paths.scss, ['scss']);
    gulp.watch(paths.js, ['uglify']);
});

gulp.task('default', ['watch']);