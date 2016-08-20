var express = require('express');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var User = require("./app/models/user");


var configDB = require('./app/config/database');
// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./app/config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({extended:true})); // get information from html forms
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

var fullUrl = __dirname + '/public';
console.log(fullUrl);
app.use(express.static(fullUrl));

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes')(app, passport); // load our routes and pass in our app and fully configured passport







var port = process.env.PORT || 8080;
 app.listen(port, function() {
   console.log("Listening on " + port);
 });
