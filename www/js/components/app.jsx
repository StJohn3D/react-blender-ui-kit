'use strict';

define(["react", "jsx!_/home"],
function(React,         Home) {
	var app = window.reactBlenderUI = {
		mouseX: 0,
		mouseY: 0
	};
	document.onmousemove = function() {
		app.mouseX = event.screenX;
		app.mouseY = event.screenY;
	};

	var App = React.createClass({
	  render: function() {
	    return (
	      	<Home />
	    );
	  }
	});

  return App;
});