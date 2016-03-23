'use strict';

define(["flux/dispatcher"],
function(     Dispatcher) {
	
	var MouseEventDispatcher = function() {

		/// ************************************************************************
	    /// Constructor Safe Check
	    /// ************************************************************************
	    if ( !( this instanceof MouseEventDispatcher ) ) return new MouseEventDispatcher();

		/// ************************************************************************
	    /// Private Properties
	    /// ************************************************************************

	    /// ************************************************************************
	    /// Private Methods
	    /// ************************************************************************

	    /// ************************************************************************
	    /// Public Properties
	    /// ************************************************************************

	    /// ************************************************************************
	    /// Privileged Methods
	    /// ************************************************************************
	 	this.handleMouseMove = function(action) {
	 		this.dispatch({
	 			type: 'MOUSE_MOVE',
	 			action: action
	 		});
	 	};

	};
	MouseEventDispatcher.prototype = new Dispatcher();

	return MouseEventDispatcher;
});