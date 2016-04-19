'use strict';

var Logger = require('./logger');
var React = require('react');
var ReactDom = require('react-dom');
var Row = require('./row');
var Panel = require('./panel');
var generateID = require('../common/generate-id');
var uiStore = require('./stores/ui-store');
var uiActions = require('./actions/ui-actions');

var Container = React.createClass({
	propTypes: {
		name    : React.PropTypes.string,
		isUI    : React.PropTypes.string,
		flow    : React.PropTypes.string,
		minWidth: React.PropTypes.number,
		reverse : React.PropTypes.bool,
		content : React.PropTypes.array,
		tools   : React.PropTypes.array,
		children: React.PropTypes.oneOfType([
			React.PropTypes.element,
			React.PropTypes.arrayOf(React.PropTypes.element)
		])
	},
	getInitialState: function() {
		var idName = this.props.name || '';
		var instanceID = generateID(idName)
		var logger = new Logger('CONTAINER [ ' + instanceID + ' ]');
		logger.verbose = false;
		this.log = logger;
		return {
			instanceID      : instanceID,
			flow            : this.props.flow ? this.props.flow.toUpperCase() : 'VERTICAL', //HORIZONTAL
			minWidth        : this.props.minWidth || 480,
			reverse         : this.props.reverse || false,
			content         : this.props.content || [],
			tools           : this.props.tools || [],
			storeListenerIDs: []
		};
	},
	getClientWidth: function() {
		return ReactDom.findDOMNode(this).clientWidth;
	},
	getChildPanels: function() {
		var panels = [];
		React.Children.forEach(this.props.children, function(child) {
			if ( child.type === Panel ) {
				panels.push(child);
			} else {
				throw {
					error : 'Containers should only contain panels',
					reason: child
				}
			}
		});
		if ( this.state.reverse ) {
			panels.reverse();
		}
		return panels;
	},
	flowContent: function() {
		var containerID = this.state.instanceID;
		var flowDirection = this.state.flow;
		var tools = this.state.tools;
		var oldPanelsInfo = this.lastPanelsInfoCollection;

		var childPanels = this.getChildPanels();
		var lastIndex = childPanels.length - 1;
		var contentIndex = 0;
		return childPanels.map(function(child) {
			var props = Object.assign({}, child.props);
			props.type = 'ONLY';
			props.isUI = 'PANEL';
			props.instanceID = generateID();
			props.parentContainerID = containerID;
			props.containerIndex = contentIndex;
			props.tools = tools;

			if ( oldPanelsInfo !== null ) {
				props.toolIndex = oldPanelsInfo[ contentIndex ].currentToolIndex;
			}

			switch ( flowDirection ) {
				case 'HORIZONTAL':
					if ( childPanels.length > 1 ) {
						if ( contentIndex === 0 ) {
							props.type = 'LEFT';
						} else if ( contentIndex < lastIndex ) {
							props.type = 'INNER_H';
						} else {
							props.type = 'RIGHT';
						}
					}
					break;
				case 'VERTICAL':
					if ( childPanels.length > 1 ) {
						if ( contentIndex === 0 ) {
							props.type = 'TOP';
						} else if ( contentIndex < lastIndex ) {
							props.type = 'INNER_V';
						} else {
							props.type = 'BOTTOM';
						}
					}
					break;
				default:
					throw {
						error : "ERROR! A container's flowDirection must be either 'HORIZONTAL' or 'VERTICAL'",
						reason: 'Failed with ' + flowDirection
					}
			}

			var returnVal;
			if ( flowDirection === 'HORIZONTAL' ) {
				// returnVal = React.createElement(Panel, Object.assign({}, props, { key: contentIndex }));
				returnVal = (<Panel key={ contentIndex } { ...props } />);
			} else {
				// React.createElement(Panel, Object.assign({}, props));
				returnVal = (
					<Row key={ contentIndex } isUI='ROW'>
						<Panel { ...props } />
					</Row>
				);
			}
			contentIndex++;
			return returnVal;
		});
	},
	lastPanelsInfoCollection      : null,
	updateLastPanelsInfoCollection: function() {
		var currentFlow = this.state.flow;
		var originalFlow = this.getInitialState().flow;
		var oldInfo = this.lastPanelsInfoCollection;
		var newInfo = this.collectChildPanelsInfo();
		var mergedInfo = [];

		if ( oldInfo !== null ) {
			mergedInfo = oldInfo;

			newInfo.forEach(function( panelInfo ) {
				var index = panelInfo.index;

				if ( currentFlow === 'VERTICAL' && originalFlow === 'HORIZONTAL' ) {
					panelInfo.width = oldInfo[ index ].width;
				}

				mergedInfo[ index ] = panelInfo;
			});

			mergedInfo.hasActivePanel = newInfo.hasActivePanel;
			mergedInfo.bottom = newInfo.bottom || undefined;
		} else {
			mergedInfo = newInfo;
		}


		this.lastPanelsInfoCollection = mergedInfo;
	},
	checkFlow: function() {
		var initialFlow = this.getInitialState().flow;
		var minWidth = this.state.minWidth;

		if ( initialFlow === 'HORIZONTAL' && minWidth > 0 ) {
			if ( this.getClientWidth() < minWidth ) {
				if ( this.state.flow !== 'VERTICAL' ) {
					this.setState({ flow: 'VERTICAL' });
				}
			} else {
				if ( this.state.flow !== 'HORIZONTAL' ) {
					this.setState({ flow: 'HORIZONTAL' });
					this.updateChildPanelSizes(this.lastPanelsInfoCollection);
				}
			}
		}
	},
	collectChildPanelsInfo: function() {
		var collection = [];
		collection.hasActivePanel = false;

		var refs = uiStore.getChildPanels( this.state.instanceID );

		refs.forEach(function(ref) {
			switch ( ref.props.type ) {
				case 'BOTTOM':
					collection.bottom = ref;
					break;
				default:
					break;
			}

			if ( ref.state.active ) {
				collection.hasActivePanel = true;
			}

			collection.push({
				width           : ref.getClientWidth(),
				height          : ref.getClientHeight(),
				index           : ref.props.containerIndex,
				type            : ref.props.type,
				active          : ref.state.active,
				currentToolIndex: ref.state.currentToolIndex
			});
		});

		return collection;
	},
	updateChildPanelSizes: function(collection) {
		this.log.debug('Updating Child Panel Sizes');
		var panelQueue = collection || this.collectChildPanelsInfo();
		var refs = uiStore.getChildPanels( this.state.instanceID );
		if ( panelQueue.length !== refs.length ) {
			throw ('Something is wrong here');
		}
		var flow = this.state.flow;
		panelQueue.forEach(function(panel) {
			var index = panel.index;
			var newWidth = panel.width + 'px';
			var newHeight = panel.height + 'px';
			if ( flow === 'HORIZONTAL' ) {
				refs[ index ].setWidth(newWidth);
			} else {
				refs[ index ].setHeight(newHeight);
			}
		});
	},
	handleResizeEventStart: function() {
		this.log.debug('Handling resize event START');
		if ( this.state.flow === 'VERTICAL' ) {
			var refs = this.collectChildPanelsInfo();
			if ( !refs.hasActivePanel && refs.length ) {
				refs.bottom.setHeight('auto');
			}
		}
	},
	watchFlowWhileResizing: function() {
		this.checkFlow();
		if ( uiStore.isResizing === 'TRUE' ) {
			setTimeout(this.watchFlowWhileResizing, 100);
		}
	},
	handleUiChange: function(type) {
		switch (type) {
			case 'RESIZING':
				if ( uiStore.isResizing === 'TRUE' ) {
					this.handleResizeEventStart();
					this.watchFlowWhileResizing();
				} else {
					this.log.error('False resizing event');
				}
				break;
			case 'DONE_RESIZING':
				this.checkFlow();
				this.updateChildPanelSizes();
				this.updateLastPanelsInfoCollection();
				break;
			case 'TOOL_UPDATED':
				this.updateLastPanelsInfoCollection();
				break;
			default:
				break;
		}
	},
	componentWillMount: function() {
		var uiStoreListenerID = uiStore.addListener(this.handleUiChange);
		var listenerIDs = [ uiStoreListenerID ];
		this.setState({
			storeListenerIDs: listenerIDs
		});
	},
	componentDidMount: function() {//Called once after initial render
		uiActions.containerCreated( this.state.instanceID );
		this.updateChildPanelSizes();
	},
	componentDidUpdate: function() {//Called after each update render (The state has changed)
		this.updateChildPanelSizes();
	},
	componentWillUnmount: function() {
		uiActions.containerDistroyed( this.state.instanceID );
		var listenerIDs = this.state.storeListenerIDs;
		listenerIDs.forEach(function( listenerID ) {
			listenerID.remove();
		});
	},
	render: function() {
		return (
			<section className='timber-container'>
				{this.flowContent()}
			</section>
		);
	}
});

module.exports = Container;