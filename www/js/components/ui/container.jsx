'use strict';

define(["react",
		"jsx!_/ui/row",
		"flux/stores/ui-store"],
function(React, Row, UI_Store) {

	var Container = React.createClass({
		getInitialState: function() {
			this.props.isUI = "CONTAINER";
			return {
				flow: this.props.flow ? this.props.flow.toUpperCase() : "VIRTICAL", //HORIZONTAL
				minWidth: this.props.minWidth || 480,
				reverse: this.props.reverse || false,
				content: this.props.content || [],
			};
		},
		getClientWidth: function() {
			return React.findDOMNode(this).clientWidth;
		},
		refs: [],
		flowContent: function() {
			var flowDirection = this.state.flow;
			var content = this.state.content;
			if ( this.state.reverse ) {
				content.reverse();
			};

			var contentIndex = 0;
			var lastIndex = content.length - 1;
			var refs = this.refs = [];
			return content.map(function(i) {
				i.props.type = "ONLY";
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
					case 'VIRTICAL':
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
						console.log("ERROR! A container's flowDirection must be either 'HORIZONTAL' or 'VIRTICAL'");
						console.log("Failed with " + flowDirection);
						break;
				}

				contentIndex++;
				return returnVal;
			});
		},
		updateChildPanelsWidths: function() {
			var panelQueue = [];

			this.refs.forEach(function(ref) {
				if ( ref !== null ) {
					if ( ref.props.isUI === "PANEL" ) {
						panelQueue.push({
							panelRef: ref,
							newWidth: ref.getClientWidth()
						});
					} else {
						console.log("WARNING: It is strongly recommended to ONLY put panels inside container's content attribute.");
						console.log("		  Not doing so can result in strange behavior.");
						console.log("		  The following should be inside a panel...");
						console.log(ref);
					}
				}
			});

			panelQueue.forEach(function(panel) {
				panel.panelRef.setState(function(state) {
					return { width: panel.newWidth };
				});
			});
		},
		checkFlow: function() {
			var initialFlow = this.getInitialState().flow;
			var minWidth = this.state.minWidth;

			if ( initialFlow === "HORIZONTAL" && minWidth > 0 ) {
				if ( this.getClientWidth() < minWidth ) {
					if ( this.state.flow !== "VIRTICAL" ) {
						this.setState(function(state) {
							this.refs = [];
							return { flow: "VIRTICAL" };
						});
					}
				} else {
					if ( this.state.flow !== "HORIZONTAL" ) {
						this.setState(function(state) {
							return { flow: "HORIZONTAL" };
						});
					}
				}
			}
		},
		handleResizeEvent: function() {
			var checkFlow = this.checkFlow;
			if ( UI_Store.isResizing === "TRUE" ) { 
				var watchFlowWhileResizing = function() {
					checkFlow();
					// console.log('checking');
					if ( UI_Store.isResizing === "TRUE" ) {
						setTimeout(watchFlowWhileResizing, 100);
					}
				};
				watchFlowWhileResizing();
			}

			if ( UI_Store.isResizing === "FALSE" ) { //done resizing
				this.checkFlow();
				this.updateChildPanelsWidths();
			}
		},
		listenerIDs: [],
		componentDidMount: function() {
			this.updateChildPanelsWidths();
			this.listenerIDs.push(UI_Store.addListener(this.handleResizeEvent));
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