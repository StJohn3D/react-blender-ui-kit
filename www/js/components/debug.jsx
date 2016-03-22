'use strict';

define(["react"],
function(React) {

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
	            	mouseX: event.screenX,
	            	mouseY: event.screenY
	            };
          });
		},
		render: function() {
			return (
				<div className="debug" onMouseMove={this.handleMouseMove}>
					<h2>Mouse.X: {this.state.mouseX}</h2>
					<h2>Mouse.Y: {this.state.mouseY}</h2>
				</div>
			);
		}
	});

	return Debug;
});