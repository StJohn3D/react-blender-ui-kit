'use strict';

define(["react", "jsx!_/panel-empty", "flux/actions/mouse-actions", "flux/stores/mouse-store"],
function(React ,  EmptyPanel        ,  MouseActions               ,  MouseStore) {

	var Panel = React.createClass({
		getInitialState: function() {
			return {
				width: this.props.width || 'auto',
				height: this.props.height || 'auto',
				content: this.props.content || <EmptyPanel />,
				type: this.props.type,
			};
		},
		handleResizeH: function(event, value) {
			var listenerID;
			var startX = MouseStore.mouseX;
			var startWidth = this.getDOMNode().clientWidth;

			console.log(this.props.neighbors);
			this.props.neighbors.right.setState(function() {
				return { width: 'auto' };
			});
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
			var resizeH = false;
			if ( this.state.type === 'LEFT' || this.state.type === 'INNER_H' ) {
				resizeH = <div className="resize-h" onMouseDown={this.handleResizeH}></div>;;
			}

			return (
				<section className="panel" style={style}>
					{this.state.content}
					{resizeH}
					<span>Width: {this.state.width}</span>
				</section>
			);
		}
	});

	return Panel;
});