angular.module("CoffeeBagService", []).factory("CoffeeBag", ['$http', function($http){
	console.log("here just saying");
    return {
        // call to get all nerds
        getAllBags : function() {
            return $http.get('/api/coffeebags');
        },

        getBagsByCompany: function(id){
            return $http.get('api/coffeebagscompany/' + id);
        },

        getCompanies : function(){
            return $http.get("/api/coffeecompanies")
        },

        getBagById : function(id){
            return $http.get("/api/coffeebags/" + id);
        },


                // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new nerd
        create : function(nerdData) {
            return $http.post('/api/coffeebags', nerdData);
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