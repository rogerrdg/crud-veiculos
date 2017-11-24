var app = angular.module('angularTable', ['ui.bootstrap'])

app.controller('PageCtrl', ['$scope', '$http', 'filterFilter', function ($scope, $http, filterFilter) {

	$scope.items = [];
	$http.get("veiculos.json").success(function(response){
		$scope.items = response;
	});
	$scope.search = {};


	// pagination controls
	$scope.currentPage = 1;
	$scope.totalItems = $scope.items.length;
	$scope.entryLimit = 5; // items per page
	$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

	// $watch search to update pagination
	$scope.$watch('search', function (newVal, oldVal) {
		$scope.filtered = filterFilter($scope.items, newVal);
		$scope.totalItems = $scope.filtered.length;
		$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
		$scope.currentPage = 1;
	}, true);


	$scope.itemsToAdd = [{
		"combustivel" : '',
		"imagem" : '',
		"marca" : '',
		"modelo" :'',
		"placa" : '',
		"valor" : ''
	}];


 	// Add item
	$scope.add = function(itemToAdd) {

		var index = $scope.itemsToAdd.indexOf(itemToAdd);

		$scope.itemsToAdd.splice(index, 1);

		$scope.items.push(angular.copy(itemToAdd));
		$scope.totalItems = $scope.filtered.length ;
	};
 	// Remove item

	$scope.delete = function (item, selected){

		var index = $scope.selected.indexOf(item);
 		$scope.selected.splice(index, 1);
	}

 // ----------------------------------------------------- Select


		$scope.selected = [];
		$scope.toggle = function (item, list) {
			var idx = list.indexOf(item);
			if (idx > -1) {
				list.splice(idx, 1);
			}
			else {
				list.push(item);
			}
		};

		$scope.exists = function (item, list) {
			return list.indexOf(item) > -1;
		};

		$scope.isIndeterminate = function() {
			return ($scope.selected.length !== 0 &&
					$scope.selected.length !== $scope.items.length);
		};

		$scope.isChecked = function() {
			return $scope.selected.length === $scope.items.length;
		};

		$scope.toggleAll = function() {
			if ($scope.selected.length === $scope.items.length) {
				$scope.selected = [];
			} else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
				$scope.selected = $scope.items.slice(0);
			}
		};


}]);

app.filter('startFrom', function () {
	return function (input, start) {
		if (input) {
			start = +start;
			return input.slice(start);
		}
		return [];
	};
});
