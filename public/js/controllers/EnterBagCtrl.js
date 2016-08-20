angular.module("EnterBagCtrl", []).controller("EnterBagController", ["$scope", "$routeParams", "$location", "CoffeeBag", function($scope, $routeParams, $location, coffeeService){
	
	$scope.formData = {};
	if($routeParams.id){
		$scope.dmessage = "Update call";
		coffeeService.getBagById($routeParams.id)
			.success(function(data){
				$scope.formData = data;
				console.log(data);
			})
			.error(function(data){
				console.log("Error: " + data);
			});
	}else{
		$scope.dmessage = "Create call";
	}




	$scope.createOrUpdate = function(){
		if($routeParams.id){
			update();
		}else{
			create();
		}
	}

	create = function(){
		coffeeService.create($scope.formData)
			.success(function(data){
				console.log(data);
				$location.path("/company/"+$scope.formData.companyName);
				$scope.formData = {};
			})
			.error(function(data){
				console.log("Error: " + data);
				$scope.formData = {};
			})
	}

	update = function(){
		coffeeService.updateBag($routeParams.id, $scope.formData)
			.success(function(data){
				console.log("Success: " + data);
				$location.path("/company/"+$scope.formData.companyName);
				$scope.formData = {};
			})
			.error(function(data){
				$scope.formData = {};
				console.log("Error: " + data);
			})
	}
}]);