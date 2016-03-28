'use strict';

define(["flux/store", "flux/newChildOf"],
function(Store      ,  newChildOf) {

	var MouseStore = newChildOf(Store);

	var _mouseX = 0;
	var _mouseY = 0;

	Object.defineProperty(MouseStore, 'mouseX', {
	      get: function() { return _mouseX; }
	});

	Object.defineProperty(MouseStore, 'mouseY', {
	      get: function() { return _mouseY; }
	});

	MouseStore.onDispatch = function(payload) {
		if (payload.source === "MOUSE") {
			switch (payload.type) {
				case "MOVE":
					_mouseX = payload.mouseX;
					_mouseY = payload.mouseY;
					MouseStore.emitChange();
					break;
				default:
					console.log("MouseStore: I don't know what to do with this " + payload);
					break;
			}
		}
	};


	console.log('New MouseSore created ' + new Date().toDateString());

	return MouseStore;
});