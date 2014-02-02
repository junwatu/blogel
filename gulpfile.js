/**
*  Gulp build
*/
var gulp = require('gulp'),
	gutil = require('gulp-util'),
	sass = require('gulp-sass'),
	paths = {
		scss: 'scss/**/*.scss',
		scssdest: 'public/css'
	};

gulp.task('scss', function(){
	gulp.src(paths.scss)
		.pipe(sass())
		.pipe(gulp.dest(paths.scssdest));
});

gulp.task('watch', function(){
	gulp.watch(paths.scss, ['scss'])
})

gulp.task('default',['scss', 'watch']);
