angular.module("AuthInterceptor", []).factory('AuthInjector', function($rootScope, $q, $window){
	return{
		request : function(config){
			config.headers = config.headers || {};
			if($window.localStorage.token){
				console.log("adding in auth");
				config.headers.authorization = $window.localStorage.token;
			}else{
				console.log("no token");
			}
			return config;
		},
		responseError : function(rejection){
			if(rejection.status === 401 || rejection.status === 403){
				//handle the case the user is rejected
				console.log("failed");
				$window.location.href = '/login';
			}
			return $q.reject(rejection);
		}
	};
});