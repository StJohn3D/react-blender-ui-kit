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
		render: function() {
			return (
				<div className="App"
					 onMouseMove={MouseActions.move}
					 onMouseUp={MouseActions.up}
					 onMouseDown={MouseActions.down}
				>
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