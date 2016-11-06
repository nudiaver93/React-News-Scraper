var React = require('react');

var Router = require('react-router');


var Query = require('./Search/Query');

var Results = require('./Search/Results');

var helpers = require('../utils/helpers');

var Search = React.createClass({

	getInitialState: function(){
		return { 
			queryTerm: "",
			startYear: "",
			endYear: "",
			results: {}
		}
	},


	componentDidUpdate: function(prevProps, prevState){
		console.log("COMPONENT UPDATED");
		console.log(this.state.queryTerm);
		console.log(this.state.startYear);
		console.log(this.state.endYear);

		console.log("Previous State", prevState);

		
		if (this.state.queryTerm != "" && (prevState.queryTerm != this.state.queryTerm || prevState.startYear != this.state.startYear || prevState.endYear != this.state.endYear))
		{
			helpers.runQuery(this.state.queryTerm, this.state.startYear, this.state.endYear)
				.then(function(data){
					if (data != this.state.results)
					{
						this.setState({
							results: data
						})		
					}

				}.bind(this))			
		}
	},


	setQuery: function(newQuery, newStart, newEnd){
		console.log("TEST");
		this.setState({
			queryTerm: newQuery,
			startYear: newStart,
			endYear: newEnd
		})
	},


	render: function(){
		console.log("Render Results", this.state.results)

		return(

			<div className="main-container"> 

				<Query updateSearch={this.setQuery} />

				<Results results={this.state.results}/>

			</div>

		)
	}
});

module.exports = Search;