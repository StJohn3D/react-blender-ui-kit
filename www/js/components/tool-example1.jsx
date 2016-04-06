'use strict';

define(["react",
		"flux/stores/example-store",
		"flux/actions/example-actions",
], function(React, ExampleStore, ExampleActions) {

	var ToolExample1 = React.createClass({
		getInitialState: function() {
			return {
				selectedIndex: ExampleStore.selectedIndex,
				things: ExampleStore.things
			}
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
				var classes = index === current ? "block selected" : "block";
				output.push(<div onClick={this.handleClick.bind(this, index)} className={classes}><span>{things[index]}</span></div>);
				index++;
			};

			return output;
		},
		handleExampleChange: function() {
			this.setState(function(state) {
				return {
					selectedIndex: ExampleStore.selectedIndex,
					things: ExampleStore.things
				}
			});
		},
		listenerIDs: [],
		componentDidMount: function() {
			this.listenerIDs.push(ExampleStore.addListener(this.handleExampleChange));
		},
		componentWillUnmount: function() {
			this.listenerIDs.forEach(function( listenerID ) {
				listenerID.remove();
			});
		},
		render: function() {
			return (
				<div className="tool-example">
					{this.props.toolSelector}
					<h2>Tool example 1</h2>
					<div>
						{this.buildDisplay()}
					</div>
				</div>
			);
		}
	});

	ToolExample1.niceName = "Example 1";

	return ToolExample1;
});