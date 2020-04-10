const
    {src, dest} = require('gulp'),
    validator = require('gulp-w3c-html-validator'),
    plumber = require('gulp-plumber')

module.exports = function pages() {
    return src('src/pages/*.html')
        .pipe(plumber())
        .pipe(validator())
        .pipe(dest('build'))
}