'use strict';

var React = require('react');

var Row = React.createClass({
	propTypes: {
		children: React.PropTypes.element
	},
	render: function() {
		var child = React.Children.only(this.props.children);
		return (
			<section className='timber-row'>
				{child}
			</section>
		);
	}
});

module.exports = Row;
