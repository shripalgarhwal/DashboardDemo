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
        //vm.changeApproveDate = '';
        vm.selectedCategory = 'funds';
        vm.businesDay = 'B4';
        vm.selectedRecentDate = '2016-11-02 10:10 AM';
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
            //console.log(':::::',vm.selectedFundFamilly.funds[0]);
            //vm.pieData = getTotalCount(vm.selectedFundFamilly.funds, true);
            //vm.fundGraphData = getTotalCount([vm.selectedFundFamilly.funds[0]], false);
            vm.pieData = vm.selectedFundFamilly.funds;
            vm.fundGraphData = vm.selectedFundFamilly.funds[0];
        	vm.selected = vm.selectedFundFamilly.asOfDate;
            vm.pieDataTitle = vm.titles[0] + vm.selected;
        }, function(error) {
        });
        vm.selectDate = function(family) {
        	vm.selectedFundFamilly = family;
        	vm.selectedFund = vm.selectedFundFamilly.funds[0].Name;
            vm.pieData = [];
            vm.fundGraphData = [];
        	//vm.pieData = getTotalCount(vm.selectedFundFamilly.funds, true);
            //vm.fundGraphData = getTotalCount([vm.selectedFundFamilly.funds[0]], false);
            vm.pieData = vm.selectedFundFamilly.funds;
            vm.fundGraphData = vm.selectedFundFamilly.funds[0];
         	vm.selected = vm.selectedFundFamilly.asOfDate;
            vm.pieDataTitle = vm.titles[0] + vm.selected;
        }
        /*vm.selectFundForGraph = function(fundItem) {
            vm.selectedFund = fundItem.Name;
            vm.fundGraphData = [];
            vm.fundGraphData = getTotalCount([fundItem], false);
        }
        vm.toggleFundTree = function(fund) {
        	fund.visible.fund = !fund.visible.fund;
        }*/
        /*vm.getSysmbol = function(fund) {
        	if(!fund.children) {
        		return '';
        	}
        	if(fund.children.length < 1) {
        		return '';
        	}
        	if(fund.visible.fund) {
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
        var totalCount = 0;*/

        /*function getTotalCount(funds, addInMissingObj) {
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
        }*/
        /*function filterMissing(arrayObj, field) {
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
        }*/
        /*function totalErrorInFunds() {
            var totalError = 0;
            angular.forEach(vm.missingField, function(value, key) {
                totalError += Number(vm.missingField[key]);
            });
            return totalError;
        }*/
        function displayTimeStamp() {
            //return new Date('2016', '10', '25').toString();
            return '2016-10-20 09:30 AM';
        }



        //-------------new UI changes
        vm.viewDetailAsOfDate = {};
        /*vm.visibility = {
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
        }*/
        //vm.toggleExpendParent = function(key) {
        //    vm.visibility[key].visible = !vm.visibility[key].visible
        //}
        /*vm.toggleExpendChildren = function(fund, key) {
            //vm.visibility[parentKey][Key].visible = !vm.visibility[parentKey][Key].visible;
            fund.visible[key] = !fund.visible[key];
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
        }*/
        /*vm.getSysmbolParent = function(key) {            
            if(vm.visibility[key].visible) {
                return 'fa fa-minus-square';
            } else {
                return 'fa fa-plus-square'
            }
        }
        vm.getSysmbolForChild = function(fund, key) {            
            if(fund.visible[key]) {
                return 'fa fa-minus-square';
            } else {
                return 'fa fa-plus-square'
            }
        }*/
        vm.valideOverrideBox = function(items) {            
            if(items.override && (items.error === 0 && items.warning === 0)) {
                return 'col-md-4 box-success width-32-per';
            } else if(items.override && (items.error !== 0 || items.warning !== 0)) {
                return 'col-md-4 box-override width-32-per';
            } else {
                return 'col-md-4 box-danger width-32-per'
            }
        }
        vm.detailVisible = false;
        vm.viewErrorDetails = function(asOfDate, key) {
            vm.selectedCategory = key;
            vm.viewDetailAsOfDate = asOfDate;
            vm.detailVisible = !vm.detailVisible
        }
        vm.selectRecentDate = function(items, recentDateItem) {
            //vm.businesDay = (recentDateItem.date.split('-'))[2].substring(0,2);
            items.recentDate = recentDateItem.date;
            //vm.selectedRecentDate = items.recentDate;
            items.error = recentDateItem.error;
            items.warning = recentDateItem.warning;
            items.override = recentDateItem.override;
            if(items.override) {
                items.user = recentDateItem.user;
            } else {
                items.user = '';
            }            
        }
        vm.approveData = function(items, recentDate) {
            items.approveDate = recentDate;
            //items.error = 0;
            //items.warning = 0;            
            items.override = true;
            //items.user = "SHGSS";
            angular.forEach(items.recentDates, function(item, key) {
                if(item.date === recentDate) {
                    //item.error = 0;
                    //item.warning = 0;
                    item.override = true;
                    items.error = item.error;
                    items.warning = item.warning;
                    items.user = item.user;
                }
            });
        }
        vm.checkApproveDate = function(items) {
            items['oldApprovedDate'] = items.approveDate;
            //vm.selectedRecentDate = items.recentDates[0].date;
            vm.selectedRecentDate = '2016-11-02 10:10 AM';
        }
        vm.visibleAsterisk = function(items) {
            var visible = false;
            angular.forEach(items.recentDates, function(item) {
                if(item.date === vm.selectedRecentDate) {
                    visible = true;
                }
            });
            return visible;            
        }
        //$scope.$watch('items.approveDate', function (newValue, oldValue) {
        //  console.log('watch fired, new value: ' + newValue);
        //});

    }       
}());