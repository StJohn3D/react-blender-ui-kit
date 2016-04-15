/* eslint-disable strict */
/* eslint-disable no-unused-vars */

var React = require('react');
var Header = require('./common/header');
var ExamplePage = require('./examples/examplePage');
var timber = require('timber-ui');
var Container = timber.container;
var Panel = timber.panel;

var App = React.createClass({

	render: function() {

		return (
			<div>
				<Container name='App'>
					<Panel height='250px'>
						<Header/>
					</Panel>
				</Container>
			</div>
		);
	}

});

module.exports = App;
