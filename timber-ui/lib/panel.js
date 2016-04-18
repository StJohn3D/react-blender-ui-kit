'use strict';

var React = require('react');
var ReactDom = require('react-dom/server');
var generateID = require('../common/generate-id');
var uiActions = require('./actions/ui-actions');
var uiStore = require('./stores/ui-store');
var MouseStore = require('./stores/mouse-store');

var Panel = React.createClass({
	propTypes: {
		width            : React.PropTypes.string,
		height           : React.PropTypes.string,
		content          : React.PropTypes.object,
		type             : React.PropTypes.string,
		parentContainerID: React.PropTypes.string,
		containerIndex   : React.PropTypes.number,
		isUI             : React.PropTypes.string,
		tools            : React.PropTypes.array,
		toolIndex        : React.PropTypes.number,
		children         : React.PropTypes.element
	},
	getInitialState: function() {
		// this.props.isUI = 'PANEL';
		return {
			type            : this.props.type || 'ONLY',
			tools           : [],
			instanceID      : generateID(),
			width           : this.props.width || 'auto',
			height          : this.props.height || 'auto',
			content         : this.props.content || null,
			active          : false,
			currentToolIndex: 0,
			storeListenerIDs: []
		};
	},
	setType: function(_type) {
		this.setState({ type: _type });
	},
	setTools: function(_tools) {
		var _currentToolIndex = this.state.currentToolIndex;
		var _content = this.state.content;
		if ( _tools.length > 0 ) {
			_content = _tools[ _currentToolIndex ];
		}
		this.setState({
			tools  : _tools,
			content: _content
		});
	},
	getClientWidth: function() {
		return ReactDom.findDOMNode(this).clientWidth;
	},
	getClientHeight: function() {
		return ReactDom.findDOMNode(this).clientHeight;
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
			if ( MouseStore.leftButtonState === 'UP' ) {
				this.setState({ active: false }, function() {
					uiActions.doneResizing();
					listenerID.remove();
				});
			} else {
				updateFunc();
			}
		}.bind(this);

		this.setState({ active: true }, function() {
			uiActions.resizing();
			listenerID = MouseStore.addListener(updateSize);
		});
	},
	handleResizeH: function() {
		event.preventDefault();
		var refs = uiStore.getChildPanels( this.props.parentContainerID );
		refs[ this.props.containerIndex + 1 ].setWidth('auto');

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
		var refs = uiStore.getChildPanels( this.props.parentContainerID );
		refs[ this.props.containerIndex + 1 ].setHeight('auto');

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
			var domNode = ReactDom.findDOMNode(this);
			var toolSelector = domNode.getElementsByTagName('SELECT')[ 0 ];
			if ( event.target === toolSelector
			&& this.state.content.type.displayName !== 'Container' ) {
				var selectedIndex = toolSelector.selectedIndex;
				this.setState(function(state) {
					return {
						content         : state.tools[ selectedIndex ],
						currentToolIndex: selectedIndex
					};
				}, function() { //Called after setState completes
					uiActions.toolUpdated();
				});
			}
		}
	},
	buildToolSelector: function() {
		var tools = this.state.tools;
		var currentToolIndex = this.state.currentToolIndex;
		var returnVal = null;
		if ( tools.length > 0 ) {
			returnVal = <select onChange={uiActions.toolSelected}>
				{tools.map(function(tool, index) {
					var isSelected = index === currentToolIndex;
					return <option value={index} selected={isSelected}>{tool.type.niceName}</option>;
				})}
			</select>;
		}
		return returnVal;
	},
	buildContent: function() {
		var returnVal = null;
		var count = React.Children.count(this.props.children);
		if ( count === 0 ) {
			returnVal = <div>
				{this.buildToolSelector()}
				<span>Width: {this.state.width}, Height: {this.state.height}</span>
			</div>;
		} else if ( count === 1 ) {
			var child = React.Children.only(this.props.children);
			var props = Object.assign({}, child.props);
			props.toolSelector = this.buildToolSelector();
			returnVal = <child { ...props } />;
		} else {
			throw {
				error : 'Panels can only hold one child element',
				reason: React.Children.toArray(this.props.children)
			};
		}
		return returnVal;
	},
	buildResizer: function() {
		var resizer = null;
		if ( this.state.type === 'LEFT' || this.state.type === 'INNER_H' ) {
			resizer = <div className='timber-resize-h' onMouseDown={this.handleResizeH}></div>;
		} else if ( this.state.type === 'TOP' || this.state.type === 'INNER_V' ) {
			resizer = <div className='timber-resize-v' onMouseDown={this.handleResizeV}></div>;
		}
		return resizer;
	},
	handleUiChange: function(type) {
		switch (type) {
			case 'RESIZING':
				break;
			case 'DONE_RESIZING':
				break;
			case 'TOOL_SELECTED':
				this.handleToolSelected();
				break;
			default:
				break;
		}
	},
	componentWillMount: function() {
		console.log(this.handleUiChange);
		var uiStoreListenerID = uiStore.addListener(this.handleUiChange);
		var listenerIDs = [ uiStoreListenerID ];
		this.setState({
			storeListenerIDs: listenerIDs
		});
	},
	componentDidMount: function() {
		uiActions.panelCreated(
			this.props.parentContainerID,
			this.props.containerIndex,
			this
		);
	},
	componentWillUnmount: function() {
		uiActions.panelDistroyed( this.props.parentContainerID, this.props.containerIndex );
		var listenerIDs = this.state.storeListenerIDs;
		listenerIDs.forEach(function( listenerID ) {
			listenerID.remove();
		});
	},
	render: function() {
		var style = {
			width : this.state.width,
			height: this.state.height
		};
		var output = <section className='timber-panel' style={style}>
			{this.buildContent()}
			{this.buildResizer()}
		</section>

		return output;
	}
});

module.exports = Panel;
