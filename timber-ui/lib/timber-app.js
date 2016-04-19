'use strict';

var React = require('react');
var MouseActions = require('./actions/mouse-actions');
var UIActions = require('./actions/ui-actions');

var TimberApp = React.createClass({
	propTypes: {
		children: React.PropTypes.oneOfType([
			React.PropTypes.element,
			React.PropTypes.arrayOf(React.PropTypes.element)
		])
	},
	componentWillMount: function() {
		window.addEventListener('resize', UIActions.windowResize);
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