const 
    {series, parallel} = require('gulp')
    clean = require('./tasks/del'),
    styles = require('./tasks/styles')
    scripts = require('./tasks/scripts')
    pages = require('./tasks/pages')
    browser = require('./tasks/browser')
    fonts = require('./tasks/fonts')

const dev = parallel(pages, styles, scripts, fonts)
const build = series(clean, dev)

module.exports.dev = series(build, browser)
module.exports.build = build
module.exports.pages = pages