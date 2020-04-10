const
    {src, dest} = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    terser = require('gulp-terser'),
    babel = require('gulp-babel')

module.exports = function scripts() {
    return src('src/scripts/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(terser())
        .pipe(sourcemaps.write())
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('build/scripts'))
}