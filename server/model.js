// require mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var ArticleSchema = new Schema({
	title: {
		type: String,
	},
	date: {
		type: Date,
	},
	url: {
		type: String,
	}
});

// convert schema into a model and export it
var Article = mongoose.model('Article', ArticleSchema);
module.exports = Article;