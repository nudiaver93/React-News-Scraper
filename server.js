var express = require('express');
var app = express();


var logger = require('morgan');
var bodyParser = require('body-parser');
app.use(logger('dev'));
app.use(bodyPaser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(express.static('./public'));

var PORT = process.env.PORT || 8000;

var mongoose = require('mongoose');

var Article = require('./server/model.js');

mongoose.connect('mongodb://localhost/nytreact');

var db = mongoose.connection;

db.on('error', function(err){
	console.log('Mongo Error: ', err);
});

db.once('open', function(){
	console.log('Mongoose connection successful.');
});


// Main 
app.get('/', function(req, res){
	res.sendFile('./public/index.html');
});


app.listen(PORT, function(){
	console.log('App listening on PORT ' + PORT);
})

