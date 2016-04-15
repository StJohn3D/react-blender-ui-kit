'use strict';

var React = require('react');
var examplePage = require('./examples/examplePage');

var Home = React.createClass({
	render: function(){
		return (
			<div>
				<h1>Timber</h1>
				<p>Timber</p>
				<examplePage/>
			</div>
		);
	}
});

module.exports = Home;
