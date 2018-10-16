var gulp = require('gulp');
var sass = require('gulp-sass');
var server = require('gulp-webserver');
var fs = require('fs');
var url = require('url');
var path = require('path');
var listJson = require('./mock/list.json');
var querystring = require('querystring');
console.log(listJson)
gulp.task('server', function() {
    return gulp.src('src')
        .pipe(server({
            port: 9090,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    res.end('');
                    return false;
                }
                if (pathname === '/api/list') {
                    res.end(JSON.stringify({ code: 1, data: listJson }))
                } else if (pathname === '/api/detail') {
                    var arr = [];
                    req.on('data', function(chunk) {
                        arr.push(chunk);
                    })
                    req.on('end', function() {
                        var params = querystring.parse(Buffer.concat(arr).toString());
                        // listJson.push(params);
                        // console.log(listJson);
                        var obj = {};
                        var title = params.title;
                        var content = params.content;
                        obj.title = title;
                        obj.content = content;
                        listJson.push(obj)
                        fs.writeFileSync('mock/list.json', JSON.stringify(listJson))
                        res.end(JSON.stringify({ code: 1, data: '发布成功' }));
                    })
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }))
})
gulp.task('devCss', function() {
    return gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/css'))
})
gulp.task('watch', function() {
    return gulp.watch('src/scss/*.scss', gulp.series('devCss'))
})
gulp.task('dev', gulp.series('devCss', 'server', 'watch'))