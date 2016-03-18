'use strict';

define(["react"],
function(React) {

	var Row = React.createClass({
	  render: function() {
	    return (
	      <section className="row">
	      	<div className="split-topright"></div>
	      	I am a Row!!
	      	<div className="split-bottomleft"></div>
	      </section>
	    );
	  }
	});

  return Row;
});