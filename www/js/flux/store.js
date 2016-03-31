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

define(["microevent", "flux/dispatcher"], function(Microevent, Dispatcher) {
	
	var Store = function() {

		/// ************************************************************************
	    /// Constructor Safe Check
	    /// ************************************************************************
	    if ( !( this instanceof Store ) ) return new Store();

		/// ************************************************************************
	    /// Private Properties
	    /// ************************************************************************

	    var _onDispatch = undefined;

	    /// ************************************************************************
	    /// Private Methods
	    /// ************************************************************************
	    var onDispatch = function(payload) {
	    	//Resolve duplicates?

	    	if ( typeof _onDispatch !== "undefined" ) {
	    		_onDispatch(payload);
	    	} else {
	    		console.log('onDispatch not yet implemented');
	    	}
	    };

	    /// ************************************************************************
	    /// Register self with dispatcher
	    /// ************************************************************************
	    var _dispatchToken = Dispatcher.register(function(payload) {
	    	onDispatch(payload);
	    });

	    /// ************************************************************************
	    /// Public Properties
	    /// ************************************************************************
	    Object.defineProperty(this, 'dispatcher', {
		      get: function() { return Dispatcher; }
		});

		Object.defineProperty(this, 'dispatchToken', {
		      get: function() { return _dispatchToken; }
		});

		Object.defineProperty(this, 'hasChanged', {
		      get: function() {
		      	var val = "Normally this should return a boolean, but it's note yet fully implemented";
		      	if ( Dispatcher.isDispatching ) {
		      		// Check store and return
		      	} else {
		      		// do something else?
		      	};
		      	return val;
		      }
		});

		Object.defineProperty(this, 'onDispatch', {
		      get: function() { return _onDispatch; },
		      set: function(func) {
		      	console.log(this);
		      	_onDispatch = func;
		      }
		});

	    /// ************************************************************************
	    /// Privileged Methods
	    /// ************************************************************************
	    this.addListener = function(callback) {
	    	var store = this;
	    	store.bind( 'change', callback );
	    	return {
	    		remove: function() {
	    			store.unbind( 'change', callback );
	    		}
	    	};
	    };

	    this.emitChange = function() {
	    	this.trigger( 'change' );
	    };

	};
	Microevent.mixin( Store );

	return Store;
});