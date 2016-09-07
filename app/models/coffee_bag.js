var mongoose = require("mongoose");


var coffeeBagSchema = mongoose.Schema({
	companyName: String,
	bagName: String,
	countryOfOrigin:String,
	roast: String,
	updated_at:Date,
	created_at:Date,
	photo:{
		detailPhoto:String
	}
});

coffeeBagSchema.index({companyName: 1, bagName:1}, {unique:true});

coffeeBagSchema.pre("save", function(next){
	var currentDate = new Date();
	this.updated_at = currentDate;
	if(!this.created_at){
		this.created_at = currentDate;
	}

	next();
});

var CoffeeBag = mongoose.model("CoffeeBag", coffeeBagSchema);


module.exports = CoffeeBag;