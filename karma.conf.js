// Karma configuration
// Generated on Tue Dec 22 2015 13:28:09 GMT+0530 (India Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        'bower_components/jquery/dist/jquery.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-route/angular-route.js',
        'bower_components/angular-loader/angular-loader.js',        
        'bower_components/angular-ui-router/release/angular-ui-router.js',
        'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        'bower_components/angular-mocks/angular-mocks.js',
        'app/app-js/**/*.module.js',
        'app/app-js/**/*.js',
        'tests/app-js/**/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'app/app-js/**/*.js': ['coverage']
    },
    // all reporter configuration
    coverageReporter: {
        reporters: [
        {'type': 'html', 'dir': 'reports/coverage'},
        {'type': 'cobertura', 'dir': 'reports/jenkins'}]
    },

    htmlAngularReport: {
        outputFile: 'angularReport.html',
        reportFolder: 'reports/angularReport',
        reportTitle: 'Unit test assignment'

    },

    jenkinsReporter: {
        outputFile: 'reports/jenkins/test-results.xml'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['html', 'progress', 'coverage', 'jenkins'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', 'PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultanous
    concurrency: Infinity,
    jsonFixturesPreprocessor: {
        variableName: '__json__'
    },
    plugins: [
        'karma-jasmine',
        'karma-html-reporter',
        'karma-coverage',
        'karma-jenkins-reporter',
        'karma-chrome-launcher',
        'karma-phantomjs-launcher'
    ]
  });
};
