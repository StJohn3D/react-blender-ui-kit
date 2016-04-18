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
			<Container name="Home" flow="Horizontal" tools={[
				<ToolExample1 />,
				<ToolExample2 />,
				<Debug />
			]}>
				<Panel toolIndex={1} width='50%' />
				<Panel>
					<Container name="Right">
						<Panel toolIndex={0} height='100px' />
						<Panel>
							<Container name="Middle" flow="Horizontal" minWidth={600} reverse={false}>
								<Panel toolIndex={1} width='250px' />
								<Panel toolIndex={0}/>
								<Panel toolIndex={0}/>
							</Container>
						</Panel>
						<Panel toolIndex={0} height='100px' />
					</Container>
				</Panel>
			</Container>
		);
	}
});

module.exports = Home;
