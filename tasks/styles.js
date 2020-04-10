const 
    {src, dest} = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    shorthand = require('gulp-shorthand'),
    sourcemaps = require('gulp-sourcemaps'),
    rename =  require('gulp-rename'),
    plumber = require('gulp-plumber')

module.exports = function styles() {
    return src('src/styles/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(shorthand())
        .pipe(cleanCSS({
            debug: true,
            compatibility: '*',
            level: 2
        }, details => {
            console.log(`${details.name}: Original:${details.stats.originalSize} - Min:${details.stats.minifiedSize}`)
        }))
        .pipe(sourcemaps.write())
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('build/css'))
}