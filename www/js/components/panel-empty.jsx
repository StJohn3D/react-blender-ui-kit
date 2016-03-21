'use strict';

define(["react"],
function(React) {

	var EmptyPanel = React.createClass({
		render: function() {
			return (
				<div className="outline">
					This is a basic empty panel with placeholder ul
					<ul>
						<li>Topic 1</li>
						<li>Topic 2</li>
						<li>Topic 3</li>
						<li>Topic 4</li>
						<li>Topic 5</li>
					</ul>
				</div>
			);
		}
	});

	return EmptyPanel;
});