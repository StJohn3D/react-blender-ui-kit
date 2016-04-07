'use strict';

define(["react",
		"jsx!_/ui/container",
		"jsx!_/ui/panel",
		"jsx!_/pages/home",
		"jsx!_/debug",
		"flux/actions/mouse-actions",
		"flux/actions/ui-actions"
], function(React, Container, Panel, Home, Debug, MouseActions, UI_Actions) {
	var App = React.createClass({
		getInitialState: function() {
			return {
				mouseX: 0,
				mouseY: 0,
				debugMode: true,
			};
		},
		componentDidMount: function() {
	        window.addEventListener("resize", UI_Actions.windowResize);
	    },
	    componentWillUnmount: function() {
	        window.removeEventListener("resize", UI_Actions.windowResize);
	    },
		render: function() {
			// SJ: 	React's synthetic event doesn't support window.onresize
			//		So that is being handled above in componentDidMount
			//		and componentWillUnmount.
			return (
				<div className="App"
					 onMouseMove={MouseActions.move}
					 onMouseUp={MouseActions.up}
					 onMouseDown={MouseActions.down}
				>
					<Container name="app" content={[
						<Panel content={<Home />} />,
						<Panel height='100px' content={<Debug />} />,
					]}/>
				</div>
			);
		}
	});

	return App;
});