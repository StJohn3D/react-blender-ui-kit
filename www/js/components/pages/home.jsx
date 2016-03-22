'use strict';

define(["react", "jsx!_/ui/container", "jsx!_/ui/panel"],
function(React,         Container,         Panel) {

	var Home = React.createClass({
		render: function() {
			return (
				<Container flow="Horizontal" content={[
					<Panel width='250px' />,
											<Container content={[
												<Panel height='100px' />,
												<Container flow="Horizontal" content={[
													<Panel />, <Panel width='250px' />,
												]} />,
												<Panel height='50px' />
											]}/>
				]}/>
			);
		}
	});

	return Home;
});