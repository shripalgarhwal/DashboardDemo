(function() {
    'use strict';
    angular.module('app.common')
    .factory('fundDataService', fundDataService);

    fundDataService.$inject = [];

    function fundDataService() {
        var fundData = {
            getPieChartData:function(url) {
                return [
                            {
                                name: "Base Currency",
                                y: 24,
                                sliced: true,
                                selected: true
                            }, {
                                name: "Core Holding ID",
                                y: 10
                            }, {
                                name: "POE",
                                y: 4
                            }, {
                                name: "NAV",
                                y: 3
                            }, {
                                name: "ISIN",
                                y: 20
                        }];
            },
            getOptionsData:function(url) {
                return {
                            title: {
                                text: 'Missing Fields History Graph'
                            },
                            xAxis: {
                                categories: ['2014-May-10', '2015-Jan-10', '2016-Jan-10', '2016-Fab-10', '2016-Mar-10', '2016-Apr-10', 
                                    '2016-May-10', '2016-Jun-10', '2016-July-10', '2016-Aug-10', '2016-Sap-10', '2016-Oct-10']
                            },

                            series: [{
                                data: [29, 71, 106, 129, 144, 176, 135., 148, 216, 194, 95, 54]
                            }]
                        }
            }
        };
        return fundData;
    }
})();