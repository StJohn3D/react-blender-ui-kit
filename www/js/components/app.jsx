'use strict';

define(["react", "jsx!_/ui/container", "jsx!_/ui/panel", "jsx!_/pages/home", "jsx!_/debug"],
function(React,            Container,            Panel,               Home,         Debug) {
	var app = window.reactBlenderUI = {
		mouseX: 0,
		mouseY: 0
	};
	document.onmousemove = function() {
		app.mouseX = event.screenX;
		app.mouseY = event.screenY;
	};

	var App = React.createClass({
		getInitialState: function() {
			return {
				mouseX: 0,
				mouseY: 0,
				debugMode: true,
			};
		},
		handleMouseMove: function() {
			// Do something smarter
		},
		render: function() {
			return (
				<Container onmousemove={this.handleMouseMove} content={[
					<Home />,
					<Panel height='100px' content={<Debug />} />
				]}/>
			);
		}
	});

	return App;
});