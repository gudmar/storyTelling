/// Probably index.html cannot be dest to the same folder that source exists
// !! Run sequence cannot be nested!! It cannot call a task already runnuing sun Sequence



const {watch, dest} = require('gulp')
const gulp = require('gulp');

const inline = require('gulp-inline')

gulp.task('make', function() {
    return gulp.src('./index.html')
    .pipe(inline(
        {
            base: './',
        }
    ))
    .pipe(gulp.dest('./Destination'))
})

