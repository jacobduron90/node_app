angular.module("appRoutes", []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
	$routeProvider
		.when("/login", {
			templateUrl : "../views/login.html",
			controller : "UserController"
		})
		.when("/home", {
			templateUrl:"../views/coffeebags.html",
			controller:"CoffeeBagController"
		})
		.when("/company/:id", {
			templateUrl:"../views/company.html",
			controller:"CompanyController"
		})
		.when("/company/:id/enterbag",{
			templateUrl:"../views/enterbag.html",
			controller:"EnterBagController"
		})
		.when("/enterbag",{
			templateUrl:"../views/enterbag.html",
			controller:"EnterBagController"
		})
		.when("/entercompany",{
			templateUrl:"../views/enter_company.html",
			controller:"EnterCompanyController"
		})


		$locationProvider.html5Mode(true);
}])