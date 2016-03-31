'use strict';

define(["react",
		"flux/stores/mouse-store",
		"flux/stores/ui-store"
], function(React, MouseStore, UI_Store) {

	var Debug = React.createClass({
		getInitialState: function() {
			return {
				mouseX: 0,
				mouseY: 0,
				left  : "UP",
				isResizing: 'false',
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
		handleResize: function() {
			this.setState(function(state) {
	            return {
	            	isResizing: UI_Store.isResizing,
	            };
          });
		},
		listenerIDs: [],
		componentDidMount: function() {
			this.listenerIDs.push(MouseStore.addListener(this.handleMouseChange));
			this.listenerIDs.push(UI_Store.addListener(this.handleResize));
		},
		componentWillUnmount: function() {
			for ( var index in this.listenerIDs ) {
				this.listenerID[index].remove();
			};
		},
		render: function() {
			return (
				<div className="debug table">
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

	return Debug;
});