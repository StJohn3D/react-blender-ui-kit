'use strict';

define(["flux/store", "com/newChildOf"],
function(Store      ,  newChildOf) {

	var UI_Store = newChildOf(Store);

	var _isResizing = "FALSE";

	Object.defineProperty(UI_Store, 'isResizing', {
	      get: function() { return _isResizing; }
	});

	var setTrue = function() {
		if ( _isResizing === "FALSE" ) {
			_isResizing = "TRUE";
			UI_Store.emitChange();
			// console.log('start');
		}
	};

	var setFalse = function() {
		if ( _isResizing === "TRUE" ) {
			_isResizing = "FALSE";
			UI_Store.emitChange();
			// console.log('done');
		}
	};

	UI_Store.onDispatch = function(payload) {
		if (payload.source === "UI") {
			switch (payload.type) {
				case "WINDOW_RESIZE":
					setTrue();
					setTimeout(setFalse, 1000);
					break;
				case "RESIZING":
					setTrue();
					break;
				case "DONE_RESIZING":
					setFalse();
					break;
				default:
					console.log("UI_Store: I don't know what to do with this ↓");
					console.log( payload );
					break;
			}
		}
	};


	console.log('New UI_Store created ' + new Date().toDateString());

	return UI_Store;
});