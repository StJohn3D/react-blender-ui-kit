'use strict';

define(["react",
		"jsx!_/ui/row",
		"flux/stores/ui-store",
		"flux/actions/ui-actions"
], function(React, Row, UI_Store, UI_Actions) {

	var Container = React.createClass({
		getInitialState: function() {
			this.props.isUI = "CONTAINER";
			return {
				instanceID: this.props.name || String(Math.random()).substr(2, 8),
				flow: this.props.flow ? this.props.flow.toUpperCase() : "VERTICAL", //HORIZONTAL
				minWidth: this.props.minWidth || 480,
				reverse: this.props.reverse || false,
				content: this.props.content || [],
				tools: this.props.tools || [],
			};
		},
		getClientWidth: function() {
			return React.findDOMNode(this).clientWidth;
		},
		flowContent: function() {
			var instanceID = this.state.instanceID;
			var flowDirection = this.state.flow;
			var content = this.state.content;
			if ( this.state.reverse ) {
				content.reverse();
			};
			var tools = this.state.tools;
			var oldPanelsInfo = this.lastPanelsInfoCollection;
			var contentIndex = 0;
			var lastIndex = content.length - 1;
			return content.map(function(i) {
				i.props.type = "ONLY";
				i.props.tools = tools;
				i.props.parentContainerID = instanceID;
				i.props.containerIndex = contentIndex;

				if ( oldPanelsInfo !== null ) {
					i.props.toolIndex = oldPanelsInfo[contentIndex].currentToolIndex;
				};

				var returnVal = i;
				switch ( flowDirection ) {
					case 'HORIZONTAL':
						if ( content.length > 1 ) {
							if ( contentIndex === 0 ) {
								i.props.type = "LEFT";
							} else if ( contentIndex < lastIndex ) {
								i.props.type = "INNER_H";
							} else {
								i.props.type = "RIGHT";
							}
						}
						break;
					case 'VERTICAL':
						returnVal = <Row content={i} />;

						if ( content.length > 1 ) {
							if ( contentIndex === 0 ) {
								i.props.type = "TOP";
							} else if ( contentIndex < lastIndex ) {
								i.props.type = "INNER_V";
							} else {
								i.props.type = "BOTTOM";
							}
						}
						break;
					default:
						console.log("ERROR! A container's flowDirection must be either 'HORIZONTAL' or 'VERTICAL'");
						console.log("Failed with " + flowDirection);
						break;
				}

				contentIndex++;
				return returnVal;
			});
		},
		lastPanelsInfoCollection: null,
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
						panelInfo.width = oldInfo[index].width;
					}

					mergedInfo[index] = panelInfo;
				});

				mergedInfo.hasActivePanel = newInfo.hasActivePanel;
				mergedInfo.bottom = newInfo.bottom || undefined;
			} else {
				mergedInfo = newInfo;
			}


			this.lastPanelsInfoCollection = mergedInfo;
			console.log(this.state.instanceID + ' has the following panel info');
			console.log(newInfo);
		},
		checkFlow: function() {
			// console.log(this.state.instanceID + ': Checking Flow');
			var initialFlow = this.getInitialState().flow;
			var minWidth = this.state.minWidth;

			if ( initialFlow === "HORIZONTAL" && minWidth > 0 ) {
				if ( this.getClientWidth() < minWidth ) {
					if ( this.state.flow !== "VERTICAL" ) {
						this.setState(function(state) {
							return { flow: "VERTICAL" };
						});
					}
				} else {
					if ( this.state.flow !== "HORIZONTAL" ) {
						this.setState(function(state) {
							return { flow: "HORIZONTAL" };
						});
						this.updateChildPanelSizes(this.lastPanelsInfoCollection);
					}
				}
			}
		},
		collectChildPanelsInfo: function() {
			var collection = [];
			collection.hasActivePanel = false;

			var refs = UI_Store.getChildPanels( this.state.instanceID );

			refs.forEach(function(ref) {
				switch ( ref.props.type ) {
					case "BOTTOM":
						collection.bottom = ref;
						break;
					default:
						break;
				};

				if ( ref.state.active ) {
					collection.hasActivePanel = true;
				}

				if ( ref.props.isUI === "PANEL" ) {
					collection.push({
						width 			: ref.getClientWidth(),
						height 			: ref.getClientHeight(),
						index 			: ref.props.containerIndex,
						type 			: ref.props.type,
						active 			: ref.state.active,
						currentToolIndex: ref.state.currentToolIndex
					});
				} else {
					console.log("WARNING: It is strongly recommended to ONLY put panels inside container's content attribute.");
					console.log("		  Not doing so can result in strange behavior.");
					console.log("		  The following should be inside a panel...");
					console.log(ref);
				}
			});

			return collection;
		},
		updateChildPanelSizes: function(collection) {
			console.log(this.state.instanceID + ': Updating Child Panel Sizes');
			var panelQueue = collection || this.collectChildPanelsInfo();
			var refs = UI_Store.getChildPanels( this.state.instanceID );
			if ( panelQueue.length !== refs.length ) {
				throw("Something is wrong here");
			};
			var flow = this.state.flow;
			panelQueue.forEach(function(panel) {
				var index = panel.index;
				var newWidth = panel.width + 'px';
				var newHeight = panel.height + 'px';
				if ( flow === "HORIZONTAL" ) {
					refs[index].setWidth(newWidth);
				} else {
					refs[index].setHeight(newHeight);
				}
			});
		},
		handleResizeEventStart: function() {
			console.log(this.state.instanceID + ': Handling resize event START');
			if ( this.state.flow === 'VERTICAL' ) {
				var refs = this.collectChildPanelsInfo();
				console.log(refs);
				if ( !refs.hasActivePanel && refs.length ) {
					refs.bottom.setHeight('auto');
				}
			}
		},
		watchFlowWhileResizing: function() {
			this.checkFlow();
			if ( UI_Store.isResizing === "TRUE" ) {
				setTimeout(this.watchFlowWhileResizing, 100);
			}
		},
		handleUI_Change: function(type) {
			console.log(type);
			switch (type) {
				case "RESIZING":
					if ( UI_Store.isResizing === "TRUE" ) {
						this.handleResizeEventStart();
						this.watchFlowWhileResizing();
					} else {
						console.log('False resizing event');
					}
					break;
				case "DONE_RESIZING":
					this.checkFlow();
					this.updateChildPanelSizes();
					this.updateLastPanelsInfoCollection();
					break;
				case "TOOL_SELECTED":
					this.updateLastPanelsInfoCollection();
					break;
				default:
					break;
			}
		},
		listenerIDs: [],
		componentDidMount: function() {//Called once after initial render
			UI_Actions.containerCreated( this.state.instanceID );
			this.updateChildPanelSizes();
			this.listenerIDs.push(UI_Store.addListener(this.handleUI_Change));
		},
		componentDidUpdate: function() {//Called after each update render (The state has changed)
			this.updateChildPanelSizes();
		},
		componentWillUnmount: function() {
			UI_Actions.containerDistroyed( this.state.instanceID );
			this.listenerIDs.forEach(function( listenerID ) {
				listenerID.remove();
			});
		},
		render: function() {
			return (
				<section className="container">
					{this.flowContent()}
				</section>
			);
		}
	});

	return Container;
});