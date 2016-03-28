'use strict';

define(["flux/dispatcher"], function(Dispatcher) {

	var sendAction = function(payload) {
		payload.source = "MOUSE";
		Dispatcher.dispatch(payload);
	};

	var MouseActions = {
		moved: function(x, y) {
			sendAction({
				type  : "MOVE",
				mouseX: x,
				mouseY: y
			});
		},
	};

	return MouseActions;
});