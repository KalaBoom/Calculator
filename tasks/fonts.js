const {src, dest} = require('gulp')

module.exports = function fonts() {
    return src('src/fonts/**/*')
        .pipe(dest('build/fonts'))
}