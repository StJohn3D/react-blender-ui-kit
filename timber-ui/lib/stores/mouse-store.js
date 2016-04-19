'use strict';

var _logger = require('../logger');
var Logger = new _logger('MOUSE STORE');
// var log = Logger.log;
// var error = Logger.error;
var debug = Logger.debug;
var ActionTypes = require('../constants/mouse-types');
var Store = require('../../flux/store');
var newChildOf = require('../../common/new-child-of');

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
					debug('Mouse Up');
					_leftButtonState = 'UP';
				}
				MouseStore.emitChange();
				break;
			case ActionTypes.DOWN:
				if (payload.button === 'LEFT') {
					debug('Mouse Down');
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
