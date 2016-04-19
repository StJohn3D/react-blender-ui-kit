'use strict';

var ActionTypes = require('../constants/exampleTypes');
var Store = require('../common/store');
var newChildOf = require('../common/newChildOf');

var _selectedIndex = 0;
var _things = ['Thing 1', 'Thing 2'];

var ExampleStore = newChildOf(Store);

Object.defineProperty(ExampleStore, 'selectedIndex', {
	get: function() { return _selectedIndex; }
});

Object.defineProperty(ExampleStore, 'things', {
	get: function() { return _things; }
});

ExampleStore.onDispatch = function(payload) {
	if (payload.source === 'EXAMPLE') {
		switch (payload.type) {
			case ActionTypes.SELECTION_MADE:
				_selectedIndex = payload.selectedIndex;
				ExampleStore.emitChange();
				break;
			default:
				console.log("ExampleStore: I don't know what to do with this ↓");
				console.log( payload );
				break;
		}
	}
};

module.exports = ExampleStore;
