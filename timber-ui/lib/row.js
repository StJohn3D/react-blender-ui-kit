'use strict';

var React = require('react');

var Row = React.createClass({
	propTypes: {
		isUI   : React.PropTypes.string,
		content: React.PropTypes.element.isRequired
	},
	render: function() {
		return (
			<section className='timber-row'>
				{this.props.content}
			</section>
		);
	}
});

module.exports = Row;
