var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('browser-sync', ['build'], _ => {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('sass', _ => {
  return gulp.src('./sass/*.scss')
      .pipe(sass({ includePaths: ['./sass/includes']}).on('error', sass.logError))
      // .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
      .pipe(gulp.dest('css'))
      .pipe(browserSync.stream());
});

gulp.task('watch', _ => {
  gulp.watch(['./sass/*.scss', './sass/includes/*.scss'], ['sass']);
  // gulp.watch([
  //   'src/*.js'
  // ], ['jekyll-rebuild']);
});

gulp.task('build', ['sass']);

gulp.task('default', ['browser-sync', 'watch']);
