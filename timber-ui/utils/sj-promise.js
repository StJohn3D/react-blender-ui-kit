'use strict';

var SimplePromise = function() {
	/// ************************************************************************
    /// Constructor Safe Check
    /// ************************************************************************
    if ( !( this instanceof SimplePromise ) ) return new SimplePromise();

	/// ************************************************************************
    /// Private Properties
    /// ************************************************************************
    var _status = 'PENDING';
    var _resolvedWith = null;
    var _rejectedWith = null;

    /// ************************************************************************
    /// Private Methods
    /// ************************************************************************
    var _onThen = function() {};
    var _onRejected = function() {};
    var _onFinally = function() {};

    /// ************************************************************************
    /// Public Properties
    /// ************************************************************************
    Object.defineProperty(this, 'status', {
          get: function() { return _status; }
    });
    Object.defineProperty(this, 'resolvedWith', {
          get: function() { return _resolvedWith; }
    });
	Object.defineProperty(this, 'rejectedWith', {
          get: function() { return _rejectedWith; }
    });

    /// ************************************************************************
    /// Privileged Methods
    /// ************************************************************************
    this.then = function(func) {
		_onThen = func;
		return this;
	};
	this.onRejected = function(func) {
		_onRejected = func;
		return this;
	};
	this.finally = function(func) {
		_onFinally = func;
		return this;
	};
	this.resolveWith = function(value) {
		_resolvedWith = value;
		_status = 'RESOLVED';
		_onThen(value);
		return _onFinally(value);
	};
	this.rejectWith = function(value) {
		_rejectedWith = value;
		_status = 'REJECTED';
		_onRejected(value);
		return _onFinally(value);
	};
};

module.exports = SimplePromise;
