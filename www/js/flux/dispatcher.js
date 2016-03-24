'use strict';
/*
	//	SJ: This Flux Dispatcher implementation is based on the API described here 
	// 	http://facebook.github.io/flux/docs/dispatcher.html#content
	//
	//  NOTE: isDispatching in this implementation is a simple property
	//			isDispatching > .isDispatching
*/

define(["flux/sj-promise"],
function(        Promise) {
	
	var Dispatcher = function() {
		var timeStamp = new Date().toDateString();
		console.log('New Dispatcher created ' + timeStamp);

		/// ************************************************************************
	    /// Constructor Safe Check
	    /// ************************************************************************
	    if ( !( this instanceof Dispatcher ) ) return new Dispatcher();

		/// ************************************************************************
	    /// Private Properties
	    /// ************************************************************************
    	var _callbacks = {};
    	// var _promises = [];
    	var _isDispatching = false;

	    /// ************************************************************************
	    /// Private Methods
	    /// ************************************************************************

	    /// ************************************************************************
	    /// Public Properties
	    /// ************************************************************************
		Object.defineProperty(this, 'isDispatching', {
		      get: function() { return _isDispatching; }
		});

	    /// ************************************************************************
	    /// Privileged Methods
	    /// ************************************************************************
	 	this.register = function(callback) {
	 		var handlerID = Date.now();
	 		_callbacks[handlerID] = callback;
	 		return handlerID;
	 	};

	 	this.unregister = function(handlerID) {
	 		delete _callbacks[handlerID];
	 	};

	 	this.waitFor = function(handlerIDArray) {
	 		console.log('Dispatcher.waitFor is not yet implemented');
	 	};

	 	this.dispatch = function(payload) {
	 		_isDispatching = true;

	 		var handlerIDs = Object.keys(_callbacks);
	 		handlerIDs.forEach(function(t) {
	 			_callbacks[t](payload);
	 		});

	 		_isDispatching = false;
	 	};

	};

	return new Dispatcher();
});