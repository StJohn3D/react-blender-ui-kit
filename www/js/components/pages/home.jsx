'use strict';

define(["react", "jsx!_/ui/container", "jsx!_/ui/panel"],
function(React ,  Container          ,  Panel        ) {

	var Home = React.createClass({
		render: function() {
			return (
				<Container flow="Horizontal" content={[
					<Panel width='250px' />,	<Panel  content={
													<Container content={[
														<Panel height='100px' />,
														<Panel content={
															<Container flow="Horizontal" reverse={false} content={[
																<Panel width='250px' />, <Panel />, <Panel width='250px' />, <Panel />,
															]} />
														} />,
														<Panel height='100px' />
													]}/>
												} />,
				]}/>
			);
		}
	});

	return Home;
});