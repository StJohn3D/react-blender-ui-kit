'use strict';

define(["react", "jsx!_/row"],
function(React,         Row) {

  var Column = React.createClass({
    getInitialState: function() {
      return {
        rows: [1],
      };
    },
    handleSplit: function() {
      this.setState(function(state) {
        var updatedRows = state.rows.push(1);
        return {
          rows: updatedRows,
        }
      });
    },
    render: function() {
      return (
        <section className="column">
          I am a column!
          <Row onClick={this.handleSplit}/>
          <Row onClick={this.handleSplit}/>
        </section>
      );
    }
  });

  return Column;
});