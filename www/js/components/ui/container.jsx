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

			return content.map(function(i) {
				if (flowDirection === 'HORIZONTAL') {
					return i;
				} else {
					return <Row content={i} />
				}
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