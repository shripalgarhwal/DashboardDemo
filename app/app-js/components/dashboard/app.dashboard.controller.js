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
        vm.displayTimeStamp = displayTimeStamp();
        vm.totalErrorInFunds = 0;
    	httpFactory.getData('json/dataQuality.json')
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
        function totalErrorInFunds() {
            var totalError = 0;
            angular.forEach(vm.missingField, function(value, key) {
                totalError += Number(vm.missingField[key]);
            });
            return totalError;
        }
        function displayTimeStamp() {
            //return new Date('2016', '10', '25').toString();
            return '2016-10-20 09:30 AM';
        }



        //-------------new UI changes
        vm.viewDetailAsOfDate = {};
        vm.visibility = {
            fund: {
                visible: false,
                error: {
                    visible: false
                },
                warning: {
                    visible: false
                }
            },
            shareClass: {
                visible: false,
                error: {
                    visible: false
                },
                warning: {
                    visible: false
                }
            },
            performance: {
                visible: false,
                error: {
                    visible: false
                },
                warning: {
                    visible: false
                }
            },
            characteristics: {
                visible: false,
                error: {
                    visible: false
                },
                warning: {
                    visible: false
                }
            }
        }
        //vm.toggleExpendParent = function(key) {
        //    vm.visibility[key].visible = !vm.visibility[key].visible
        //}
        vm.toggleExpendChildren = function(parentKey, Key) {
            vm.visibility[parentKey][Key].visible = !vm.visibility[parentKey][Key].visible;
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
        /*vm.getSysmbolParent = function(key) {            
            if(vm.visibility[key].visible) {
                return 'fa fa-minus-square';
            } else {
                return 'fa fa-plus-square'
            }
        }*/
        vm.getSysmbolForChild = function(parentKey, Key) {            
            if(vm.visibility[parentKey][Key].visible) {
                return 'fa fa-minus-square';
            } else {
                return 'fa fa-plus-square'
            }
        }
        vm.detailVisible = false;
        vm.viewErrorDetails = function(asOfDate) {
            vm.viewDetailAsOfDate = asOfDate;
            vm.detailVisible = !vm.detailVisible
        }
        vm.selectRecentDate = function(items, recentDateItem) {
            items.recentDate = recentDateItem.date
            items.error = recentDateItem.error;
            items.warning = recentDateItem.warning;
        }
        vm.approveData = function(items, recentDate) {
            items.approveDate = recentDate;
            items.error = 0;
            items.warning = 0;
            angular.forEach(items.recentDates, function(item, key) {
                if(item.date === recentDate) {
                    item.error = 0;
                    item.warning = 0;
                }
            });
        }

    }       
}());