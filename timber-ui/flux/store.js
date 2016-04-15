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

var Dispatcher = require('./dispatcher');
var generateID = require('../common/generate-id');

var Store = function() {

	/// ************************************************************************
	/// Constructor Safe Check
	/// ************************************************************************
	if ( !( this instanceof Store ) ) {
		return new Store();
	}

	/// ************************************************************************
	/// Private Properties
	/// ************************************************************************

	var _onDispatch;

	/// ************************************************************************
	/// Private Methods
	/// ************************************************************************
	var onDispatch = function(payload) {
		//Resolve duplicates?

		if ( typeof _onDispatch !== 'undefined' ) {
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
			}
				return val;
		}
	});

	Object.defineProperty(this, 'onDispatch', {
		get: function() { return _onDispatch; },
		set: function(func) {
			_onDispatch = func;
		}
	});

	this.callbacks = {};

	/// ************************************************************************
	/// Privileged Methods
	/// ************************************************************************
	this.addListener = function(callback) {
		var handlerID = generateID();
		var store = this;
		this.callbacks[ handlerID ] = callback;
		return {
			remove: function() {
				delete store.callbacks[ handlerID ];
			}
		};
	};

	this.emitChange = function(event) {
		var handlerIDs = Object.keys( this.callbacks );
		var store = this;
		handlerIDs.forEach(function(id) {
			store.callbacks[ id ]( event || 'change' );
		});
	};

};

module.exports = Store;
