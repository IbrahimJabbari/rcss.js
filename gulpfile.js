var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglifyjs'),
	sequence = require('run-sequence');

gulp.task('default', function() {
	sequence('concat', 'uglify');
});

gulp.task('concat', function() {
	return gulp.src([
		'./src/RCSS.js',
		'./src/BlockContainer.js',
		'./src/Style.js',
		'./src/Query.js',
		'./src/Block.js'
	])
		.pipe(concat('rcss.js'))
		.pipe(gulp.dest('./build'))
});

gulp.task('uglify', function() {
	return gulp.src('./build/rcss.js')
		.pipe(uglify('rcss.min.js'))
		.pipe(gulp.dest('./build'))
});
