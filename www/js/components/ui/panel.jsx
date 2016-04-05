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
				content: this.props.content || null,
				type: this.props.type,
				active: false
			};
		},
		getClientWidth: function() {
			return React.findDOMNode(this).clientWidth;
		},
		getClientHeight: function() {
			return React.findDOMNode(this).clientHeight;
		},
		setWidth: function(newWidth) {
			this.setState(function(state) {
				return { width: newWidth };
			});
		},
		setHeight: function(newHeight) {
			this.setState(function(state) {
				return { height: newHeight };
			});
		},
		isActive: false,
		purgeNulls: function(array) {
			return array.filter(function(item) {
				if (item) {
					return item;
				}
			});
		},
		handleResizing: function(updateFunc) {
			var listenerID;

			var updateSize = function() {
				if ( MouseStore.leftButtonState === "UP" ) {
					this.active = false;
					UI_Actions.doneResizing();
					listenerID.remove();
				} else {
					updateFunc()
				}
			}.bind(this);

			this.active = true;
			UI_Actions.resizing();
			listenerID = MouseStore.addListener(updateSize);
		},
		handleResizeH: function(event, value) {
			var refs = this.purgeNulls( this.props.refs );
			refs[this.props.containerIndex + 1].setWidth('auto');

			var startX = MouseStore.mouseX;
			var startWidth = this.getClientWidth();
			var updateWidth = function() {
				var newWidth = Number(startWidth) + (MouseStore.mouseX - startX);
				this.setWidth( newWidth + 'px' );
			}.bind(this);

			this.handleResizing(updateWidth);
		},
		handleResizeV: function(event, value) {
			var refs = this.purgeNulls( this.props.refs );
			refs[this.props.containerIndex + 1].setHeight('auto');

			var startY = MouseStore.mouseY;
			var startHeight = this.getClientHeight();
			var updateHeight = function() {
				var newHeight = Number(startHeight) + (MouseStore.mouseY - startY);
				this.setHeight( newHeight + 'px' );
			}.bind(this);

			this.handleResizing(updateHeight);
		},
		render: function() {
			var style = {
				width: this.state.width,
				height: this.state.height
			};
			var resizeH = false;
			var resizeV = false;
			if ( this.state.type === 'LEFT' || this.state.type === 'INNER_H' ) {
				resizeH = <div className="resize-h" onMouseDown={this.handleResizeH}></div>;
			} else if ( this.state.type === 'TOP' || this.state.type === 'INNER_V' ) {
				resizeV = <div className="resize-v" onMouseDown={this.handleResizeV}></div>;
			}

			var content = this.state.content;
			if ( content === null ) {
				content = <span>Width: {this.state.width}, Height: {this.state.height}</span>;
			}

			return (
				<section className="panel" style={style}>
					{content}
					{resizeH}
					{resizeV}
				</section>
			);
		}
	});

	return Panel;
});