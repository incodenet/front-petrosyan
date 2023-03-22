"use strict";
// open url http://localhost:9000/index.html

const gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    livereload = require('gulp-livereload'),
    concat = require("gulp-concat"),
    rename = require('gulp-rename'),
    del = require('del'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    iconfont = require('gulp-iconfont'),
    iconfontCss = require('gulp-iconfont-css'),
    fileinclude = require('gulp-file-include'),
    sassUnicode = require('gulp-sass-unicode');

const path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        icons: 'build/icons/',
        fonts: 'build/fonts/',
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/*.js',
        style: 'src/scss/**/*.scss',
        img: 'src/img/**/*.*',
        icons: 'src/icons/*.svg',
        fonts: 'src/fonts/**/*.*',
        template: 'src/template/**/*.html'
    },
    watch: {
        html: 'src/*.html',
        js: 'src/js/**/*.js',
        style: 'src/scss/**/*.scss',
        img: 'src/img/**/*.*',
        icons: 'src/icons/*.svg',
        fonts: 'src/fonts/**/*.*',
        template: 'src/template/**/*.html'
    },
    clean: 'build/**'
};

const runTimestamp = Math.round(Date.now()/1000);

function html() {
    return gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(fileinclude())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream:true}));
}

function style() {
    return gulp.src(path.src.style)
        // .pipe(sourcemaps.init())
        .pipe(sass({
            sourceMap: true,
            errLogToConsole: true
        }))
        .pipe(prefixer('last 2 versions'))
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min'
        }))
        // .pipe(sourcemaps.write())
        // .pipe(concat('app.min.css'))
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream:true}));
}

function javascript() {
    return gulp.src(path.src.js)
        .pipe(rigger())
        // .pipe(sourcemaps.init())
        .pipe(uglify())
        // .pipe(sourcemaps.write())
        .pipe(rename({suffix: '.min'}))
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream:true}));
}

function jsConcat() {
    return gulp.src(['src/js/_components/*.js', 'src/js/_modules/*.js', 'src/js/main.js'])
        .pipe(rigger())
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream:true}));
}

function font() {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
        .pipe(reload({stream:true}));
}

function image() {
    return gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream:true}));
}

function template() {
    return gulp.src(path.src.template)
        .pipe(rigger())
        .pipe(fileinclude())
        .pipe(reload({stream:true}));
}

function browsersync(done) {
    browserSync.init({
        server: {
            baseDir: './build',
            startPath: "/index.html",
        },
        port: 9000,
        open: true,
        tunnel: true,
        livereload: true,
        logPrefix: "Frontender"
    });
    done();
}

function browserSyncReload(done) {
    browserSync.reload();
    done();
}

function clean() {
    return del(path.clean);
}

function watchFiles() {
    watch(path.watch.style, style);
    watch(path.watch.js, javascript);
    watch(path.watch.js, jsConcat);
    watch(path.watch.img, image);
    watch(path.watch.fonts, font);
    watch(path.watch.html, html);
    watch(path.watch.template, html);
}

const build = gulp.series(clean, gulp.parallel(style, javascript, jsConcat, image, font, html, template));
const watchRun = gulp.parallel(build, watchFiles, browsersync);

// export tasks
exports.style = style;
exports.javascript = javascript;
exports.jsConcat = jsConcat;
exports.html = html;
exports.image = image;
exports.template = template;
exports.clean = clean;

exports.build = build;
exports.watch = watchRun;
exports.default = watchRun;