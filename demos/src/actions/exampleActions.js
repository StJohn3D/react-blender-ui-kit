'use strict';

var ActionTypes = require('../constants/exampleTypes');
var Action = require('../common/action');

var ExampleActions = new Action('EXAMPLE');

ExampleActions.selectionMade = function(_selectedIndex) {
	ExampleActions.sendAction({
		type         : ActionTypes.SELECTION_MADE,
		selectedIndex: _selectedIndex
	});
};

module.exports = ExampleActions;
