'use strict'; /* eslint-disable no-unused-vars */

var React = require('react');
var Container = require('./container');

var Row = React.createClass({
	propTypes: {
		isUI   : React.PropTypes.string,
		content: React.PropTypes.element
	},
	getInitialState: function() {
		this.props.isUI = 'ROW';
		return {
			content: this.props.content
		};
	},
	render: function() {
		return (
			<section className='timber-row'>
				{this.state.content}
			</section>
		);
	}
});

module.exports = Row;
