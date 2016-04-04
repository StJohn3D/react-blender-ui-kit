'use strict';

define(["react", "jsx!_/ui/container"],
function(React ,  Container) {
	var Row = React.createClass({
		getInitialState: function() {
			this.props.isUI = "ROW";
			var _content = this.props.content;
			_content.props.parentRow = this;
			_content.props.getClientHeight = this.getClientHeight.bind(this);
			_content.props.setHeight = this.setHeight.bind(this);
			return {
				content: _content,
				height: _content.props.height || 'auto'
			};
		},
		getClientHeight: function() {
			return React.findDOMNode(this).clientHeight;
		},
		setHeight: function(newHeight) {
			this.setState(function(state) {
				return { height: newHeight };
			});
		},
		render: function() {
			var style = {
				height: this.state.height,
			};
			return (
				<section className="row" style={style}>
					{this.state.content}
				</section>
			);
		}
	});

	return Row;
});