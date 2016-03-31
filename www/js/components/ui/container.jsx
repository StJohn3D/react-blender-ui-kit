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
				reverse: this.props.reverse || false,
				content: this.props.content || [],
			};
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
		handleResizeEvent: function() {
			if ( UI_Store.isResizing === "FALSE" ) {
				var panelQueue = [];

				this.refs.forEach(function(ref) {
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
				});

				panelQueue.forEach(function(panel) {
					panel.panelRef.setState(function(state) {
						return { width: panel.newWidth };
					});
				});
			}
		},
		listenerIDs: [],
		componentDidMount: function() {
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