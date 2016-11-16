(function() {
    'use strict';
    angular.module('app.common')
    .factory('httpFactory', httpFactory);

    httpFactory.$inject = ['$http'];

    function httpFactory($http) {
        var httpCall = {
            getData:function(url) {
                return $http({
                    url:url,
                    mathod:'GET'
                });
            }
        };
        return httpCall;
    }
})();