'use strict';
/*
	//	SJ: This Flux Dispatcher implementation is based on the API described here 
	// 	http://facebook.github.io/flux/docs/dispatcher.html#content
	//
	//  NOTE: isDispatching in this implementation is a simple property
*/

define(["flux/sj-promise"],
function(        Promise) {
	
	var Dispatcher = function() {

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
	 		var token = Date.now();
	 		_callbacks[token] = callback;
	 		return token;
	 	};

	 	this.unregister = function(token) {
	 		delete _callbacks[token];
	 	};

	 	this.waitFor = function(tokenArray) {
	 		console.log('Dispatcher.waitFor is not yet implemented');
	 	};

	 	this.dispatch = function(payload) {
	 		_isDispatching = true;

	 		var tokens = Object.keys(_callbacks);
	 		tokens.forEach(function(t) {
	 			_callbacks[t](payload);
	 		});

	 		_isDispatching = false;
	 	};

	};

	return Dispatcher;
});