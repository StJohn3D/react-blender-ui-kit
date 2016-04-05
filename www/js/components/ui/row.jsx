'use strict';

define(["react", "jsx!_/ui/container"],
function(React ,  Container) {
	var Row = React.createClass({
		getInitialState: function() {
			this.props.isUI = "ROW";
			return {
				content: this.props.content
			};
		},
		render: function() {
			return (
				<section className="row">
					{this.state.content}
				</section>
			);
		}
	});

	return Row;
});