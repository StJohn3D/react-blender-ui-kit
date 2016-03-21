'use strict';

define(["react", "jsx!_/row"],
function(React,         Row) {

	var Container = React.createClass({
		getInitialState: function() {
			return {
				flow: this.props.flow ? this.props.flow.toUpperCase() : "VIRTICAL", //HORIZONTAL
				content: this.props.content || [],
			};
		},
		handleSplit: function() {
			this.setState(function(state) {
				var updatedRows = state.rows.push(1);
				return {
					rows: updatedRows,
				}
			});
		},
		flowContent: function() {
			var flowDirection = this.state.flow;
			var content = this.state.content;

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