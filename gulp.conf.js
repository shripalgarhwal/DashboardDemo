module.exports = function() {
    var clientApp = 'app/';
    var clientAppJs = clientApp + 'app-js/';
    var config = {
        'appPath': 'app/',
        'buildPath': 'build/',
        'testPath': 'test/',
        'appJs': clientAppJs,
        'css': {
            'src': clientApp + 'styles/style.css',
            'dist': clientApp + 'styles/'
        },
        'sass': {
            'src': 'app/styles/style.scss',
            'dist': 'app/styles'
        },
        'js': {
            'src': [
                clientApp + '**/*.module.js',
                clientApp + '**/*.js',
                '!' + clientApp + '**/*.spec.js'
            ],
            'dist': ''
        },
        'html': {
            'src': ['./app/*.html'],
            'dist': []
        },
        'index': clientApp + 'index.html',
        'client': 'app/',
        'build': './build/',
        'images': clientApp + 'images/**/*.*',
        'htmltemplates': clientAppJs + '**/*.html',
        'fonts': ['./bower_components/font-awesome/fonts/**/*.*'],
        'templateCache': {
            file: 'template.js',
            options: {
                module: 'app.core',
                standAlone: false,
                root: 'app/app-js'
            },
        },
        'lint': {
            'src': [
            'app/common/**/*.js',
            'app/components/**/*.js',
            'app/core/**/*.js',
            'app/app.js'],
            'dist': null
        },
        'bower': {
            json: require('./bower.json'),
            directory: './bower_components/',
            ignorePath: '../..'
        }
    };
    config.getWiredepDefaultOption = function() {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };
    return config;
};