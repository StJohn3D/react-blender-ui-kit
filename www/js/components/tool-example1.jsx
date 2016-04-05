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
					<h2>Tool example 1</h2>
					<div>
						<div className="block"><span>Thing 1</span></div>
						<div className="block"><span>Thing 2</span></div>
						<div className="block"><span>Thing 3</span></div>
						<div className="block"><span>Thing 4</span></div>
						<div className="block"><span>Thing 5</span></div>
						<div className="block"><span>Thing 6</span></div>
					</div>
				</div>
			);
		}
	});

	ToolExample1.niceName = "Example 1";

	return ToolExample1;
});