'use strict';

define(["flux/action"], function(Action) {

	var UI_Actions = new Action("UI");
	
	UI_Actions.windowResize = function() {
		UI_Actions.sendAction({
			type : "WINDOW_RESIZE",
			event: event || null,
		});
	};

	UI_Actions.resizing = function() {
		UI_Actions.sendAction({
			type: "RESIZING"
		});
	};

	UI_Actions.doneResizing = function() {
		UI_Actions.sendAction({
			type: "DONE_RESIZING"
		});
	};

	UI_Actions.toolSelected = function() {
		UI_Actions.sendAction({
			type: "TOOL_SELECTED"
		});
	};

	UI_Actions.toolUpdated = function() {
		UI_Actions.sendAction({
			type: "TOOL_UPDATED"
		});
	};

	UI_Actions.containerCreated = function( instanceID ) {
		UI_Actions.sendAction({
			type: "CONTAINER_CREATED",
			id  : instanceID
		});
	};

	UI_Actions.containerDistroyed = function( instanceID ) {
		UI_Actions.sendAction({
			type: "CONTAINER_DISTROYED",
			id  : instanceID
		});
	};

	UI_Actions.panelCreated = function( parentContainerID, containerIndex, component ) {
		UI_Actions.sendAction({
			type 				: "PANEL_CREATED",
			parentContainerID 	: parentContainerID,
			index  				: containerIndex,
			component 			: component
		});
	};

	UI_Actions.panelDistroyed = function( parentContainerID, containerIndex ) {
		UI_Actions.sendAction({
			type 				: "PANEL_DISTROYED",
			parentContainerID 	: parentContainerID,
			index  				: containerIndex,
		});
	}

	console.log('New UI_Actions created ' + new Date().toDateString());

	return UI_Actions;
});