import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class ToolExample1 extends Component {
	handleClick(index) {
		// ExampleActions.selectionMade(index);
		console.log('selection made')
	}

	buildDisplay() {
		const { list: thingsList, selectedIndex } = this.props.things

		return thingsList.map( (value, index) => {
			const classes = index === selectedIndex ?
			'tool-example-1-block tool-example-1-selected' : 'tool-example-1-block';
			return (
				<div key={index} onClick={this.handleClick.bind(this, index)} className={classes}>
					<span>{value}</span>
				</div>
			)
		})
	}

	render() {
		const { toolSelector } = this.props
		return (
			<div className='tool-example-1'>
				{toolSelector}
				<h2>Tool example 1</h2>
				<div>
					{this.buildDisplay()}
				</div>
			</div>
		)
	}
}

ToolExample1.niceName = 'Tool Example 1'

const mapStateToProps = state => ({
	things: state.timberUI.things
})

export default connect(mapStateToProps)(ToolExample1)
