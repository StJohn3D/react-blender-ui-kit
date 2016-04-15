'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect'); //Runs a local dev server
var open = require('gulp-open'); //Open a URL in a web browser
var browserify = require('browserify'); // Bundles JS
var reactify = require('reactify');  // Transforms React JSX to JS
var source = require('vinyl-source-stream'); // Use conventional text streams with Gulp
var concat = require('gulp-concat'); //Concatenates files
var lint = require('gulp-eslint'); //Lint JS files, including JSX

var config = {
	port      : 9005,
	devBaseUrl: 'http://localhost',
	paths     : {
		html  : './src/*.html',
		js    : './src/**/*.js',
		images: './src/images/*',
		css   : [
			'node_modules/bootstrap/dist/css/bootstrap.min.css',
			'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
			'node_modules/toastr/toastr.css',
			'src/components/**/*.css'
		],
		dist  : './dist',
		mainJs: './src/main.js',
		timber: [
			'../timber-ui/lib/*',
			'../timber-ui/lib/stores/*',
			'../timber-ui/lib/constants/*',
			'../timber-ui/lib/actions/*',
			'../timber-ui/timber.js'
		]
	}
}

//Start a local development server
gulp.task('connect', function() {
	connect.server({
		root      : [ 'dist' ],
		port      : config.port,
		base      : config.devBaseUrl,
		livereload: true
	});
});

gulp.task('open', [ 'connect' ], function() {
	gulp.src('dist/index.html')
		.pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/' }));
});

gulp.task('html', function() {
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());
});

gulp.task('js', function() {
	browserify(config.paths.mainJs)
		.transform(reactify)
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload());
});

gulp.task('css', function() {
	gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('images', function() {
	gulp.src(config.paths.images)
		.pipe(gulp.dest(config.paths.dist + '/images'))
		.pipe(connect.reload());
});

gulp.task('lint', function() {
	return gulp.src(config.paths.js)
		// .pipe(lint({ config: '.eslintrc' }))
		// .pipe(lint({ useEslintrc: true }))
		// SJ: 	eslinting is working fine in my IDE
		// 		But both of the above lines result in the same error
		// 		gulp-eslint is having trouble finding the plugin
		.pipe(lint.format());
});

gulp.task('watch', function() {
	gulp.watch(config.paths.html, [ 'html' ]);
	gulp.watch(config.paths.js, [ 'js', 'lint' ]);
	gulp.watch(config.paths.timber, [ 'js', 'lint' ]);
});

gulp.task('default', [ 'html', 'js', 'css', 'images', 'lint', 'open', 'watch' ]);