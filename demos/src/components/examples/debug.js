'use strict'; /* eslint-disable no-unused-vars */

var React = require('react');
var uiStore = require('../../stores/uiStore');
var MouseStore = require('../../stores/mouseStore');

var Debug = React.createClass({
	propTypes: {
		toolSelector: React.PropTypes.element
	},
	getInitialState: function() {
		return {
			mouseX          : 0,
			mouseY          : 0,
			left            : 'UP',
			isResizing      : 'false',
			storeListenerIDs: []
		};
	},
	handleMouseChange: function() {
		this.setState(function(state) {
			return {
				mouseX: MouseStore.mouseX,
				mouseY: MouseStore.mouseY,
				left  : MouseStore.leftButtonState
			};
		});
	},
	handleResize: function() {
		this.setState(function(state) {
			return {
				isResizing: uiStore.isResizing
			};
		});
	},
	componentDidMount: function() {
		var mouseStoreListenerID = MouseStore.addListener(this.handleMouseChange);
		var uiStoreListenerID = uiStore.addListener(this.handleResize);
		var listenerIDs = [ mouseStoreListenerID, uiStoreListenerID ];
		this.setState({
			storeListenerIDs: listenerIDs
		});
	},
	componentWillUnmount: function() {
		var listenerIDs = this.state.storeListenerIDs
		listenerIDs.forEach(function( listenerID ) {
			listenerID.remove();
		});
	},
	render: function() {
		return (
			<div className="debug table">
				{this.props.toolSelector}
				<div className="cell">
					<h2>Mouse.X: {this.state.mouseX}</h2>
					<h2>Mouse.Y: {this.state.mouseY}</h2>
				</div>
				<div className="cell">
					<h2>LEFT: {this.state.left}</h2>
					<h2>Resizing: {this.state.isResizing}</h2>
				</div>
				<div className="cell">
				</div>
				<div className="cell">
				</div>
			</div>
		);
	}
});

Debug.niceName = 'Debug';

module.exports = Debug;
