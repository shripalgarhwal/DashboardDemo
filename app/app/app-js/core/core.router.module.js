(function () {
    'use strict';
    var $urlRouterProviderRef = null;
    var $stateProviderRef = null;
    var core = angular.module('app.core', [
        'ui.router',
        'ui.bootstrap',
        'highcharts-ng',
        'treeGrid'
        ]);
    core.config(configure);
    configure.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
    /* @ngInject */
    function configure($locationProvider, $stateProvider, $urlRouterProvider) {
        $urlRouterProviderRef = $urlRouterProvider;
        $stateProviderRef = $stateProvider;
        $locationProvider.html5Mode({
          enabled: false,
          requireBase: false
        });
        $urlRouterProviderRef.otherwise('/');
    }
    /* run phase */
    core.run(runRouter);
    runRouter.$inject = ['$state', 'httpFactory'];
    function runRouter($state, httpFactory) {
        httpFactory.getData('json/route.json')
        .success(function(data) {
            angular.forEach(data, function(value) {
                $stateProviderRef
                .state(value.name, value.view);
            });
            $state.go('dashboard');
        }, function(error) {
        });
    }
})();