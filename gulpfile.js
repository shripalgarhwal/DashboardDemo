(function() {
	'use strict';
	var gulp = require('gulp'),
	$ = require('gulp-load-plugins')({'lazy': true}),
	del = require('del'),
	connect = require('gulp-connect'),
	concat = require('gulp-concat'),
	browserify = require('browserify'),
	babelify = require('babelify'),
	source = require('vinyl-source-stream'),
	config = require('./gulp.conf')();
	// gulp task to run development server
	gulp.task('server', function() {
		connect.server({
			root: '',
			livereload: true,
			port: 9000
		});
	});

	// gulp task for run destination server
	gulp.task('buildconnect', function() {
		connect.server({
			root: config.buildPath,
			livereload: true,
			port: 9080
		});
	});

	// creating AngularJs $templateCache
	gulp.task('templatecache', function() {
		var files = config.appJs + config.templateCache.file;
		del(files);
		return gulp.src(config.htmltemplates)
		.pipe($.minifyHtml({empty: true}))
		.pipe($.angularTemplatecache(
			config.templateCache.file,
			config.templateCache.options
			))
		.pipe(gulp.dest(config.appJs));
	});

	// browser reload gulp task
	gulp.task('html', function() {
		gulp.src(config.html.src)
		.pipe(connect.reload());
	});

	// gulp task for convert sass files into css
	gulp.task('styles', ['clean-styles'], function () {
		gulp.src(config.sass.src)
		.pipe($.sass({outputStyle: 'compressed'}))
		.pipe(gulp.dest(config.css.dist));
	});
	//.pipe($.autoprefixer({'browsers': ['last 2 version', '> 5%']}))

	gulp.task('clean-styles', function() {
		var files = config.css.src;
		del(files);
	});
	// gulp task for concatenate and minifying .js files
	/*gulp.task('scripts', function() {
		gulp.src(config.js.src)
		.pipe(concat('main.js'))
		.pipe($.rename({suffix: '.min'}))
		.pipe($.uglify())
		.pipe(gulp.dest(config.js.dist));
	});*/

	// gulp task for concate all lib .js files which are in head tag
	/*gulp.task('headerlibs', function() {
		gulp.src([
			'bower_components/html5-boilerplate/dist/js/vendor/modernizr-2.8.3.min.js'])
		.pipe(concat('headerlibs.js'))
		.pipe(rename({suffix: '.min'}))
        .pipe(uglify())
		.pipe(gulp.dest('app/js-min'));
	});*/

	// gulp task for concate all lib .js files
	/*gulp.task('libs', function() {
		gulp.src(config.libs.src)
		.pipe(concat('lib.js'))
		.pipe(rename({suffix: '.min'}))
        .pipe(uglify())
		.pipe(gulp.dest(config.libs.dist));
	});*/
	//gulp task list
	gulp.task('help', $.tasklisting);

	// gulp task for copying fonts in build folder
	gulp.task('fonts', ['clean-fonts'], function() {
		return gulp.src(config.fonts)
		.pipe(gulp.dest(config.build + 'fonts'));
	});
	gulp.task('clean-fonts', function() {
		var files = config.build + 'fonts/**/*.*';
		del(files);
	});

	// gulp task for copying fonts in build folder
	gulp.task('images', ['clean-images'], function() {
		return gulp.src(config.images)
		.pipe($.imagemin({optimizationLevel: 4}))
		.pipe(gulp.dest(config.build + 'images'));
	});
	gulp.task('clean-images', function() {
		var files = config.build + 'images/**/*.*';
		del(files);
	});

	// gulp task watch to changes
	gulp.task('watch', function() {		
		gulp.watch(config.sass.src, ['styles']);
		gulp.watch(config.htmltemplates, ['templatecache']);
	});

	// gulp task to check lint errors
	gulp.task('lint', function() {
		return gulp.src(config.js.src)
		.pipe($.jshint())
		.pipe($.jshint.reporter('default'));
	});

	//
	gulp.task('wiredep', function() {
		//log('Wireup the bower css, js and app js into the html');
		var options = config.getWiredepDefaultOption();
		var wiredep = require('wiredep').stream;
		return gulp
		.src(config.index)
		.pipe(wiredep(options))
		.pipe($.inject(gulp.src(config.js.src)))
		.pipe(gulp.dest(config.client));
	});
	//gulp.task('inject', ['templatecache', 'wiredep', 'styles'], function(){
	gulp.task('inject', ['templatecache', 'wiredep'], function(){
		//log('Wireup the app css into the html, and call wiredep');
		return gulp
		.src(config.index)
		.pipe($.inject(gulp.src(config.css.src)))
		.pipe(gulp.dest(config.client));
	});

	// optimizing the javascript, css, html
	gulp.task('optimize', ['inject'], function() {
		var assets = $.useref({searchPath: './'});
		//var templateCache = config.templateCache;
		var templateCache = config.appJs + 'template.js';
		var cssFilter = $.filter('**/*.css', { restore: true });
		var jsLibFilter = $.filter('**/lib.js', { restore: true });
		var jsAppFilter = $.filter('**/app.js', { restore: true });


		return gulp.src(config.index)
		.pipe($.plumber())
		.pipe($.inject(gulp.src(templateCache, {read: false}), {
			relative: '<!-- inject:templates:js -->'
		}))
		//.pipe(assets)
		.pipe(cssFilter)
		.pipe($.csso())
		.pipe(cssFilter.restore)
		//.pipe(assets)
		.pipe(jsLibFilter)
		.pipe($.uglify())
		.pipe(jsLibFilter.restore)
		.pipe(jsAppFilter)
		.pipe($.uglify())
		.pipe(jsAppFilter.restore)
		//.pipe(assets.restore())
		.pipe(assets)
		//.pipe($.useref({searchPath: './'}))
		.pipe(gulp.dest(config.build));
	});

	//gulp.task('gulptask', ['sass', 'headerlibs', 'libs', 'scripts', 'watch', 'connect']);

	// gulp project build task
	/*gulp.task('build', function() {
		gulp.src('app/index.html')
		.pipe($.gulpsourcemap.init())
		.pipe($.gulpsourcemap.write())
		.pipe(gulp.dest('dist'));
		gulp.src('app/css/app.css')
		.pipe($.gulpsourcemap.init())
		.pipe($.gulpsourcemap.write())
		.pipe(gulp.dest('dist/css'));
		gulp.src('app/json/*.json')
		.pipe($.gulpsourcemap.init())
		.pipe($.gulpsourcemap.write())
		.pipe(gulp.dest('dist/json'));
		gulp.src('app/view/home/*.html')
		.pipe($.gulpsourcemap.init())
		.pipe($.gulpsourcemap.write())
		.pipe(gulp.dest('dist/view/home'));
		gulp.src('app/view/login/*.html')
		.pipe($.gulpsourcemap.init())
		.pipe($.gulpsourcemap.write())
		.pipe(gulp.dest('dist/view/login'));
		gulp.src([
			'app/js-min/headerlibs.min.js',
			'app/js-min/lib.min.js',
			'app/js-min/main.min.js'])
		.pipe($.gulpsourcemap.init())
		.pipe($.gulpsourcemap.write())
		.pipe(gulp.dest('dist/js-min'));
	});*/
	/*function log(msg) {
		if(typeof(msg) === 'object') {
			for(var item in msg) {
				if(msg.hasOwnProperty(item)) {
					$.util.log($.util.colors.blue(msg[item]));
				}
			}
		} else {
			$.util.log($.util.colors.blue(msg));
		}
	}*/

	
	// ES 2015 gulp task
	// gulp task to run development server
	gulp.task('connectes6app', function() {
		connect.server({
			root: 'es6App/',
			livereload: true,
			port: 9000
		});
	});

	gulp.task('transpilejs', function() {
		browserify('./es6App/es6js/app.js')
		.transform(babelify)
		.bundle()
		.pipe(source('main.js'))
		.pipe(gulp.dest('es6App/es5-min-js'))
		.pipe(connect.reload());
	});
	gulp.task('es6gulptask', ['transpilejs', 'connectes6app']);
})();