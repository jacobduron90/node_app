angular.module("CoffeeBagCtrl", []).controller("CoffeeBagController", ["$scope", "CoffeeBag", function($scope, coffeeserivce){
	coffeeserivce.getCompanies()
		.success(function(data){
			$scope.companies = data;
			console.log(data);
		})
		.error(function(data){
			console.log("Error: " + data);
		})
}]);