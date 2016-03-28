'use strict';

define(["flux/dispatcher"], function(Dispatcher) {

	var Action = function(name) {
		if (typeof name !== "string") {
			console.log("WARNING! Actions should be constructed with a unique name for use in the payload.source!");
		};
		this.name = name;
	};
	Action.prototype.sendAction = function(payload) {
		payload.source = this.name;
		Dispatcher.dispatch(payload);
	};

	return Action;
});