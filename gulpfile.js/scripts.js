const { src, dest } = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const liveReload = require('gulp-livereload');
const plumber = require('gulp-plumber');
const babel = require('gulp-babel');
const paths = require('./paths');

function scriptsTask() {
    return src(paths.default.scriptsPath)
        .pipe(plumber(function (err) {
            console.log('scripts task error');
            console.log(err);
            this.emit('end');
        }))
        // .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(uglify())
        .pipe(concat('scripts.js'))
        // .pipe(sourcemaps.write())
        .pipe(dest(paths.default.distPath))
        .pipe(liveReload());
}

exports.default = scriptsTask;