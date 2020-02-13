const gulp = require('gulp');
const browserSync = require('browser-sync').create();

const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const pug = require('gulp-pug');

gulp.task('css', () => {
    const plugins = [
        autoprefixer(),
        cssnano()
    ];

    return gulp.src('./src/*.css')
        .pipe(postcss(plugins))
        .pipe(gulp.dest('./dest'));
});

gulp.task('pug', () => {
    return gulp.src('./src/*pug')
        .pipe(pug())
        .pipe(gulp.dest('./dest'))
});

gulp.task('serve', gulp.series('css', 'pug'), () => {
    browserSync.init({
        server: {
            baseDir: './src'
        }
    });

    gulp.watch('src/css/*.css', ['css']);
    gulp.watch('src/views/.pug', ['pug']);
});

gulp.task('default', gulp.series('serve'));