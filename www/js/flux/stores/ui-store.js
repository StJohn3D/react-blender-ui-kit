'use strict';

define(["flux/store", "com/newChildOf"],
function(Store      ,  newChildOf) {

	var UI_Store = newChildOf(Store);

	var _isResizing = "FALSE";

	var _containers = {};

	Object.defineProperty(UI_Store, 'isResizing', {
	      get: function() { return _isResizing; }
	});

	var setTrue = function() {
		if ( _isResizing === "FALSE" ) {
			_isResizing = "TRUE";
			UI_Store.emitChange("RESIZING");
			// console.log('start');
		}
	};

	var setFalse = function() {
		if ( _isResizing === "TRUE" ) {
			_isResizing = "FALSE";
			UI_Store.emitChange("DONE_RESIZING");
			// console.log('done');
		}
	};

	var ensureContainerIsRegistered = function( id ) {
		// SJ: 	React will always create child panels first
		if ( !_containers[ id ] ) {
			_containers[ id ] = {};
			console.log('Container created with id: ' + id);
		}
	};

	UI_Store.getChildPanels = function( containerID ) {
		var container = _containers[ containerID ];
		var returnVal = Object.keys(container).map(function(index) {
			return container[index];
		});
		return returnVal;
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

				case "TOOL_SELECTED":
					UI_Store.emitChange("TOOL_SELECTED");
					break;

				case "CONTAINER_CREATED":
					ensureContainerIsRegistered( payload.id );
					UI_Store.emitChange("CONTAINER_CREATED");
					break;

				case "CONTAINER_DISTROYED":
					delete _containers[ payload.id ];
					console.log('Container with id: ' + id + ' - DESTROYED');
					UI_Store.emitChange("CONTAINER_DISTROYED");
					break;

				case "PANEL_CREATED":
					ensureContainerIsRegistered( payload.parentContainerID );
					_containers[ payload.parentContainerID ][ payload.index ] = payload.component;
					console.log(' - Panel ' + payload.component.state.instanceID + ' registered in container[' +
						payload.parentContainerID + '] at index ' + payload.index);
					UI_Store.emitChange("PANEL_CREATED");
					break;

				case "PANEL_DISTROYED":
					_containers[ payload.parentContainerID ][ payload.index ];
					console.log(' - DESTROYED panel in ' + payload.parentContainerID + ' at index ' + payload.index );
					UI_Store.emitChange("PANEL_DISTROYED");
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