'use strict';

var ActionTypes = require('../constants/mouse-types');
var Action = require('../../flux/action');

var MouseActions = new Action('MOUSE');

MouseActions.move = function(event) {
	MouseActions.sendAction({
		type  : ActionTypes.MOVE,
		event : event,
		mouseX: event.clientX,
		mouseY: event.clientY
	});
};

MouseActions.up = function(event) {
	MouseActions.sendAction({
		type  : ActionTypes.UP,
		event : event,
		button: event.button ? 'MIDDLE' : 'LEFT'
	});
};

MouseActions.down = function(event) {
	MouseActions.sendAction({
		type  : ActionTypes.DOWN,
		event : event,
		button: event.button ? 'MIDDLE' : 'LEFT'
	});
};

module.exports = MouseActions;
