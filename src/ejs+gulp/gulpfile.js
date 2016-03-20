"use strict";

// 引用
var gulp = require("gulp");
var sass = require("gulp-sass");
var scsslint = require('gulp-scss-lint');
var cache = require('gulp-cached');
var cssnano = require("gulp-cssnano");
var uglify = require("gulp-uglify");
var eslint = require("gulp-eslint");
var babel = require('gulp-babel');
var sourcemaps = require("gulp-sourcemaps");
var del = require("del");
var changed = require("gulp-changed");
var merge = require("merge-stream");

var config = require('./src/common/config.js');

// 错误监听
var errorHandler = function (err) {
  console.error(err);
};

// 复制文件（包括第三方插件以及图片）
gulp.task("copy", function () {
  return merge(
    gulp.src([
      "bower_components/jquery/dist/jquery.min.js",
      "bower_components/es5-shim/es5-sham.min.js",
      "bower_components/es5-shim/es5-shim.min.js",
    ])
      .pipe(uglify())
      .pipe(gulp.dest("public/js/third")),

    gulp.src([
      "bower_components/normalize-css/normalize.css"
    ])
      .pipe(cssnano())
      .pipe(gulp.dest("public/css/third")),

    gulp.src("src/images/**/*")
      .pipe(gulp.dest("public/images"))
  );
});

// scss编译压缩
gulp.task("css", function () {
  return gulp.src("src/styles/**/*.scss")
    .pipe(changed("public/css"))
    .pipe(scsslint({
      'config': '.scss-lint.yml'
    }))
    //.pipe(sourcemaps.init())
    .pipe(sass().on("error", errorHandler))
    //.pipe(cssnano())
    //.pipe(sourcemaps.write("../maps"))
    .pipe(gulp.dest("public/css"));
});

// js编译压缩
gulp.task("js", function () {
  return gulp.src("src/scripts/**/*.js")
    .pipe(changed("public/js"))
    .pipe(eslint(
      {
        configFle: "./.eslintrc.js"
      }))
    .pipe(babel())
    .pipe(eslint.format())
    //.pipe(sourcemaps.init())
    //.pipe(uglify())
    //.pipe(sourcemaps.write("../maps"))
    .pipe(gulp.dest("public/js"));
});


// 清理文件
gulp.task("clean", function () {
  return del([
    'public'
  ]);
});

// 监听变动
gulp.task("watch", function () {
  gulp.watch(["src/styles/**/*.scss"], ["css"]);
  gulp.watch(["src/scripts/**/*.js"], ["js"]);
  gulp.watch(["src/images/**/*.*"], ["copy"]);
});

// 默认任务
gulp.task("default", ["copy", "css", "js"]);
