var React = require('react');

var Router = require('react-router');

var helpers = require('../../utils/helpers');


var Results = React.createClass({ 

	getInitialState: function(){
		return { 
			title: "",
			url: "",
			pubdate: "",
		}
	},

	handleClick: function(item, event){
		console.log("CLICKED");
		console.log(item);

		helpers.postSaved(item.headline.main, item.pub_date, item.web_url)
			.then(function(data){
				console.log(item.web_url);
			}.bind(this))

	},


	render: function(){

		if (!this.props.results.hasOwnProperty('docs')){

			return(

				<li className="list-group-item">
					
					<h3 className='text-center'>
					  	<span><em>Your searches will display here!</em></span>
					</h3>
					
			  	</li>

			)

		}

		else {

			var articles = this.props.results.docs.map(function(article, index){

				return(

						<div key={index}>

						  <li className="list-group-item" >
								
							<h3 className="text-center">

								<button className="btn btn-primary pull-left" onClick={this.handleClick.bind(this, article)}>Save</button>

							  	<span><em>{article.headline.main}</em></span>

								<span className="btn-group pull-right" >
									<a href={article.web_url} target="_blank"><button className="btn btn-default ">View Article</button></a>
								</span>

							</h3>
							<p className="text-center">Date Published: {article.pub_date}</p>

							
						  </li>

						</div>
				)

			}.bind(this))

		}

		return(
			<div className ="main-container">


				<div className="row">
					<div className="col-lg-12">

						<div className="panel panel-primary">
							<div className="panel-heading">
								<h1 className="panel-title"><strong><i className="fa fa-list-alt"></i>  Results</strong></h1>
							</div>
							<div className="panel-body">
								<ul className="list-group">
								  
									{articles}

								</ul>					
							</div>
						</div>

					</div>
				</div>

			</div>
		)

	}

});

module.exports = Results;