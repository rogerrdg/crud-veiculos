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

	$scope.delete = function ()
	{
		var array_index_remove = []; //Array de indices que serão removidos

		var _idx = 0;
		$scope.items.forEach(element => { // Loop atraves dos itens da lista
			var idx_arr = $scope.selected.filter(el => el.placa === element.placa);
			if(idx_arr.length > 0) //Obtem o índice o item a ser removido
				array_index_remove.push(_idx);
			_idx++;
		});

		// Orderna a lsita de index de forma crescente
		// para não zuar os índices
		array_index_remove.sort(function(a,b){ return b - a; }); 


		for (var i = 0; i < array_index_remove.length; i++) 
		{
			if(array_index_remove[i] == 0) // Quando só tem um item na lista
				$scope.items.shift();
			else
				$scope.items.splice(array_index_remove[i],1);
		}
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

app.controller("modalAccountFormController", ['$scope', '$modal', '$log',

    function ($scope, $modal, $log) {

        $scope.showForm = function () {

            var modalInstance = $modal.open({
                templateUrl: 'modal-form.html',
                controller: ModalInstanceCtrl,
                scope: $scope,
                resolve: {
                    userForm: function () {
                        return $scope.userForm;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            });
        };
            }]);

var ModalInstanceCtrl = function ($scope, $modalInstance, userForm) {
    $scope.form = {}
    $scope.submitForm = function () {
        if ($scope.form.userForm.$valid) {
            console.log('user form is in scope');
            $modalInstance.close('closed');
        } else {
            console.log('userform is not in scope');
        }
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};
