'use strict';

var React = require('react');

var NotFoundPage = React.createClass({

	render: function() {
		return (
			<div>
				<h1>Page Not Found</h1>
				<p>back to home page</p>
			</div>
		);
	}

});

module.exports = NotFoundPage;
