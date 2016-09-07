var CoffeeBag = require("./models/coffee_bag.js");
var User = require("./models/user.js");
var jwt = require('jsonwebtoken');
var express = require("express");

module.exports = function(app){
var apiRoutes = express.Router();

    apiRoutes.post("/authenticate", function(req, res){
        User.findOne({"local.email" : req.body.email}, function(err, user){
            if(err)throw err;

            if(!user){
                res.json({ success: false, message: 'Authentication failed. User not found.' });
            }else{
                if(!user.validPassword(req.body.password)){
                    res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                }else{
                    console.log(app.get("superSecret"));
                    var token = jwt.sign(user, app.get("superSecret"),{
                        expiresIn : 1440
                    });

                    res.json({
                        success : true,
                        message : "token generated",
                        token : token
                    })
                }
            }
        })
    });

        

    apiRoutes.use(function(req, res, next){
        var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers["authorization"];
        if(token){
            jwt.verify(token, app.get('superSecret'), function(err, decoded){
                if(err){
                    return res.status(403).json({success:false, message:"Failed to authenticate token"});
                }else{
                    req.decoded = decoded;
                    next();
                }
            });
        }else{
            return res.status(403).send({
                success:false,
                message:"No token provided."
            });
        }
    });
	
    apiRoutes.get('/profile', function(req, res) {
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
  	
  	
	apiRoutes.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

        // $dob.get('/signup', function(req, res) {

 //        // render the page and pass in any flash data if it exists
 //        res.render('signup.ejs', { message: req.flash('signupMessage') });
 //    });

    // app.post("/signup", passport.authenticate('local-signup', {
    //     successRedirect:'/profile',
    //     failureRedirect:'/signup',
    //     failureFlash:true
    // }));

    apiRoutes.post("/signup", function(req, res){
        res.redirect("/");
    });

     apiRoutes.get("/signup", function(req, res){
        res.redirect("/");
    });
    //get coffee companies with count of bags
    apiRoutes.get("/coffeecompanies", function(req, res){
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
    apiRoutes.get("/coffeebags",function(req,res){
        CoffeeBag.find({}, function(err, results){
            if(err){
                res.send(err);
            }
            res.json(results);
        })
    })

    apiRoutes.get("/coffeebagscompany/:id", function(req,res){
        CoffeeBag.find({"companyName":req.params.id}, function(err, list){
            if(err){
                res.send(err);
            }
            res.json(list);
        })
    });

    //get coffee bag by id
    apiRoutes.get("/coffeebags/:id", function(req, res){
        CoffeeBag.findById(req.params.id, function(err, bags){
            if(err){
                res.send(err);
            }
            res.json(bags);
        });
    });
    //create coffee bag
    apiRoutes.post("/coffeebags", function(req, res){
        // console.log(req);
        var newBag = new CoffeeBag();
        newBag.companyName = req.body.companyName.trim().toLowerCase();
        newBag.bagName = req.body.bagName.trim().toLowerCase();
        newBag.countryOfOrigin = req.body.countryOfOrigin.trim().toLowerCase();
        if(req.body.roast){
            newBag.roast = req.body.roast.trim().toLowerCase();    
        }
        if(req.body.photo.detailPhoto){
            newBag.photo.detailPhoto = req.body.photo.detailPhoto;
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
    apiRoutes.put("/coffeebags/:id", function(req, res){
        // console.log(req);
       CoffeeBag.findById(req.params.id, function(err, coffeebag){
            if(err){
                res.send(err);
            }
            coffeebag.companyName = req.body.companyName.trim().toLowerCase();
            coffeebag.bagName = req.body.bagName.trim().toLowerCase();
            coffeebag.countryOfOrigin = req.body.countryOfOrigin.trim().toLowerCase();
            if(req.body.roast){
                coffeebag.roast = req.body.roast.trim().toLowerCase();    
            }
            if(req.body.photo.detailPhoto){
                coffeebag.photo.detailPhoto = req.body.photo.detailPhoto;
            }
            coffeebag.save(function(err){
                res.json({"message":"success", "coffeebag":coffeebag});
            })
       });
    });

    //delete coffee bag
    apiRoutes.delete("/coffeebags/:id", function(req, res){
        CoffeeBag.findByIdAndRemove(req.params.id, function(err){
            if(err){
                res.send(err);
            }else{
                res.json({"message":"success"});
            }

        })
    });

    app.use("/api",apiRoutes);

}


