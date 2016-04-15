'use strict';

var ActionTypes = require('../constants/mouseTypes');
var Store = require('../common/store');
var newChildOf = require('../common/newChildOf');

var MouseStore = newChildOf(Store);

var _mouseX = 0;
var _mouseY = 0;
var _leftButtonState = 'UP';

Object.defineProperty(MouseStore, 'mouseX', {
      get: function() { return _mouseX; }
});

Object.defineProperty(MouseStore, 'mouseY', {
      get: function() { return _mouseY; }
});

Object.defineProperty(MouseStore, 'leftButtonState', {
      get: function() { return _leftButtonState; }
});

MouseStore.onDispatch = function(payload) {
	if (payload.source === 'MOUSE') {
		switch (payload.type) {
			case ActionTypes.MOVE:
				_mouseX = payload.mouseX;
				_mouseY = payload.mouseY;
				MouseStore.emitChange();
				break;
			case ActionTypes.UP:
				if (payload.button === 'LEFT') {
					_leftButtonState = 'UP';
				}
				MouseStore.emitChange();
				break;
			case ActionTypes.DOWN:
				if (payload.button === 'LEFT') {
					_leftButtonState = 'DOWN';
				}
				MouseStore.emitChange();
				break;
			default:
				console.log("MouseStore: I don't know what to do with this ↓");
				console.log( payload );
				break;
		}
	}
};

module.exports = MouseStore;
