'use strict';

define(["react"],
function(React) {

	var ToolExample1 = React.createClass({
		getInitialState: function() {
			return {
				name: "Example 1"
			}
		},
		render: function() {
			return (
				<div className="tool-example">
					{this.props.toolSelector}
					<h2>Tool example 2</h2>
					<div>
						<div className="block">Thing 1</div>
						<div className="block">Thing 2</div>
						<div className="block">Thing 3</div>
						<div className="block">Thing 4</div>
						<div className="block">Thing 5</div>
					</div>
				</div>
			);
		}
	});

	ToolExample1.niceName = "Example 1";

	return ToolExample1;
});