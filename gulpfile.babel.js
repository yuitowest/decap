import del from "del";
import electronConnect from "electron-connect";
import gulp from "gulp";
import runSequence from "run-sequence";
import buffer from "vinyl-buffer";
import plugins from "gulp-load-plugins";

let $ = plugins();


const DEBUG = process.env.NODE_ENV !== "production";
const SRC_DIR = "src/";
const DIST_DIR = "dist/";

gulp.task("dist", callback => {
  return runSequence.use(gulp)(
      "clean",
      "copy",
      ["compile:js", "compile:html"],
      callback
      );
});

gulp.task("clean", () => {
  return del([
    DIST_DIR + "**/*"
  ]);
});

gulp.task("copy", () => {
  let target = [
    SRC_DIR + "css/**/*",
    SRC_DIR + "fonts/**/*",
    SRC_DIR + "images/**/*"
  ];
  return gulp.src(target, { base: SRC_DIR })
    .pipe(gulp.dest(DIST_DIR));
});

gulp.task("compile:html", () => {
  return gulp.src([SRC_DIR + "*.html"])
    .pipe($.if(!DEBUG, $.useref()))
    .pipe(gulp.dest(DIST_DIR));
});

let watching = false;
gulp.task("enable-watch-mode", () => {
  watching = true;
});

gulp.task("compile:main", () => {
  gulp.src(SRC_DIR + "main.js")
    .pipe($.plumber())
    .pipe($.babel())
    .pipe($.if(DEBUG, $.uglify({ compress: true })))
    .pipe(gulp.dest(DIST_DIR));
});

gulp.task("compile:js", $.watchify((watchify) => {
  ["index.js"].forEach((f) => {
    gulp.src(SRC_DIR + f)
      .pipe($.plumber())
      .pipe(watchify({
        watch: watching,
        debug: DEBUG,
        transform: ["babelify", "envify"]
      }))
      .pipe(buffer())
      .pipe($.sourcemaps.init({ loadMaps: true }))
      .pipe($.if(DEBUG, $.uglify({ compress: true })))
      .pipe($.if(DEBUG, $.sourcemaps.write()))
      .pipe(gulp.dest(DIST_DIR));
  });
}));

gulp.task("watchify",
  ["enable-watch-mode", "compile:js", "compile:main", "copy", "compile:html"]);

gulp.task("watch", ["watchify"], function () {
  gulp.watch(SRC_DIR + "**/*.html", ["copy", "compile:html"]);
  gulp.watch(SRC_DIR + "**/*.css", ["copy"]);
});

gulp.task("server", ["watch"], () => {
  let electronServer = electronConnect.server.create();
  electronServer.start();
  gulp.watch([
    DIST_DIR + "**/*.html",
    DIST_DIR + "**/*.js"
  ], electronServer.reload);
});

gulp.task("eslint", () => {
  return gulp.src([SRC_DIR + "**/*.js"])
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
});
