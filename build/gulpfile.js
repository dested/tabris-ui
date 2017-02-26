var gulp = require('gulp');
var transform = require('./transformTemplate');

gulp.task('default', () => {
    return gulp.src('../scripts/**/*.vue')
        .pipe(transform())
        .pipe(gulp.dest('../www/templates'));
});