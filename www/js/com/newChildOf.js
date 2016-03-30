'use strict';

define([], function() {
	return function(parentClass) {
		var child = function() {};
		child.prototype = new parentClass();
		return new child();
	};
});