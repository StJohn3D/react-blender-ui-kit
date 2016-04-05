'use strict';

define(["flux/store", "com/newChildOf"],
function(Store      ,  newChildOf) {

	var ExampleStore = newChildOf(Store);

	var _selectedIndex = 0;

	var _things = ["Thing 1", "Thing 2", "Thing 3", "Thing 4", "Thing 5", "Thing 6"];

	Object.defineProperty(ExampleStore, 'selectedIndex', {
	      get: function() { return _selectedIndex; }
	});

	Object.defineProperty(ExampleStore, 'things', {
	      get: function() { return _things; }
	});

	ExampleStore.onDispatch = function(payload) {
		if (payload.source === "EXAMPLE") {
			switch (payload.type) {
				case "SELECTION_MADE":
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


	console.log('New ExampleStore created ' + new Date().toDateString());

	return ExampleStore;
});