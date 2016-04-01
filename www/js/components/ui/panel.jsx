'use strict';

define(["react",
		"jsx!_/panel-empty",
		"flux/actions/mouse-actions",
		"flux/actions/ui-actions",
		"flux/stores/mouse-store"
], function( React, EmptyPanel, MouseActions, UI_Actions, MouseStore) {

	var Panel = React.createClass({
		getInitialState: function() {
			this.props.isUI = "PANEL";
			return {
				width: this.props.width || 'auto',
				height: this.props.height || 'auto',
				content: this.props.content || <EmptyPanel />,
				type: this.props.type,
			};
		},
		getClientWidth: function() {
			return React.findDOMNode(this).clientWidth;
		},
		setWidthToAuto: function() {
			this.setState(function(state) {
				return { width: 'auto' };
			});
		},
		purgeNulls: function(array) {
			return array.filter(function(item) {
				if (item) {
					return item;
				}
			});
		},
		handleResizeH: function(event, value) {
			var listenerID;
			var startX = MouseStore.mouseX;
			var startWidth = this.getDOMNode().clientWidth;
			var refs = this.purgeNulls( this.props.refs );
			refs[this.props.containerIndex + 1].setWidthToAuto();

			var updateSize = function() {
				if ( MouseStore.leftButtonState === "UP" ) {
					UI_Actions.doneResizing();
					listenerID.remove();
				} else {
					this.setState(function(state) {
						var newWidth = Number(startWidth) + (MouseStore.mouseX - startX);
			            return { width: newWidth + 'px' };
		        	});
				}
			}.bind(this);

			UI_Actions.resizing();
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
					<span>Width: {this.state.width}</span><br />
					<span>Index: {this.props.containerIndex}</span>
				</section>
			);
		}
	});

	return Panel;
});