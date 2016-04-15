'use strict';

var ActionTypes = require('../constants/ui-types');
var Store = require('../../flux/store');
var newChildOf = require('../../common/new-child-of');

var uiStore = newChildOf(Store);

var _isResizing = 'FALSE';
var _containers = {};

Object.defineProperty(uiStore, 'isResizing', {
      get: function() { return _isResizing; }
});

var setTrue = function() {
	if ( _isResizing === 'FALSE' ) {
		_isResizing = 'TRUE';
		uiStore.emitChange('RESIZING');
		// console.log('start');
	}
};

var setFalse = function() {
	if ( _isResizing === 'TRUE' ) {
		_isResizing = 'FALSE';
		uiStore.emitChange('DONE_RESIZING');
		// console.log('done');
	}
};

var ensureContainerIsRegistered = function( id ) {
	// SJ: 	React will always create child panels first
	if ( !_containers[id] ) {
		_containers[id] = {};
		console.log('Container created with id: ' + id);
	}
};

uiStore.getChildPanels = function( containerID ) {
	var container = _containers[containerID];
	var returnVal = Object.keys(container).map(function(index) {
		return container[index];
	});
	return returnVal;
};

uiStore.onDispatch = function(payload) {
	if (payload.source === 'UI') {
		switch (payload.type) {
			case ActionTypes.WINDOW_RESIZE:
				setTrue();
				setTimeout(setFalse, 1000);
				break;

			case ActionTypes.RESIZING:
				setTrue();
				break;

			case ActionTypes.DONE_RESIZING:
				setFalse();
				break;

			case ActionTypes.TOOL_SELECTED:
				uiStore.emitChange('TOOL_SELECTED');
				break;

			case ActionTypes.TOOL_UPDATED:
				uiStore.emitChange('TOOL_UPDATED');
				break;

			case ActionTypes.CONTAINER_CREATED:
				ensureContainerIsRegistered( payload.id );
				uiStore.emitChange('CONTAINER_CREATED');
				break;

			case ActionTypes.CONTAINER_DISTROYED:
				delete _containers[payload.id];
				console.log('Container with id: ' + payload.id + ' - DESTROYED');
				uiStore.emitChange('CONTAINER_DISTROYED');
				break;

			case ActionTypes.PANEL_CREATED:
				ensureContainerIsRegistered( payload.parentContainerID );
				_containers[payload.parentContainerID][payload.index] = payload.component;
				console.log(' - Panel ' + payload.component.props.instanceID + ' registered in container[ ' +
					payload.parentContainerID + ' ] at index ' + payload.index);
				uiStore.emitChange('PANEL_CREATED');
				break;

			case ActionTypes.PANEL_DISTROYED:
				if ( _containers[payload.parentContainerID] ) {
					delete _containers[payload.parentContainerID][payload.index];
				}
				console.log(' - DESTROYED panel in ' + payload.parentContainerID + ' at index ' + payload.index );
				uiStore.emitChange('PANEL_DISTROYED');
				break;

			default:
				console.log("uiStore: I don't know what to do with this ↓");
				console.log( payload );
				break;
		}
	}
};

module.exports = uiStore;
