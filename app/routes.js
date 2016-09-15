var Coffee = require("./models/coffee_company.js");
var User = require("./models/user.js");
var jwt = require('jsonwebtoken');
var express = require("express");

var CoffeeCompany = Coffee.CoffeeCompany;
var CoffeeBag = Coffee.CoffeeBag;

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
	
    apiRoutes.get('/companies', function(req, res) {
        CoffeeCompany.find({}, function(err, result){
            if(err){
                res.json({"error":err});
            }
            res.json(result);
        })
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

    //get all coffee bags
    // apiRoutes.get("/coffeebags",function(req,res){
    //     CoffeeBag.find({}, function(err, results){
    //         if(err){
    //             res.send(err);
    //         }
    //         res.json(results);
    //     })
    // })

    // apiRoutes.get("/coffeebagscompany/:id", function(req,res){
    //     CoffeeBag.find({"companyName":req.params.id}, function(err, list){
    //         if(err){
    //             res.send(err);
    //         }
    //         res.json(list);
    //     })
    // });

    // //get coffee bag by id
    // apiRoutes.get("/coffeebags/:id", function(req, res){
    //     CoffeeBag.findById(req.params.id, function(err, bags){
    //         if(err){
    //             res.send(err);
    //         }
    //         res.json(bags);
    //     });
    // });
    //create coffee company
    apiRoutes.post("/companies", function(req, res){
        console.log(req.body);
        var company = new CoffeeCompany();
        company.name = req.body.companyName.trim().toLowerCase();
        company.location = req.body.companyLocation.trim().toLowerCase();
        company.bags = [];
        
        if(req.body.photo.companyLogo){
            company.photo.logo = req.body.photo.companyLogo;
        }
        company.save(function(err){
            if(err){
                if(11000 === err.code){
                    res.json({"error":"Duplicate data"});
                }else{
                    res.send(err);
                }
            }else{
                res.json(company);
            }
            
        });
    });

    apiRoutes.get("/companies/:id/bags", function(req, res){
        var id = req.params.id;
        CoffeeCompany.findById(id, function(err, single){
            if(err)
                throw err;
            console.log(single.bags);
            res.json(single.bags);
        });
    });

    apiRoutes.post("/coffeebags/", function(req, res){
        CoffeeCompany.findById(req.body.companyId, function(err, coffeeCompany){
            if(err)
                throw err;
            console.log(coffeeCompany);
            var bag = new CoffeeBag();
            bag.name = req.body.name.trim();
            bag.countryOfOrigin = req.body.countryOfOrigin.trim();
            if(req.body.roast){
                bag.roast = req.body.roast.trim();
            }
            if(req.body.photo.detailPhoto){
                bag.photo.detailPhoto = req.body.photo.detailPhoto.trim();
            }
            
            if(!coffeeCompany.bags){
                console.log('No bag')
                coffeeCompany.bags = [];
            }
            coffeeCompany.bags.push(bag);
            coffeeCompany.save(function(err){
                if(err){
                    if(11000 === err.code){
                        res.json({"error":"Duplicate data"});
                    }else{
                        res.send(err);
                    }
                }else{
                    res.json(bag);
                }
            });


        });
    });

    //update coffee bag
    apiRoutes.put("/coffeebags/:id", function(req, res){
       CoffeeCompany.findById(req.body.companyId, function(err, coffeeCompany){
            if(err){
                res.send(err);
            }
            console.log(req.body._id);
            var needlBag;
            for(i = 0; i < coffeeCompany.bags.length; i++){
                if(coffeeCompany.bags[i]._id == req.body._id){
                    var needleBag = coffeeCompany.bags[i];
                    break;
                }
            }
            if(needleBag){
                needleBag.name = req.body.name.trim();
                needleBag.countryOfOrigin = req.body.countryOfOrigin.trim();
                
                if(req.body.roast){
                    needleBag.roast = req.body.roast.trim();
                }else{
                    needleBag.roast = undefined;
                }

                if(req.body.photo.detailPhoto){
                    needleBag.photo.detailPhoto = req.body.photo.detailPhoto.trim();
                }else{
                    needleBag.photo.detailPhoto = undefined;
                }

                coffeeCompany.save(function(err){
                    if(err)throw err;
                    res.json(needleBag);
                })
            }
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


