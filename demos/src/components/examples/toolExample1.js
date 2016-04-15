'use strict';

var React = require('react');
var ExampleStore = require('../../stores/exampleStore');
var ExampleActions = require('../../actions/exampleActions');

var ToolExample1 = React.createClass({
	propTypes: {
		toolSelector: React.PropTypes.element
	},
	getInitialState: function() {
		return {
			selectedIndex   : ExampleStore.selectedIndex,
			things          : ExampleStore.things,
			storeListenerIDs: []
		};
	},
	handleClick: function(index) {
		ExampleActions.selectionMade(index);
	},
	buildDisplay: function() {
		var current = this.state.selectedIndex;
		var things = this.state.things;
		var output = [];
		var index = 0;

		while ( index < things.length ) {
			var classes = index === current ? 'tool-example-1-block tool-example-1-selected' : 'tool-example-1-block';
			output.push(<div key={index} onClick={this.handleClick.bind(this, index)} className={classes}><span>{things[index]}</span></div>);
			index++;
		}

		return output;
	},
	handleExampleChange: function() {
		this.setState(function() {
			return {
				selectedIndex: ExampleStore.selectedIndex,
				things       : ExampleStore.things
			};
		});
	},
	componentDidMount: function() {
		var exampleStoreListenerID = ExampleStore.addListener(this.handleExampleChange);
		var listenerIDs = [ exampleStoreListenerID ];
		this.setState({
			storeListenerIDs: listenerIDs
		});
	},
	componentWillUnmount: function() {
		var listenerIDs = this.state.storeListenerIDs;
		listenerIDs.forEach(function( listenerID ) {
			listenerID.remove();
		});
	},
	render: function() {
		return (
			<div className='tool-example-1'>
				{this.props.toolSelector}
				<h2>Tool example 1</h2>
				<div>
					{this.buildDisplay()}
				</div>
			</div>
		);
	}
});

ToolExample1.niceName = 'Example 1';

module.exports = ToolExample1;
