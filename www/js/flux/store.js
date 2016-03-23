'use strict';
/*
	//	SJ: This Flux Store implementation is based on the API described here 
	// 	https://facebook.github.io/flux/docs/flux-utils.html#content
	//
	//	NOTE: The following APIs described above have been implemented as properties
	//			getDispatcher > .dispatcher
	//			getDispatchToken > .dispatchToken
	//			hasChanged > .hasChanged
*/

define([], function() {
	
	var Store = function(dispatcher) {

		/// ************************************************************************
	    /// Constructor Safe Check
	    /// ************************************************************************
	    if ( !( this instanceof Store ) ) return new Store(dispatcher);
	    if ( !dispatcher ) throw("Stores cannot be initilized without a dispatcher");

		/// ************************************************************************
	    /// Private Properties
	    /// ************************************************************************
	    var _subscribers = {};

	    /// ************************************************************************
	    /// Private Methods
	    /// ************************************************************************
	    var _emitChange = function() {
	    	// if ( dispatcher.isDispatching ) {
	    	// 	var tokens = Object.keys(_subscribers);
		    // 	tokens.forEach(function(t) {
		    // 		_subscribers[t](payload);
		    // 	});
	    	// } else {
	    	// 	// do something else?
	    	// };
	    	
	    };

	    var _onDispatch = function(payload) {
	    	var type = payload.type;
	    	var action = payload.action;

	    	switch (type) {
	    		//handle action
	    	}
	    };

	    /// ************************************************************************
	    /// Register self with dispatcher
	    /// ************************************************************************
	    var _dispatchToken = dispatcher.register(function(payload) {
	    	_onDispatch(payload);
	    });

	    /// ************************************************************************
	    /// Public Properties
	    /// ************************************************************************
	    Object.defineProperty(this, 'dispatcher', {
		      get: function() { return dispatcher; }
		});

		Object.defineProperty(this, 'dispatchToken', {
		      get: function() { return _dispatchToken; }
		});

		Object.defineProperty(this, 'hasChanged', {
		      get: function() {
		      	var val = "Normally this should return a boolean, but it's note yet fully implemented";
		      	if ( dispatcher.isDispatching ) {
		      		// Check store and return
		      	} else {
		      		// do something else?
		      	};
		      	return val;
		      }
		});

	    /// ************************************************************************
	    /// Privileged Methods
	    /// ************************************************************************
	    this.addListener = function(callback) {
	    	var token = Date.now();
	    	_subscribers[token] = callback;
	    	return {
	    		id    : token,
	    		remove: function() {
	    			delete _subscribers[token];
	    		}
	    	};
	    };

	};

	return Store;
});