angular.module("CoffeeBagService", []).factory("CoffeeBag", ['$http','$window', function($http, $window){
	console.log("here just saying");
    var currentCoffeeCompany;
    var currentCoffeeBag;
    return {

        
        // call to get all nerds
        getAllBags : function() {
            return $http.get('/api/coffeebags');
        },

        getBagsByCompany: function(id){
            return $http.get('api/companies/' + id + '/bags');
        },

        getCompanies : function(){
            return $http.get("/api/companies")
        },

        getBagById : function(id){
            return $http.get("/api/coffeebags/" + id);
        },

        createCompany : function(data){
            return $http.post("/api/companies", data);
        },

                // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new nerd
        createBag : function(data) {
            return $http.post('/api/coffeebags', data);
        },

        updateBag : function(id, data){
            return $http.put("/api/coffeebags/" + id, data);
        },

        // call to DELETE a nerd
        delete : function(id) {
            return $http.delete('/api/coffeebags/' + id);
        }
    }       
}]);