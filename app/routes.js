var CoffeeBag = require("./models/coffee_bag.js");

module.exports = function(app, passport){
	
	app.get("/", function(req, res){
		res.render('index', {title:"Home"}); // load the index.ejs file
	});

	app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    app.post('/login', passport.authenticate('local-login', {
            successRedirect: "/profile",
            failureRedirect: "/login",
            failureFlash: false
    }));
	
	app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });
  	
  	app.get('/profile', isLoggedIn, function(req, res) {
        CoffeeBag.aggregate(
            [
                {
                    "$group":{
                        "_id":"$companyName",
                        "bagCount":{"$sum":1}
                    }
                }
            ], function(err, result){
                res.render('profile.ejs', {
                "coffeebags": result});
            });


        // CoffeeBag.find({}, function(err, coffeebags){
        //     console.log(coffeebags);
        //     res.render('profile.ejs', {
        //         "coffeebags": coffeebags
        //     });
        // });

    });
		
	app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.post("/signup", passport.authenticate('local-signup', {
        successRedirect:'/profile',
        failureRedirect:'/signup',
        failureFlash:true
    }));

    app.get("/enterbag", isLoggedIn, function(req, res){
        res.render('enterbag.ejs', {message:""});
    });

    app.post("/enterbag", isLoggedIn, function(req, res){
        // console.log(req);
        var newBag = new CoffeeBag();
        newBag.companyName = req.body.companyName;
        newBag.bagName = req.body.coffeeBag;
        newBag.countryOfOrigin = req.body.countryOfOrigin;
        newBag.roast = req.body.roast;
        newBag.save(function(err){
            if(err){
                if(11000 === err.code){
                    res.render('enterbag.ejs', {message:"Duplicate data"});
                }else{
                    throw err;
                }
            }else{
                res.redirect("/profile");
            }
            
        });
    });

    app.get("/updatebag/:id", isLoggedIn, function(req, res){
        CoffeeBag.findOne({"_id": req.params.id},function(err, coffeeBag){
            if(err)throw err;
            
            res.render('updatebag.ejs', {message:"", coffeebag :coffeeBag});    
        })
        
    });

    app.post("/updatebag/:id", isLoggedIn, function(req, res){
        // console.log(req);
       CoffeeBag.findById(req.params.id, function(err, coffeebag){
            if(err) throw err;
            coffeebag.companyName = req.body.companyName;
            coffeebag.bagName = req.body.bagName;
            coffeebag.countryOfOrigin = req.body.countryOfOrigin;
            coffeebag.roast = req.body.roast;
            coffeebag.save(function(err){
                res.redirect("/profile");
            })
       });
    });


}

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}