'use strict';

module.exports = function(name, length, caps, lowercase, digits, special, time) {
	name = name || '';
	length = length || 8;
	caps = caps || true;
	lowercase = lowercase || true;
	digits = digits || true;
	special = special || false;
	time = time || false;

	name = name ? name + '_' : '';
	var capsString = caps ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '';
	var lowercaseString = lowercase ? 'abcdefghijklmnopqrstuvwxyz' : '';
	var digitsString = digits ? '0123456789' : '';
	var specialString = special ? '!@#$%&?' : '';
	var timeString = time ? '_' + String(Date.now()) : '';

	var possible = capsString + lowercaseString + digitsString + specialString;
	var id = '';
	while ( id.length < length ) {
		id += possible.charAt(Math.floor(Math.random() * possible.length));
	}

	return name + id + timeString;
};
