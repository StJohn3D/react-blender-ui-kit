'use strict';

define(["react", "jsx!_/ui/container", "jsx!_/ui/panel", "jsx!_/tool-example1", "jsx!_/tool-example2"],
function(React ,  Container          ,  Panel          ,  ToolExample1        ,  ToolExample2) {

	var Home = React.createClass({
		render: function() {
			return (
				<Container flow="Horizontal" tools={[<ToolExample1 />, <ToolExample2 />]} content={[
					<Panel toolIndex={1} width='250px' />,	<Panel  content={
													<Container content={[
														<Panel toolIndex={1} height='100px' />,
														<Panel content={
															<Container flow="Horizontal" minWidth="480" reverse={false} content={[
																<Panel width='250px' />, <Panel />, <Panel width='250px' />, <Panel />,
															]} />
														} />,
														<Panel toolIndex={0} height='100px' />
													]}/>
												} />,
				]}/>
			);
		}
	});

	return Home;
});