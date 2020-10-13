const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();

//compile scss into css

function style() {
  //1. where is my scss file
  return (
    gulp
      .src("./scss/**/*.scss")
      //2. pass that file through sass compiler
      .pipe(sass().on("error", sass.logError))
      .pipe(autoprefixer())
      //3. where do i save the compiled css?
      .pipe(gulp.dest("./css"))
      //4. stream changes to all browser
      .pipe(browserSync.stream())
  );
}

function watch() {
  browserSync.init({
    //notify:false,
    server: {
      baseDir: "./",
    },
  });
  gulp.watch("./scss/**/*.scss", style);
  gulp.watch("./*.html").on("change", browserSync.reload);
  gulp.watch("./js/**/*.js").on("change", browserSync.reload);
}

//module.exports.style = style;
module.exports.default = watch;
