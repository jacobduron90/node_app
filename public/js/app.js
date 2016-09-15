var brewNotes = angular.module('CoffeeBags', ['ngRoute', 'appRoutes', 'MainCtrl', 'CoffeeBagCtrl', 'UserCtrl', 'CompanyCtrl', 'EnterBagCtrl', 'EnterCompanyCtrl', 'CoffeeBagService', "AuthInterceptor"]);

brewNotes.config(function($httpProvider){
	$httpProvider.interceptors.push("AuthInjector");
})