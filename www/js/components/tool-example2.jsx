'use strict';

define(["react",
		"flux/stores/example-store",
		"flux/actions/example-actions",
], function(React, ExampleStore, ExampleActions) {

	var ToolExample2 = React.createClass({
		getInitialState: function() {
			return {
				selectedIndex: ExampleStore.selectedIndex,
				things: ExampleStore.things,
				storeListenerIDs: []
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
				var classes = index === current ? "item selected" : "item";
				output.push(<li onClick={this.handleClick.bind(this, index)} className={classes}><span>{things[index]}</span></li>);
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
		componentDidMount: function() {
			var exampleStoreListenerID = ExampleStore.addListener(this.handleExampleChange);
			var listenerIDs = [ exampleStoreListenerID ];
			this.setState({
				storeListenerIDs: listenerIDs
			});
		},
		componentWillUnmount: function() {
			var listenerIDs = this.state.storeListenerIDs
			listenerIDs.forEach(function( listenerID ) {
				listenerID.remove();
			});
		},
		render: function() {
			return (
				<div className="tool-example">
					{this.props.toolSelector}
					<h2>Tool example 2</h2>
					<ul>
						{this.buildDisplay()}
					</ul>
				</div>
			);
		}
	});

	ToolExample2.niceName = "Example 2";

	return ToolExample2;
});