(function() {
	'use strict';
	angular.module('app.dashboard')
        .directive('categoryErrorWarningDetails', function () {
            return {
                restrict: 'E',
                templateUrl: 'app-js/components/dashboard/category-error-warning-details.html',
                scope: {
                    selectedFundFamilly: '=selectedFundFamilly',
                    fundName: '=',
                    fundGraphData: '@fundGraphData',
                    pieData: '@pieData'
                },
                controller: categoryErrorWarningDetailsCtrl,
                controllerAs: 'vm'
            };
        });
    function categoryErrorWarningDetailsCtrl($scope, fundDataService) {
        var vm = this;
        //console.log('selectedFundFamilly::::', $scope.selectedFundFamilly);
        var totalCount = 0;
        vm.totalErrorInFunds = 0;
        vm.missingField = {
            'currency': '',
            'coreHoldingID': '',
            'poe': '',
            'nav': '',
            'isin': ''
        };
        vm.titles = ['Total Missing Fields As of Date: ', 'Missing Fields in Fund ID '];
        vm.pieDataTitle = vm.titles[0];
        console.log('selectedFundFamilly111::::', $scope.selectedFundFamilly);
        vm.selectedFundFamilly = $scope.selectedFundFamilly;
        
        //vm.selectedFund = '';
        vm.selectedFund = vm.selectedFundFamilly[0].Name;
        //vm.fundName = $scope.fundName;
        vm.chartOptions = fundDataService.getOptionsData();
        vm.fundGraphData = JSON.parse($scope.fundGraphData);
        vm.pieData = JSON.parse($scope.pieData);
        vm.toggleFundTree = function(fund) {
            fund.visible.fund = !fund.visible.fund;
        }
        vm.toggleExpendChildren = function(fund, key) {
            fund.visible[key] = !fund.visible[key];
        }
        vm.getSysmbolForChild = function(fund, key) {            
            if(fund.visible[key]) {
                return 'fa fa-minus-square';
            } else {
                return 'fa fa-plus-square'
            }
        }
        vm.selectFundForGraph = function(fundItem) {
            vm.selectedFund = fundItem.Name;
            vm.fundGraphData = [];
            vm.fundGraphData = getTotalCount([fundItem], false);
        }
        function getTotalCount(funds, addInMissingObj) {
            var dataArray = [];
            angular.forEach(vm.missingField, function(value, key) {
                totalCount = 0;
                filterMissing(funds, key);
                if(addInMissingObj) {
                  vm.missingField[key] = totalCount;
                  //totalError += totalCount;
                }
                dataArray.push({
                    name: key,
                    y: totalCount
                });                
            });
            if(addInMissingObj) {
                vm.totalErrorInFunds = totalErrorInFunds();
            }
            return dataArray;
        }
        function filterMissing(arrayObj, field) {
            angular.forEach(arrayObj, function(value, key) {
                if(value[field] === '') {
                    totalCount++;
                }
                if(value.children) {
                    if(value.children.length > 0) {
                        filterMissing(value.children, field);
                    }
                }
            });
        }
        function totalErrorInFunds() {
            var totalError = 0;
            angular.forEach(vm.missingField, function(value, key) {
                totalError += Number(vm.missingField[key]);
            });
            return totalError;
        }
    }
}());