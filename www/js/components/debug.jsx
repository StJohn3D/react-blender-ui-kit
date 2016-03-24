'use strict';

define(["react", "flux/stores/mouse-store"],
function(React ,  MouseStore) {

	var Debug = React.createClass({
		getInitialState: function() {
			return {
				mouseX: 0,
				mouseY: 0,
			};
		},
		handleMouseMove: function() {
			this.setState(function(state) {
	            return {
	            	mouseX: MouseStore.mouseX,
	            	mouseY: MouseStore.mouseY
	            };
          });
		},
		componentDidMount: function() {
			this.props.listenerID = MouseStore.addListener(this.handleMouseMove);
		},
		componentWillUnmount: function() {
			this.props.listenerID.remove();
		},
		render: function() {
			return (
				// <div className="debug" onMouseMove={this.handleMouseMove}>
				<div className="debug">
					<h2>Mouse.X: {this.state.mouseX}</h2>
					<h2>Mouse.Y: {this.state.mouseY}</h2>
				</div>
			);
		}
	});

	return Debug;
});