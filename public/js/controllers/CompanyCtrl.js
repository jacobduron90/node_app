angular.module("CompanyCtrl", []).controller("CompanyController", ["$scope","$window", "$routeParams", "$location", "CoffeeBag", function($scope, $window, $routeParams, $location, coffeeService){
	$scope.companyName = $routeParams.id;
	
	var companyString = $window.localStorage.company;
	var company;
	if(companyString){
		company = JSON.parse($window.localStorage.company);
	}

	getBagsByCompany();

	// $scope.deleteBag = function(id){
	// 	coffeeService.delete(id)
	// 		.success(function(data){
	// 			console.log("Success");
	// 			getBagsByCompany();
	// 		})
	// 		.error(function(data){
	// 			console.log("Error: " + data);
	// 		})
	// }

	$scope.editBag = function(bag){
		$window.localStorage.bag = angular.toJson(bag);
		$location.path("/company/"+company.name+"/enterbag")

	}

	function getBagsByCompany(){
		coffeeService.getBagsByCompany(company._id)
		.success(function(data){
			console.log(data);
			$scope.bags = data;
		})
		.error(function(data){
			console.log("Error: " + data);
		});
	}


}]);