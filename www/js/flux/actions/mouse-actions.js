'use strict';

define(["flux/action"], function(Action) {

	var MouseActions = new Action("MOUSE");
	
	MouseActions.move = function() {
		event.preventDefault();
		MouseActions.sendAction({
			type  : "MOVE",
			event : event,
			mouseX: event.clientX,
			mouseY: event.clientY
		});
	};

	MouseActions.up = function() {
		event.preventDefault();
		MouseActions.sendAction({
			type  : "UP",
			event : event,
			button: event.button ? "MIDDLE" : "LEFT",
		});
	};

	MouseActions.down = function() {
		event.preventDefault();
		MouseActions.sendAction({
			type  : "DOWN",
			event : event,
			button: event.button ? "MIDDLE" : "LEFT",
		});
	};

	return MouseActions;
});