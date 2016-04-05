'use strict';

define(["react",
		"flux/actions/mouse-actions",
		"flux/actions/ui-actions",
		"flux/stores/mouse-store"
], function( React, MouseActions, UI_Actions, MouseStore) {

	var Panel = React.createClass({
		getInitialState: function() {
			this.props.isUI = "PANEL";

			var _tools = this.props.tools;
			var _currentToolIndex = this.props.toolIndex || 0;
			var _content = null;
			if ( _tools.length > 0 ) {
				_content = _tools[_currentToolIndex];
			}
			return {
				width: this.props.width || 'auto',
				height: this.props.height || 'auto',
				content: this.props.content || _content,
				type: this.props.type,
				active: false,
				tools: this.props.tools || [],
				currentToolIndex: this.props.toolIndex || 0
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
		handleResizeH: function() {
			event.preventDefault();
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
		handleResizeV: function() {
			event.preventDefault();
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
		handleToolSelected: function() {
			var domNode = React.findDOMNode(this);
			var toolSelector = domNode.getElementsByTagName("SELECT")[0];
			var selectedIndex = toolSelector.selectedIndex;
			this.setState(function(state) {
				return {
					content: state.tools[selectedIndex],
					currentToolIndex: selectedIndex
				}
			});
		},
		buildToolSelector: function() {
			var tools = this.state.tools;
			var currentToolIndex = this.state.currentToolIndex;
			if ( tools.length > 0 ) {
				return <select onChange={this.handleToolSelected}>
					{tools.map(function(tool, index) {
						var isSelected = false;
						if ( index === currentToolIndex ) {
							isSelected = true;
						}
						return <option value={index} selected={isSelected}>{tool.type.niceName}</option>
					})}
				</select>;
			} else {
				return false;
			}
		},
		buildContent: function() {
			var content = this.state.content;
			if ( content === null ) {
				content = <div>
					{this.buildToolSelector()}
					<span>Width: {this.state.width}, Height: {this.state.height}</span>
				</div>;
			} else {
				content.props.toolSelector = this.buildToolSelector();
				content.props.tools = this.state.tools;
			}
			return content;
		},
		buildResizer: function() {
			var resizer = false;
			if ( this.state.type === 'LEFT' || this.state.type === 'INNER_H' ) {
				resizer = <div className="resize-h" onMouseDown={this.handleResizeH}></div>;
			} else if ( this.state.type === 'TOP' || this.state.type === 'INNER_V' ) {
				resizer = <div className="resize-v" onMouseDown={this.handleResizeV}></div>;
			}
			return resizer;
		},
		render: function() {
			var style = {
				width: this.state.width,
				height: this.state.height
			};
			
			return (
				<section className="panel" style={style}>
					{this.buildContent()}
					{this.buildResizer()}
				</section>
			);
		}
	});

	return Panel;
});