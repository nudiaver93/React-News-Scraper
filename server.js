var express = require('express');
var app = express();


var logger = require('morgan');
var bodyParser = require('body-parser');
app.use(logger('dev'));
app.use(bodyParser.json());
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


// Route to get saved articles
app.get('/api/saved', function(req, res){

	Article.find({}).exec(function(err, doc){
		if (err) {
			console.log(err)
		}
		else {
			res.send(doc);
		}
	})
});


// Route to post saved article 
app.post('/api/saved', function(req, res){
	var newArticle = new Article(req.body);

	console.log(req.body)

	var title = req.body.title;
	var date = req.body.date;
	var url = req.body.url;

	newArticle.save(function(err, doc){
		if (err) {
			console.log(err)
		}
		else {
			res.send(doc._id)
		}
	})
})


// Route to delete saved article
app.delete('/api/saved/', function(req, res){

	Article.find({"url": req.param('url')}).remove().exec(function(err, data){
		if(err){
			console.log(err);
		}
		else {
			res.send('Article deleted from saved list.');
		}
	})
})


app.listen(PORT, function(){
	console.log('App listening on PORT ' + PORT);
})

