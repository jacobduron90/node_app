var express = require('express');
var app = express();
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var User = require("./app/models/user");


var configDB = require('./app/config/database');
// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({extended:true})); // get information from html forms
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

var fullUrl = __dirname + '/public';
console.log(fullUrl);

app.set('superSecret', configDB.secret)
app.use(express.static(fullUrl));


app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
var routes = require('./app/routes')(app)// load our routes
app.get('*', function(req, res) {
    console.log("got randome request: " + req);
    res.sendFile('./public/index.html', {root:__dirname}); // load the single view file (angular will handle the page changes on the front-end)
});






var port = process.env.PORT || 8080;
 app.listen(port, function() {
   console.log("Listening on " + port);
 });
