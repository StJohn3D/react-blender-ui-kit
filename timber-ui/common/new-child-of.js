'use strict';

module.exports = function(ParentClass) {
	var Child = function() {};
	Child.prototype = new ParentClass();
	return new Child();
};
