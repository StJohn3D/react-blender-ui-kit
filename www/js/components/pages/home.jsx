'use strict';

define(["react", "jsx!_/ui/container", "jsx!_/ui/panel", "jsx!_/debug"],
function(React ,  Container          ,  Panel          ,  Debug) {

	var Home = React.createClass({
		render: function() {
			return (
				<Container flow="Horizontal" content={[
					<Panel width='250px' />,	<Panel  content={
													<Container content={[
														<Panel content={<Debug />} height='100px' />,
														<Panel content={
															<Container flow="Horizontal" reverse={false} content={[
																<Panel />, <Panel width='250px' />, <Panel width='250px' />,
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