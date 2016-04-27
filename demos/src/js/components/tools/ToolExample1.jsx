import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { select } from '../../actions/data-actions'
require("./toolExample1.css");

class ToolExample1 extends Component {
	handleClick(index) {
		const { dispatch } = this.props
		dispatch(select(index))
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
		const { toolSelector, name } = this.props
		return (
			<div className='tool-example-1'>
				{toolSelector}
				<h2>{name || 'Tool example 1'}</h2>
				<div>
					{this.buildDisplay()}
				</div>
			</div>
		)
	}
}

ToolExample1.niceName = 'Tool Example 1'

const mapStateToProps = state => ({
	things: state.data.things
})

export default connect(mapStateToProps)(ToolExample1)
