'use strict';

define(["flux/store"],
function(Store) {
	var _mouseX = 0;
	var _mouseY = 0;

	var MouseStore = function() {
		var timeStamp = new Date().toDateString();
		console.log('New MouseSore created ' + timeStamp);

		if ( !( this instanceof MouseStore ) ) return new MouseStore();

	    Object.defineProperty(this, 'mouseX', {
		      get: function() { return _mouseX; }
		});

		Object.defineProperty(this, 'mouseY', {
		      get: function() { return _mouseY; }
		});
	};

	MouseStore.prototype = new Store();
	var MouseStoreSingleton = new MouseStore();

	MouseStoreSingleton.onDispatch = function(payload) {
		switch (payload.type) {
			case "MOUSE_MOVE":
				_mouseX = payload.mouseX;
				_mouseY = payload.mouseY;
				MouseStoreSingleton.emitChange();
				break;
			default:
				console.log("MouseStore: I don't know what to do with this " + payload);
				break;
		}
		
	};

	return MouseStoreSingleton;
});