'use strict';

define(["react",
		"com/generateID",
		"flux/actions/mouse-actions",
		"flux/actions/ui-actions",
		"flux/stores/ui-store",
		"flux/stores/mouse-store"
], function( React, generateID, MouseActions, UI_Actions, UI_Store, MouseStore) {

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
				instanceID: generateID(),
				width: this.props.width || 'auto',
				height: this.props.height || 'auto',
				content: this.props.content || _content,
				type: this.props.type,
				active: false,
				tools: this.props.tools || [],
				currentToolIndex: this.props.toolIndex || 0,
				storeListenerIDs: []
			};
		},
		getClientWidth: function() {
			return React.findDOMNode(this).clientWidth;
		},
		getClientHeight: function() {
			return React.findDOMNode(this).clientHeight;
		},
		setWidth: function(newWidth) {
			this.setState({ width: newWidth });
		},
		setHeight: function(newHeight) {
			this.setState({ height: newHeight });
		},
		handleResizing: function(updateFunc) {
			var listenerID;

			var updateSize = function() {
				if ( MouseStore.leftButtonState === "UP" ) {
					this.setState({ active: false }, function() {
						UI_Actions.doneResizing();
						listenerID.remove();
					});
				} else {
					updateFunc()
				}
			}.bind(this);

			this.setState({ active: true }, function() {
				UI_Actions.resizing();
				listenerID = MouseStore.addListener(updateSize);
			});
		},
		handleResizeH: function() {
			event.preventDefault();
			var refs = UI_Store.getChildPanels( this.props.parentContainerID );
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
			var refs = UI_Store.getChildPanels( this.props.parentContainerID );
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
			if ( this.state.tools.length ) {
				var domNode = React.findDOMNode(this);
				var toolSelector = domNode.getElementsByTagName("SELECT")[0];
				if ( event.target === toolSelector
				&& this.state.content.type.displayName !== 'Container' ) {
					var selectedIndex = toolSelector.selectedIndex;
					this.setState(function(state) {
						return {
							content: state.tools[selectedIndex],
							currentToolIndex: selectedIndex
						}
					}, function() { //Called after setState completes
						UI_Actions.toolUpdated();
					});
				}
			}
		},
		buildToolSelector: function() {
			var id = this.state.instanceID;
			var tools = this.state.tools;
			var currentToolIndex = this.state.currentToolIndex;

			if ( tools.length > 0 ) {
				return <select onChange={UI_Actions.toolSelected}>
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
		handleUI_Change: function(type) {
			switch (type) {
				case "RESIZING":
					break;
				case "DONE_RESIZING":
					break;
				case "TOOL_SELECTED":
					this.handleToolSelected();
					break;
				default:
					break;
			}
		},
		componentDidMount: function() {//Called once after initial render
			UI_Actions.panelCreated(
				this.props.parentContainerID,
				this.props.containerIndex,
				this
			);
			var uiStoreListenerID = UI_Store.addListener(this.handleUI_Change);
			var listenerIDs = [ uiStoreListenerID ];
			this.setState({
				storeListenerIDs: listenerIDs
			});
		},
		componentWillUnmount: function() {
			UI_Actions.panelDistroyed( this.props.parentContainerID, this.props.containerIndex );
			var listenerIDs = this.state.storeListenerIDs
			listenerIDs.forEach(function( listenerID ) {
				listenerID.remove();
			});
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