(function() {
    'use strict';
    angular.module('app.dashboard')
    .filter('fundFilter', function () {
        return function (items, letter) {
            var filtered = [];
            var letterMatch = new RegExp(letter, 'i');
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (letterMatch.test(item.Name.substring(0, String(item.Name).length))) {
                    filtered.push(item);
                }
            }
            return filtered;
        };
    });
}());