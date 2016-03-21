'use strict';

define(["react", "jsx!_/home"],
function(React,         Home) {

	var App = React.createClass({
	  render: function() {
	    return (
	      	<Home />
	    );
	  }
	});

  return App;
});