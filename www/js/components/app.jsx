'use strict';

define(["react", "jsx!components/home"],
function(React,   Home) {

	var App = React.createClass({
	  render: function() {
	    return (
	      <div className="app">
	      	<Home />
	      </div>
	    );
	  }
	});

	// React.renderComponent(
    //     <Timer />,
    //     document.getElementById('react-blender-ui')
    // );

  return App;
});