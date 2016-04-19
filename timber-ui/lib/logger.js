var logger = function(context, verbose) {
	var _this = this;
	var _log = function(message) {
		if ( console ) {
			console.log(context + ': ' + message);
		}
	}
	this.verbose = verbose;
	this.error = function(message, reason) {
		_log(message);
		_log(reason);
	};
	this.info = function(message) {
		_log(message);
	};
	this.debug = function(message) {
		if (_this.verbose) _log(message);
	};
}
module.exports = logger;