/* eslint-disable strict */
/* eslint-disable no-unused-vars */

var React = require('react');
var Header = require('./common/header');
var Footer = require('./common/footer');
var ExamplePage = require('./examples/examplePage');
var timber = require('timber-ui');
timber.injectCSS();
var TimberApp = timber.timberApp;
var Container = timber.container;
var Panel = timber.panel;

var App = React.createClass({

	render: function() {
		return (
			<TimberApp>
				<Container name='App'>
					<Panel>
						<Header/>
					</Panel>
					<Panel>
						<ExamplePage/>
					</Panel>
					<Panel>
						<Footer/>
					</Panel>
				</Container>
			</TimberApp>
		);
	}

});

module.exports = App;
