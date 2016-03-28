'use strict';

define(["react", "jsx!_/ui/container", "jsx!_/ui/panel", "jsx!_/pages/home", "jsx!_/debug", "flux/actions/mouse-actions"],
function(React ,  Container          ,  Panel          ,  Home             ,  Debug       ,  MouseActions) {

	var App = React.createClass({
		getInitialState: function() {
			return {
				mouseX: 0,
				mouseY: 0,
				debugMode: true,
			};
		},
		handleMouseMove: function() {
			MouseActions.moved( event.screenX, event.screenY ); //SJ: Send new mouse X & Y positions
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