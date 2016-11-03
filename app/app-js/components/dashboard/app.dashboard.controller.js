(function() {
    'use strict';
    angular.module('app.dashboard')
    .controller('dashboardCtrl', appController);
    appController.$inject = ['$scope', 'httpFactory', 'fundDataService'];
    function appController($scope, httpFactory, fundDataService) {
    	var vm = this;
    	vm.fundData = [];
    	vm.selectedFundFamilly = {};
    	vm.selectedFund = '';
    	vm.selected = 'As of Date';
    	vm.missingField = {
			'currency': '',
			'coreHoldingID': '',
			'poe': '',
			'nav': '',
			'isin': ''
    	};
        vm.titles = ['Total Missing Fields As of Date: ', 'Missing Fields in Fund ID '];
    	vm.expendCheckbox = true;
        vm.pieData = fundDataService.getPieChartData();
        vm.pieDataTitle = vm.titles[0];
        vm.chartOptions = fundDataService.getOptionsData();
    	httpFactory.getData('json/funds.json')
        .success(function(data) {
        	vm.fundData = data;
        	vm.selectedFundFamilly = vm.fundData[0];
        	//vm.tree_data = vm.selectedFundFamilly.funds;
        	vm.selectedFund = vm.selectedFundFamilly.funds[0].Name;
        	vm.pieData = [];
            vm.fundGraphData = [];
            vm.pieData = getTotalCount(vm.selectedFundFamilly.funds, true);
            vm.fundGraphData = getTotalCount([vm.selectedFundFamilly.funds[0]], false);
        	vm.selected = vm.selectedFundFamilly.asOfDate;
            vm.pieDataTitle = vm.titles[0] + vm.selected;
        }, function(error) {
        });
        vm.selectDate = function(family) {
        	vm.selectedFundFamilly = family;
        	vm.selectedFund = vm.selectedFundFamilly.funds[0].Name;
            vm.pieData = [];
            vm.fundGraphData = [];
        	vm.pieData = getTotalCount(vm.selectedFundFamilly.funds, true);
            vm.fundGraphData = getTotalCount([vm.selectedFundFamilly.funds[0]], false);
         	vm.selected = vm.selectedFundFamilly.asOfDate;
            vm.pieDataTitle = vm.titles[0] + vm.selected;
        }
        vm.selectFundForGraph = function(fundItem) {
            vm.selectedFund = fundItem.Name;
            vm.fundGraphData = [];
            vm.fundGraphData = getTotalCount([fundItem], false);
        }
        vm.toggleFundTree = function(fund) {
        	fund.visible = !fund.visible;
        }
        vm.getSysmbol = function(fund) {
        	if(!fund.children) {
        		return '';
        	}
        	if(fund.children.length < 1) {
        		return '';
        	}
        	if(fund.visible) {
        		return 'fa fa-minus-square';
        	} else {
        		return 'fa fa-plus-square'
        	}
        }
        vm.expendCollepse = function() {
        	vm.expendCheckbox = !vm.expendCheckbox;
        	angular.forEach(vm.fundData, function(item, key) {
	        	visibleFilter(item.funds, vm.expendCheckbox);
        	});
        }
        var totalCount = 0;
        function getTotalCount(funds, addInMissingObj) {
            var dataArray = [];
        	angular.forEach(vm.missingField, function(value, key) {
        		totalCount = 0;
        		filterMissing(funds, key);
                if(addInMissingObj) {
        		  vm.missingField[key] = totalCount;
                }
                dataArray.push({
                    name: key,
                    y: totalCount
                });                
        	});
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
        function visibleFilter(arrayObj, show) {
        	angular.forEach(arrayObj, function(value, key) {
        		//if(value.visible) {
        			value.visible = show;
        		//}
        		if(value.children) {
	        		if(value.children.length > 0) {
	        			visibleFilter(value.children, show);
	        		}
        		}
        	});
        }        
    }       
}());