'use strict';

define(["react"],
function(React) {

	var Panel = React.createClass({
		getInitialState: function() {
			return {
				width: this.props.width || 'auto',
				height: this.props.height || 'auto',
			};
		},
		render: function() {
			var style = {
				width: this.state.width,
				height: this.state.height
			};

			return (
				<div className="outline panel" style={style}>
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

	return Panel;
});