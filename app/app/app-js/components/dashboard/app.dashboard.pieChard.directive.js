(function() {
	'use strict';
	angular.module('app.dashboard')
        // Directive for pie charts, pass in title and data only    
        .directive('hcPieChart', function () {
            return {
                restrict: 'E',
                template: '<div></div>',
                scope: {
                    title: '@',
                    data: '='
                },
                link: function (scope, element) {
                    scope.$watch('data', function(newVal, oldVal) {
                        scope.data = newVal;
                        Highcharts.chart(element[0], {
                            chart: {
                                type: 'pie'
                            },
                            title: {
                                text: scope.title
                            },
                            data: scope.data,
                            plotOptions: {
                                pie: {
                                    allowPointSelect: true,
                                    cursor: 'pointer',
                                    dataLabels: {
                                        enabled: true,
                                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                                    }
                                }
                            },
                            series: [{
                                data: scope.data
                            }]
                        });
                    });
                    
                }
            };
        });
}());