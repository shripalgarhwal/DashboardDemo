(function() {
    'use strict';
    angular.module('app.home')
    .controller('dialogCtrl', appController)
    .controller('modalCtrl', modelInstanceCtrl);
    appController.$inject = ['$scope', 'httpFactory', '$uibModal'];
    modelInstanceCtrl.$inject = ['$scope',
					'$uibModalInstance',
					'stateNameArr',
					'stateArr',
					'$window'];
    function appController($scope, httpFactory, $uibModal) {
		var _this = $scope;
		_this.showModal = false;
		_this.stateArr = [];
		_this.stateNameArr = [];
		getStateArr();
		_this.openDialog = function() {
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'app-js/components/home/model-dialog.html',
				controller: 'modalCtrl',
				size: 'lg',
				resolve: {
					stateNameArr: function () {
						return _this.stateNameArr;
					},
					stateArr: function () {
						return _this.stateArr;
					}
				}
			});

			modalInstance.result.then(function (selectedItem) {
			}, function () {
			});
        };
        function getStateArr() {
			httpFactory.getData('json/states.json')
			.success(function(data) {
				_this.stateArr = data;
				angular.forEach(data, function(value) {
					_this.stateNameArr.push(value.state);
				});
			}, function(error) {
			});
        }
    }
	function modelInstanceCtrl ($scope, $uibModalInstance, stateNameArr, stateArr, $window) {
		$scope.stateNameArr = stateNameArr;
		$scope.stateArr = stateArr;
		$scope.ok = function () {
			//$uibModalInstance.close();
		};
		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
		$scope.selectState = function(value) {
			$window.open('https://en.wikipedia.org/wiki/' + value.state);
        };
	}
}());