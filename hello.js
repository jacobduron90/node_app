var http = require('http');
var APP_PRIVATE_IP_ADDRESS = '104.131.83.239'
var express = require('express');
var app = express();


app.get("/", function(req,res){
	res.send("OK, got it");
});

app.use(express.static('public'));

var port = process.env.PORT || 8081;
 app.listen(port, function() {
   console.log("Listening on " + port);
 });


console.log('Server running at http://APP_PRIVATE_IP_ADDRESS:8080/');
