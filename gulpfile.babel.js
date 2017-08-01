import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import path from 'path';
import del from 'del';
import runSequence from 'run-sequence';

const plugins = gulpLoadPlugins();
const buildPath = './dist/Srvc';

const paths = {
  js: ['./**/*.js', `!${buildPath}/**`, '!node_modules/**', '!coverage/**'],
  nonJs: ['./package.json', './.gitignore', './run_srvc.sh'],
  tests: './server/tests/*.js',
  sslcertificatespath: './sslcertificate/**',
  executepath: './execute/**',
};

// Clean up dist and coverage directory
gulp.task('clean', () =>
  del([`${buildPath}/**`,
    'coverage/**',
    `!${buildPath}`,
    '!coverage'],
  {
    force: true,
  } // eslint-disable-line
) // eslint-disable-line
);

// Copy execute files to dist
gulp.task('copyexecute', () =>
  gulp.src(paths.executepath)
    .pipe(gulp.dest(`${buildPath}/execute`))  // eslint-disable-line
);

// Copy non-js files to dist
gulp.task('copy', ['copysslcertificates', 'copyexecute'], () =>
  gulp.src(paths.nonJs)
    .pipe(plugins.newer(`${buildPath}`))
    .pipe(gulp.dest(`${buildPath}`))  // eslint-disable-line
);

// Copy non-js files to dist
gulp.task('copysslcertificates', () =>
  gulp.src(paths.sslcertificatespath)
    .pipe(gulp.dest(`${buildPath}/sslcertificate`)) // eslint-disable-line
);

// Compile ES6 to ES5 and copy to dist
gulp.task('babel', () =>
  gulp.src([...paths.js, '!gulpfile.babel.js'], { base: '.' })
    .pipe(plugins.newer(`${buildPath}`))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.babel())
    .pipe(plugins.sourcemaps.write('.', {
      includeContent: false,
      sourceRoot(file) {
        return path.relative(file.path, __dirname);
      },
    }))
    .pipe(gulp.dest(`${buildPath}`))  // eslint-disable-line
);

// default task: clean dist, compile js files and copy non-js files.
gulp.task('default', ['clean'], () => {
  runSequence(
    ['copy', 'babel'] // eslint-disable-line
  );
});
