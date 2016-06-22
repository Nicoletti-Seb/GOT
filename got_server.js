/**
	@author Sébastien Nicoletti
*/

var data = require('./episodes');
var express = require('express');
var bodyParser = require("body-parser");
var app = express();

// Parse parameters to JSON 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Static files
app.use("/images", express.static(__dirname + '/images'));
app.use("/scripts", express.static(__dirname + '/scripts'));
app.use("/styles", express.static(__dirname + '/styles'));
app.use("/fonts", express.static(__dirname + '/fonts'));

/**
	Index page
*/
app.get(['/', '/index.html'], function (req, res) {
  res.sendFile("index.html", {root: __dirname });
});


/**
	Service "Episodes"
		return all episodes. 

	Format return: JSON
*/
app.get("/episodes/", function (req, res){
	res.send(data);
});

/**
	Service "Like"
		Increment the number of like and return a json object 

	Params:
		- id :  the ID episode.

	Params object return : 
		- result : boolean 

	Format return : JSON
*/
app.post("/like", function(req, res){
	var id  = req.body.id;

	for( var i in data ){
		var episode = data[i];

		if( id == episode.id ){
			episode.like++;
			res.send({ result : true });
			return;
		}
	}

	res.send( { result : false } );
});

app.listen(3000, function () {
  console.log('Got Server ready !! Port: 3000');
});