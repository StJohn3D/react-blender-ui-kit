'use strict';

define(["react"], function(React) {

	var App = React.createClass({
	  render: function() {
	    return (
	      <div className="main">
	      	Hello world!
	      </div>
	    );
	  }
	});

	// ReactDOM.render(
	// 	<App />,
	// 	document.getElementById("react-blender-ui")
	// );

  return App;
});