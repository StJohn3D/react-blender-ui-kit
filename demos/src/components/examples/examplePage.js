'use strict'; /* eslint-disable no-unused-vars */

var React = require('react');
var timber = require('timber-ui');
var Container = timber.container;
var Panel = timber.panel;
var MouseActions = require('../../actions/mouseActions');
var ToolExample1 = require('./toolExample1');
var ToolExample2 = require('./toolExample2');
var Debug = require('./debug');

var Home = React.createClass({
	render: function() {
		return (
			<div className='timber-ui'
				onMouseMove={MouseActions.move}
				onMouseUp={MouseActions.up}
				onMouseDown={MouseActions.down}
			>
				<Container
				name="Home"
				flow="Horizontal"
				tools={[
					<ToolExample1 />,
					<ToolExample2 />,
					<Debug />
				]} content={[
					<Panel toolIndex={1} width='50%' />,	<Panel content={
													<Container name="Right" content={[
														<Panel toolIndex={0} height='100px' />,
														<Panel content={
															<Container name="Middle" flow="Horizontal" minWidth="600" reverse={false} content={[
																<Panel toolIndex={1} width='250px' />, <Panel toolIndex={0}/>, <Panel toolIndex={0}/>
															]} />
														} />,
														<Panel toolIndex={0} height='100px' />
													]}/>
												} />
				]}/>
			</div>
		);
	}
});

module.exports = Home;
