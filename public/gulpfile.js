var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate')
var gulpUtil = require('gulp-util');
var cleanCSS = require('gulp-clean-css');

// path
var bowerPath = 'bower_components/';
var appPath = 'app/';
var cssPath = 'css/';

// array of vendor scripts
var vendorScripts = [
    bowerPath + 'angular/angular.min.js',
    bowerPath + 'angular-bootstrap/ui-bootstrap-tpls.min.js',
    bowerPath + 'angular-cookies/angular-cookies.min.js',
    bowerPath + 'angular-encode-uri/dist/angular-encode-uri.min.js',
    bowerPath + 'angular-route/angular-route.min.js',
    bowerPath + 'angular-sanitize/angular-sanitize.min.js',
    bowerPath + 'angular-toastr/dist/angular-toastr.min.js',
    bowerPath + 'angular-toastr/dist/angular-toastr.tpls.min.js',
    bowerPath + 'angular-ymaps/angular-ymaps.js',
    bowerPath + 'angular-bootstrap/ui-bootstrap-tpls.js',
    bowerPath + 'jquery/dist/jquery.min.js',
    bowerPath + 'bootstrap/dist/js/bootstrap.min.js'
];

// array of application scripts
var appScripts = [
    appPath + 'app.js',
    appPath + 'functions/objectToParams.js',
    appPath + 'functions/objectEncode.js',
    appPath + 'services/global.js',
    appPath + 'services/YandexSearch.js',
    appPath + 'services/suggestion.js',
    appPath + 'filters/limittodots.js',
    appPath + 'directives/autofocus.js',
    appPath + 'controllers/*.js',
];

// array of CSS files
var cssList = [
    bowerPath + 'bootstrap/dist/css/bootstrap.min.css',
    bowerPath + 'angular-toastr/dist/angular-toastr.min.css',
    cssPath + '*.css'
];

gulp.task('vendor', function() {
    return gulp.src(vendorScripts)
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app'));

});

gulp.task('app', function() {
    return gulp.src(appScripts)
        .pipe(concat('app.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify().on('error', gulpUtil.log))
        .pipe(gulp.dest('app'));
});

gulp.task('minify-css', function() {
    return gulp.src(cssList)
        .pipe(cleanCSS())
        .pipe(gulp.dest('css/dist'));
});

gulp.task('scripts', ['vendor', 'app', 'minify-css'], function () {
    gulp.src(cssPath + 'dist/*.css')
        .pipe(concat('gogo.min.css'))
        .pipe(gulp.dest(cssPath));

    return gulp.src(['app/vendor.min.js', 'app/app.min.js'])
        .pipe(concat('gogo.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app'));
});