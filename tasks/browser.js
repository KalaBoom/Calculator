const
    {watch, series, src} = require('gulp')
    styles = require('./styles')
    scripts = require('./scripts')
    pages = require('./pages')    
    server = require('browser-sync').create()

module.exports = function browser(cb) {
    server.init({
        server: 'build', // папка
        notify: false,
        open: true,
        cors: true
    })

    watch('src/styles/**/*.scss', series(styles, cb => src('build/css').pipe(server.stream()).on('end', cb)))
    watch('src/scripts/**/*.js', series(scripts)).on('change', server.reload)
    watch('src/pages/**/*.html', series(pages))
    watch('build/*.html').on('change', server.reload)
    return cb()
}