angular.module("EnterBagCtrl", []).controller("EnterBagController", ["$scope", "$window", "$routeParams", "$location", "CoffeeBag", function($scope, $window, $routeParams, $location, coffeeService){
	
	$scope.formData = {};
	
	var coffeeBagString = $window.localStorage.bag;
	var bag;
	if(coffeeBagString){
		bag = JSON.parse(coffeeBagString)
	}
	var companyString = $window.localStorage.company;
	var company;
	if(companyString){
		company = JSON.parse(companyString);
	}
		
	if(bag){
		$scope.dmessage = "Update call";
		$scope.formData = bag;
	}else{
		$scope.dmessage = "Create call";

	}




	$scope.createOrUpdate = function(){
		$scope.formData.companyId = company._id;
		if(bag){
			update();
		}else{
			create();
		}
	}

	create = function(){
		coffeeService.createBag($scope.formData)
			.success(function(data){
				console.log(data);
				$location.path("/company/"+company.name);
				$scope.formData = {};
			})
			.error(function(data){
				console.log("Error: " + data);
				$scope.formData = {};
			})
	}

	update = function(){
		coffeeService.updateBag(bag._id, $scope.formData)
			.success(function(data){
				console.log("Success: " + data);
				$location.path("/company/"+company.name);
				$scope.formData = {};
			})
			.error(function(data){
				$scope.formData = {};
				console.log("Error: " + data);
			})
	}
}]);