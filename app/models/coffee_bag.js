var mongoose = require("mongoose");


var coffeeBagSchema = mongoose.Schema({
	companyName: String,
	bagName: String,
	countryOfOrigin:String,
	roast: String
});

coffeeBagSchema.index({companyName: 1, bagName:1}, {unique:true});

var CoffeeBag = mongoose.model("CoffeeBag", coffeeBagSchema);


module.exports = CoffeeBag;