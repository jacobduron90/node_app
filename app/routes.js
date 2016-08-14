module.exports = function(app, passport){
	
	app.get("/", function(req, res){
		res.render('index', {title:"Home"}); // load the index.ejs file
	});

	app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.jade', { message: req.flash('loginMessage') }); 
    });
	
	app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.jade', { message: req.flash('signupMessage') });
    });
  	
  	app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.jade', {
            user : req.user // get the user out of session and pass to template
        });
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

}

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}