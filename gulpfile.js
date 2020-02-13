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

    return gulp.src('./src/**/.css')
        .pipe(postcss(plugins))
        .pipe(gulp.dest('./dest'))
});

gulp.task('pug', () => {
    return gulp.src('./src/**/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('./dest'));
});

gulp.task('filesWatch', (done) => {
    browserSync.reload('./dest/**/*.html');
    done();
});

gulp.task('serve', gulp.series('pug', 'css', () => {
    browserSync.init({
        server: './dest/views/',
        port: 3000,
    });

    gulp.watch('src/css/**/*.css', gulp.series('css'));
    gulp.watch('src/views/**/*.pug', gulp.series('pug'));
    gulp.watch('./dest/**/*').on('change', browserSync.reload);
}));

gulp.task('default', gulp.series('serve'));