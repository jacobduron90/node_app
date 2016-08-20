var CoffeeBag = require("./models/coffee_bag.js");

module.exports = function(app, passport){

	app.get('/api/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    app.post('/api/login', passport.authenticate('local-login', {
            successRedirect: "/profile",
            failureRedirect: "/login",
            failureFlash: false
    }));
	

  	
  	app.get('/api/profile', isLoggedIn, function(req, res) {
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
		
	app.get('/api/logout', function(req, res) {
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

    app.post("/api/signup", function(req, res){
        res.redirect("/");
    })

     app.get("/api/signup", function(req, res){
        res.redirect("/");
    })
    //get coffee companies with count of bags
    app.get("/api/coffeecompanies", isLoggedIn, function(req, res){
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
    });
    //get all coffee bags
    app.get("/api/coffeebags", isLoggedIn, function(req,res){
        CoffeeBag.find({}, function(err, results){
            if(err){
                res.send(err);
            }
            res.json(results);
        })
    })

    app.get("/api/coffeebagscompany/:id", isLoggedIn, function(req,res){
        CoffeeBag.find({"companyName":req.params.id}, function(err, list){
            if(err){
                res.send(err);
            }
            res.json(list);
        })
    });

    //get coffee bag by id
    app.get("/api/coffeebags/:id", isLoggedIn, function(req, res){
        CoffeeBag.findById(req.params.id, function(err, bags){
            if(err){
                res.send(err);
            }
            res.json(bags);
        });
    });
    //create coffee bag
    app.post("/api/coffeebags", isLoggedIn, function(req, res){
        // console.log(req);
        var newBag = new CoffeeBag();
        newBag.companyName = req.body.companyName.trim().toLowerCase();
        newBag.bagName = req.body.bagName.trim().toLowerCase();
        newBag.countryOfOrigin = req.body.countryOfOrigin.trim().toLowerCase();
        if(req.body.roast){
            newBag.roast = req.body.roast.trim().toLowerCase();    
        }
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
    //update coffee bag
    app.put("/api/coffeebags/:id", isLoggedIn, function(req, res){
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

    //delete coffee bag
    app.delete("/api/coffeebags/:id", isLoggedIn, function(req, res){
        CoffeeBag.findByIdAndRemove(req.params.id, function(err){
            if(err){
                res.send(err);
            }else{
                res.json({"message":"success"});
            }

        })
    });

    app.get('*', function(req, res) {
        console.log("got randome request: " + req);
        res.sendFile('./public/index.html', {root:__dirname+"/../"}); // load the single view file (angular will handle the page changes on the front-end)
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