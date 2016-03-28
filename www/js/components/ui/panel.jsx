'use strict';

define(["react", "jsx!_/panel-empty", "flux/actions/mouse-actions", "flux/stores/mouse-store"],
function(React ,  EmptyPanel        ,  MouseActions               ,  MouseStore) {

	var Panel = React.createClass({
		getInitialState: function() {
			return {
				width: this.props.width || 'auto',
				height: this.props.height || 'auto',
				content: this.props.content || <EmptyPanel />
			};
		},
		handleResizeH: function(event, value) {
			var listenerID;
			var startX = MouseStore.mouseX;
			var startWidth = this.getDOMNode().clientWidth;

			var updateSize = function() {
				if ( MouseStore.leftButtonState === "UP" ) {
					listenerID.remove();
				};
				this.setState(function(state) {
					var newWidth = Number(startWidth) + (MouseStore.mouseX - startX);
		            return { width: newWidth + 'px' };
	        	});
			}.bind(this);

			listenerID = MouseStore.addListener(updateSize);
		},
		render: function() {
			var style = {
				width: this.state.width,
				height: this.state.height
			};

			return (
				<section className="panel" style={style}>
					{this.state.content}
					<div className="resize-h" onMouseDown={this.handleResizeH}></div>
				</section>
			);
		}
	});

	return Panel;
});