var mongoose = require("mongoose");


var CoffeeBagSchema = mongoose.Schema({
	name: String,
	countryOfOrigin:String,
	roast: String,
	updated_at:Date,
	created_at:Date,
	photo:{
		detailPhoto:String
	}
});

var CoffeeCompanySchema = mongoose.Schema({
	name: String,
	location:String,
	updated_at:Date,
	created_at:Date,
	photo:{
		logo:String
	},
	bags: [CoffeeBagSchema]
});

CoffeeBagSchema.pre("save", function(next){
	var currentDate = new Date();
	this.updated_at = currentDate;
	if(!this.created_at){
		this.created_at = currentDate;
	}

	next();
});

CoffeeCompanySchema.pre("save", function(next){
	var currentDate = new Date();
	this.updated_at = currentDate;
	if(!this.created_at){
		this.created_at = currentDate;
	}

	next();
});

var CoffeeBagModel = mongoose.model("CoffeeBag", CoffeeBagSchema);
var CoffeeCompanyModel = mongoose.model("CoffeeCompany", CoffeeCompanySchema);

module.exports = {
	CoffeeBag: CoffeeBagModel,
	CoffeeCompany : CoffeeCompanyModel
}