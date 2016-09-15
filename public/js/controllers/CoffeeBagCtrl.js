angular.module("CoffeeBagCtrl", []).controller("CoffeeBagController", ["$scope","$window", "$location", "CoffeeBag", function($scope, $window, $location, coffeeservice){
	
	
	$scope.forward = function(bag){
		$window.localStorage["company"] = angular.toJson(bag);
		$location.path("/company/"+bag.name);
	}
	
	return coffeeservice.getCompanies()
		.success(function(data){
			$scope.companies = data;
		})
		.error(function(data){
			console.log("Error: " + data);
		})



}]);