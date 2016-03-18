'use strict';

define(["react", "jsx!_/home"],
function(React,         Home) {

	var App = React.createClass({
	  render: function() {
	    return (
	      <div className="app">
	      	<Home />
	      </div>
	    );
	  }
	});

  return App;
});