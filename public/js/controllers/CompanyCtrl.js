angular.module("CompanyCtrl", []).controller("CompanyController", ["$scope", "$routeParams", "CoffeeBag", function($scope, $routeParams, coffeeService){
	$scope.companyName = $routeParams.id;

	getBagsByCompany();

	$scope.deleteBag = function(id){
		coffeeService.delete(id)
			.success(function(data){
				console.log("Success");
				getBagsByCompany();
			})
			.error(function(data){
				console.log("Error: " + data);
			})
	}

	function getBagsByCompany(){
		coffeeService.getBagsByCompany($routeParams.id)
		.success(function(data){
			$scope.bags = data;
			console.log(data);
		})
		.error(function(data){
			console.log("Error: " + data);
		});
	}


}]);