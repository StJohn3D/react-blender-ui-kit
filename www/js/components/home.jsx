'use strict';

define(["react", "jsx!_/column"],
function(React,         Column) {

	var Home = React.createClass({
	  render: function() {
	    return (
	      <section className="container">
	      	This is the home page! And Im New
	      	<Column />
	      </section>
	    );
	  }
	});

  return Home;
});