'use strict';

define(["react", "jsx!_/ui/container", "jsx!_/ui/panel", "jsx!_/tool-example1", "jsx!_/tool-example2"],
function(React ,  Container          ,  Panel          ,  ToolExample1        ,  ToolExample2) {

	var Home = React.createClass({
		render: function() {
			return (
				<Container name="Home" flow="Horizontal" tools={[
					<ToolExample1 />,
					<ToolExample2 />
				]} content={[
					<Panel toolIndex={1} width='250px' />,	<Panel content={
													<Container name="Right" content={[
														<Panel toolIndex={0} height='100px' />,
														<Panel content={
															<Container name="Middle" flow="Horizontal" minWidth="600" reverse={false} content={[
																<Panel toolIndex={1} width='250px' />, <Panel toolIndex={0}/>, <Panel toolIndex={0}/>
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