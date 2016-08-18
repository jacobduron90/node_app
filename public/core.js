var brewnotes = angular.module('brewnotes', []);

function mainController($scope, $http){

	$scope.formData = {};

	$http.get("/profile")
		.success(function(data){
			$scope.bags = data;
			console.log(data);
		})
		.error(function(data){
			console.log("Error " + data);
		});

	$scope.createBag = function(){
		$http.post("/enterbag", $scope.formData)
			.success(function(data){
				$scope.formData = {};

			})
			.error(function(data){
				console.log("Error " + data);
			});
	}

	$scope.listBags = function(id){
		$http.get("/list"+id)
			.success(function(data){
				$scope.bagsPerCompany = data;
			})
			.error(function(data){
				console.log("Error " + data);
			});
	}
		
}