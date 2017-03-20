var gulp = require('gulp');
var transform = require('./transformTemplate');
gulp.task('default', function () {
    return gulp.src('../scripts/**/*.vue')
        .pipe(transform())
        .pipe(gulp.dest('../www/templates'));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VscGZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJndWxwZmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDM0IsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFFL0MsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7SUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUM7U0FDakMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztBQUM3QyxDQUFDLENBQUMsQ0FBQyJ9