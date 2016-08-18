var CoffeeBag = require("./models/coffee_bag.js");

module.exports = function(app, passport){

	app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    app.post('/login', passport.authenticate('local-login', {
            successRedirect: "/profile",
            failureRedirect: "/login",
            failureFlash: false
    }));
	

  	
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
                res.json({"coffeebags": result});
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

        // app.get('/signup', function(req, res) {

 //        // render the page and pass in any flash data if it exists
 //        res.render('signup.ejs', { message: req.flash('signupMessage') });
 //    });

    // app.post("/signup", passport.authenticate('local-signup', {
    //     successRedirect:'/profile',
    //     failureRedirect:'/signup',
    //     failureFlash:true
    // }));

    app.post("/signup", function(req, res){
        res.redirect("/");
    })

     app.get("/signup", function(req, res){
        res.redirect("/");
    })

    app.get("/enterbag", isLoggedIn, function(req, res){
        res.render('enterbag.ejs', {message:""});
    });

    app.post("/enterbag", isLoggedIn, function(req, res){
        // console.log(req);
        var newBag = new CoffeeBag();
        newBag.companyName = req.body.companyName.trim().toLowerCase();
        newBag.bagName = req.body.coffeeBag.trim().toLowerCase();
        newBag.countryOfOrigin = req.body.countryOfOrigin.trim().toLowerCase();
        newBag.roast = req.body.roast.trim().toLowerCase();
        newBag.save(function(err){
            if(err){
                if(11000 === err.code){
                    res.json({"error":"Duplicate data"});
                }else{
                    res.send(err);
                }
            }else{
                res.json(newBag);
            }
            
        });
    });

    app.get("/updatebag/:id", isLoggedIn, function(req, res){
        CoffeeBag.findOne({"_id": req.params.id},function(err, coffeeBag){
            if(err){
                res.send(err);
            }
            res.json(coffeeBag);
        })
        
    });

    app.post("/updatebag/:id", isLoggedIn, function(req, res){
        // console.log(req);
       CoffeeBag.findById(req.params.id, function(err, coffeebag){
            if(err){
                res.send(err);
            }
            coffeebag.companyName = req.body.companyName.trim().toLowerCase();
            coffeebag.bagName = req.body.bagName.trim().toLowerCase();
            coffeebag.countryOfOrigin = req.body.countryOfOrigin.trim().toLowerCase();
            coffeebag.roast = req.body.roast.trim().toLowerCase();
            coffeebag.save(function(err){
                res.json({"message":"success", "coffeebag":coffeebag});
            })
       });
    });

    app.get("/list/:id", isLoggedIn, function(req,res){
        console.log(req.params.id);
        CoffeeBag.find({"companyName":req.params.id}, function(err, resultList){
            if(err){
                res.send(err);
            }
            res.json({coffeebagName:req.params.id, coffeebags:resultList});
        });
    });

    app.delete("/deletebag/:id", isLoggedIn, function(req, res){
        console.log(req.params.id);
        res.send("Got id " + req.params.id);
    });

    app.get('*', function(req, res) {
        res.sendFile(__dirname+'/../public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });


}

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    // if (req.isAuthenticated())
    if(true)
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}