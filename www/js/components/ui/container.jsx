'use strict';

define(["react", "jsx!_/ui/row"],
function(React ,  Row) {

	var Container = React.createClass({
		getInitialState: function() {
			return {
				flow: this.props.flow ? this.props.flow.toUpperCase() : "VIRTICAL", //HORIZONTAL
				reverse: this.props.reverse || false,
				content: this.props.content || [],
			};
		},
		flowContent: function() {
			var flowDirection = this.state.flow;
			var content = this.state.content;
			if ( this.state.reverse ) {
				content.reverse();
			};

			var contentIndex = 0;
			var lastIndex = content.length - 1;
			return content.map(function(i) {
				i.props.type = "ONLY";
				var returnVal = i;
				var neighbors = i.props.neighbors = {};

				var addRight = function() {
					content[contentIndex+1].ref = function(cp) {
						neighbors.right = cp;
					};
				};

				switch ( flowDirection ) {
					case 'HORIZONTAL':
						if ( content.length > 1 ) {
							if ( contentIndex === 0 ) {
								i.props.type = "LEFT";
								addRight();
							} else if ( contentIndex < lastIndex ) {
								i.props.type = "INNER_H";
								addRight();
								neighbors.left = content[contentIndex-1];
							} else {
								i.props.type = "RIGHT";
								neighbors.left = content[contentIndex-1];
							}
						}
						break;
					case 'VIRTICAL':
						returnVal = <Row content={i} />;

						if ( content.length > 1 ) {
							if ( contentIndex === 0 ) {
								i.props.type = "TOP";
								neighbors.below = content[contentIndex+1];
							} else if ( contentIndex < lastIndex ) {
								i.props.type = "INNER_V";
								neighbors.below = content[contentIndex+1];
								neighbors.above = content[contentIndex-1];
							} else {
								i.props.type = "BOTTOM";
								neighbors.above = content[contentIndex-1];
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