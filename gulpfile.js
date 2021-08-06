var gulp = require('gulp');
// Requires the gulp-sass plugin
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var pug = require('gulp-pug');
var runSequence = require('run-sequence');
var open = require('gulp-open');


gulp.task('pug', function() {
  return gulp.src('src/files/**/*.pug') // Gets all files ending with .scss in app/scss
    .pipe(pug({
      pretty: true
   }))
    .pipe(gulp.dest('public'))
    .pipe(browserSync.reload({
      stream: true
    }))
});


gulp.task('sass', function() {
    return gulp.src('src/scss/**/*.scss') // Gets all files ending with .scss in app/scss
      .pipe(sass())
      .pipe(gulp.dest('public/css'))
      .pipe(browserSync.reload({
        stream: true
      }))
  });

// Browser sync to refresh the browser whenever a file is changed
gulp.task('browserSync', function() {
    browserSync.init({
      server: {
        baseDir: 'public',
        open: "http://google.com"
      }
    })
  });



// Watch function to check for any changes

gulp.task('run',gulp.parallel('browserSync', gulp.series('sass','pug')));

gulp.task('watch', function(){
    gulp.watch('src/scss/*.scss',gulp.series('sass')),
    gulp.watch('src/files/**/*.pug', gulp.series('pug'));
});

gulp.task('default', gulp.parallel('watch', 'run'));