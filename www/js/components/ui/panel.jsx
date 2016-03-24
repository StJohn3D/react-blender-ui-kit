'use strict';

define(["react", "jsx!_/panel-empty"],
function(React ,  EmptyPanel) {

	var Panel = React.createClass({
		getInitialState: function() {
			return {
				width: this.props.width || 'auto',
				height: this.props.height || 'auto',
				content: this.props.content || <EmptyPanel />
			};
		},
		handleResizeH: function(e, id) {
			console.log(e.target);
			console.log(id);
			console.log(this);
			console.log(window.reactBlenderUI.mouseY);
		},
		render: function() {
			var style = {
				width: this.state.width,
				height: this.state.height
			};

			return (
				<section className="panel" style={style}>
					{this.state.content}
					<div className="resize-h" onClick={this.handleResizeH.bind(this)}></div>
				</section>
			);
		}
	});

	return Panel;
});