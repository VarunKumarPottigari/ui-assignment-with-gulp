const { src, dest } = require('gulp');
const liveReload = require('gulp-livereload');
const concat = require('gulp-concat');
const minifyCss = require('gulp-minify-css');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const paths = require('./paths');

function stylesTask() {
    return src(['styles/styles.css', 'styles/navbar.css', 'styles/content.css', 'styles/card.css', 'styles/footer.css'])
        .pipe(plumber(function (err) {
            console.log('styles task error');
            console.log(err);
            this.emit('end');
        }))
        // .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie 8']
        }))
        .pipe(concat('styles.css'))
        .pipe(minifyCss())          
        // .pipe(sourcemaps.write())
        .pipe(dest(paths.default.distPath))
        .pipe(liveReload());
}

exports.default = stylesTask;