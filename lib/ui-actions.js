'use strict';

var ActionTypes = require('../constants/ui-types');
var Action = require('./action');

var uiActions = new Action('UI');

uiActions.windowResize = function() {
	uiActions.sendAction({
		type : ActionTypes.WINDOW_RESIZE,
		event: event || null
	});
};

uiActions.resizing = function() {
	uiActions.sendAction({
		type: ActionTypes.RESIZING
	});
};

uiActions.doneResizing = function() {
	uiActions.sendAction({
		type: ActionTypes.DONE_RESIZING
	});
};

uiActions.toolSelected = function() {
	uiActions.sendAction({
		type: ActionTypes.TOOL_SELECTED
	});
};

uiActions.toolUpdated = function() {
	uiActions.sendAction({
		type: ActionTypes.TOOL_UPDATED
	});
};

uiActions.containerCreated = function( instanceID ) {
	uiActions.sendAction({
		type: ActionTypes.CONTAINER_CREATED,
		id  : instanceID
	});
};

uiActions.containerDistroyed = function( instanceID ) {
	uiActions.sendAction({
		type: ActionTypes.CONTAINER_DISTROYED,
		id  : instanceID
	});
};

uiActions.panelCreated = function( parentContainerID, containerIndex, component ) {
	uiActions.sendAction({
		type             : ActionTypes.PANEL_CREATED,
		parentContainerID: parentContainerID,
		index            : containerIndex,
		component        : component
	});
};

uiActions.panelDistroyed = function( parentContainerID, containerIndex ) {
	uiActions.sendAction({
		type             : ActionTypes.PANEL_DISTROYED,
		parentContainerID: parentContainerID,
		index            : containerIndex
	});
};

module.exports = uiActions;
