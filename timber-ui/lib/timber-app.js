'use strict';

var React = require('react');
var MouseActions = require('./actions/mouse-actions');

var TimberApp = React.createClass({
	propTypes: {
		children: React.PropTypes.oneOfType([
			React.PropTypes.element,
			React.PropTypes.arrayOf(React.PropTypes.element)
		])
	},
	render: function() {
		return (
			<div className='timber-ui'
				onMouseMove={MouseActions.move}
				onMouseUp={MouseActions.up}
				onMouseDown={MouseActions.down}
			>
				{ this.props.children }
			</div>
		);
	}
});

module.exports = TimberApp;