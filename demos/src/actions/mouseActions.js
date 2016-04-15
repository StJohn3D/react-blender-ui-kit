'use strict';

var ActionTypes = require('../constants/mouseTypes');
var Action = require('../common/action');

var MouseActions = new Action('MOUSE');

MouseActions.move = function() {
	MouseActions.sendAction({
		type  : ActionTypes.MOVE,
		event : event,
		mouseX: event.clientX,
		mouseY: event.clientY
	});
};

MouseActions.up = function() {
	MouseActions.sendAction({
		type  : ActionTypes.UP,
		event : event,
		button: event.button ? 'MIDDLE' : 'LEFT'
	});
};

MouseActions.down = function() {
	MouseActions.sendAction({
		type  : ActionTypes.DOWN,
		event : event,
		button: event.button ? 'MIDDLE' : 'LEFT'
	});
};

module.exports = MouseActions;
