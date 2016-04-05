'use strict';

define(["react"],
function(React) {

	var ToolExample2 = React.createClass({
		getInitialState: function() {
			return {
				name: "Example 2"
			}
		},
		render: function() {
			return (
				<div className="tool-example">
					{this.props.toolSelector}
					<h2>Tool example 2</h2>
					<ul>
						<li>Thing 1</li>
						<li>Thing 2</li>
						<li>Thing 3</li>
						<li>Thing 4</li>
						<li>Thing 5</li>
					</ul>
				</div>
			);
		}
	});

	ToolExample2.niceName = "Example 2";

	return ToolExample2;
});