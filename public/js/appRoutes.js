angular.module("appRoutes", []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
	$routeProvider

		.when("/coffeebags", {
			templateUrl:"../views/coffeebags.html",
			controller:"CoffeeBagController"
		})
		.when("/company/:id", {
			templateUrl:"../views/company.html",
			controller:"CompanyController"
		})
		.when("/enterbag/:id",{
			templateUrl:"../views/enterbag.html",
			controller:"EnterBagController"
		})
		.when("/enterbag",{
			templateUrl:"../views/enterbag.html",
			controller:"EnterBagController"
		})


		$locationProvider.html5Mode(true);
}])