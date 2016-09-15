angular.module("UserCtrl", []).controller("UserController",["$scope", "$http", "$window", function($scope, $http, $window){
	 	

 	$scope.user = {};
	$scope.isAuthenticated = isAuthenticated();
	$scope.welcome = '';
	$scope.message = '';

	console.log($scope.isAuthenticated);

	$scope.submit = function(){
		$http.post("/api/authenticate", $scope.user)
			.success(function(data, status, headers, config){
				console.log("Data: " + data.token);
				$scope.isAuthenticated = true;
				$window.localStorage.token = data.token;
				$window.location.href = '/home';
			})
			.error(function(data, status, headers, config){
				$scope.isAuthenticated = false;
				delete $window.localStorage.token;
				$scope.message = "Error: Invalid username or password";
			})
	}

	$scope.logout = function(){
		delete $window.localStorage.token;
		$window.location.href = "/"
	}

	function isAuthenticated(){
		if($window.localStorage.token){
			return true;
		}
		return false;
	}


}]);


