'use strict';

define(["flux/action"], function(Action) {

	var UI_Actions = new Action("UI");
	
	UI_Actions.windowResize = function() {
		UI_Actions.sendAction({
			type : "WINDOW_RESIZE",
			event: event || null,
		});
	};

	UI_Actions.resizing = function() {
		UI_Actions.sendAction({
			type: "RESIZING"
		});
	};

	UI_Actions.doneResizing = function() {
		UI_Actions.sendAction({
			type: "DONE_RESIZING"
		});
	};

	return UI_Actions;
});