'use strict';

define(["react", "jsx!_/ui/container", "jsx!_/ui/panel", "jsx!_/pages/home", "jsx!_/debug", "flux/dispatcher"],
function(React ,  Container          ,  Panel          ,  Home             ,  Debug       ,  Dispatcher) {

	var App = React.createClass({
		getInitialState: function() {
			return {
				mouseX: 0,
				mouseY: 0,
				debugMode: true,
			};
		},
		handleMouseMove: function() {
			Dispatcher.dispatch({
				type: "MOUSE_MOVE",
				mouseX: event.screenX,
				mouseY: event.screenY
			});
		},
		render: function() {
			return (
				<div className="App" onMouseMove={this.handleMouseMove}>
					<Container content={[
						<Home />,
						<Panel height='100px' content={<Debug />} />
					]}/>
				</div>
			);
		}
	});

	return App;
});