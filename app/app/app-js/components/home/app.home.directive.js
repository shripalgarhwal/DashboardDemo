(function () {
    'use strict';
    angular.module('app.home')
        .directive('modelDialog', appDirective);

    // ----- appDirective -----
    function appDirective() {

        var dDirective = {
            restrict : 'E',
            templateUrl : 'app-js/components/home/model-dialog.html',
            replace:true,
            scope:{}
        };
        return dDirective;
    }
})();
