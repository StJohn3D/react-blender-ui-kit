'use strict';

define(["react",
		"jsx!_/ui/row",
		"flux/stores/ui-store"],
function(React, Row, UI_Store) {

	var Container = React.createClass({
		getInitialState: function() {
			this.props.isUI = "CONTAINER";
			return {
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
		refs: [],
		flowContent: function() {
			var flowDirection = this.state.flow;
			var content = this.state.content;
			var tools = this.state.tools;
			if ( this.state.reverse ) {
				content.reverse();
			};

			var contentIndex = 0;
			var lastIndex = content.length - 1;
			var refs = this.refs = [];
			return content.map(function(i) {
				i.props.type = "ONLY";
				i.props.tools = tools;
				i.props.containerIndex = contentIndex;
				i.props.refs = refs;
				var returnVal = i;
				i.ref = function( component ) {
					refs.push(component);
				};

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
		purgeNulls: function(array) {
			return array.filter(function(item) {
				if (item) {
					return item;
				}
			});
		},
		lastPanelsInfoCollection: null,
		updateLastPanelsInfoCollection: function() {
			this.lastPanelsInfoCollection = this.collectChildPanelsInfo();
		},
		checkFlow: function() {
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

			var refs = this.purgeNulls( this.refs );

			refs.forEach(function(ref, _index) {
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
						index 			: _index,
						width 			: ref.getClientWidth(),
						height 			: ref.getClientHeight(),
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
			var panelQueue = collection || this.collectChildPanelsInfo();
			var refs = this.purgeNulls( this.refs );
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
			if ( this.state.flow === 'VERTICAL' ) {
				var childPanelsCollection = this.collectChildPanelsInfo();
				if ( !childPanelsCollection.hasActivePanel ) {
					childPanelsCollection.bottom.setHeight('auto');
				}
			}
		},
		watchFlowWhileResizing: function() {
			this.checkFlow();
			if ( UI_Store.isResizing === "TRUE" ) {
				setTimeout(this.watchFlowWhileResizing, 100);
			}
		},
		handleResizeEventEnd: function() {
			this.checkFlow();
			this.updateChildPanelSizes();
			if ( this.state.flow === "HORIZONTAL" ) {
				this.updateLastPanelsInfoCollection();
			}
		},
		handleUI_Change: function() {
			if ( UI_Store.isResizing === "TRUE" ) {
				this.handleResizeEventStart();
				this.watchFlowWhileResizing();
			} else { //done resizing
				this.handleResizeEventEnd();
			}
		},
		listenerIDs: [],
		componentDidMount: function() {//Called once after initial render
			this.updateChildPanelSizes();
			this.listenerIDs.push(UI_Store.addListener(this.handleUI_Change));
		},
		componentDidUpdate: function() {//Called after each update render (The state has changed)
			this.updateChildPanelSizes();
		},
		componentWillUnmount: function() {
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