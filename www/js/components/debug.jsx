'use strict';

define(["react", "flux/stores/mouse-store"],
function(React ,  MouseStore) {

	var Debug = React.createClass({
		getInitialState: function() {
			return {
				mouseX: 0,
				mouseY: 0,
				left  : "UP",
			};
		},
		handleMouseChange: function() {
			this.setState(function(state) {
	            return {
	            	mouseX: MouseStore.mouseX,
	            	mouseY: MouseStore.mouseY,
	            	left  : MouseStore.leftButtonState,
	            };
          });
		},
		componentDidMount: function() {
			this.props.listenerID = MouseStore.addListener(this.handleMouseChange);
		},
		componentWillUnmount: function() {
			this.props.listenerID.remove();
		},
		render: function() {
			return (
				<div className="debug">
					<h2>Mouse.X: {this.state.mouseX}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LEFT: {this.state.left}</h2>
					<h2>Mouse.Y: {this.state.mouseY}</h2>
				</div>
			);
		}
	});

	return Debug;
});