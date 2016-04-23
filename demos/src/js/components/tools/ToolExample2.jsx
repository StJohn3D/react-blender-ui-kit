import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { select } from '../../actions/data-actions'

class ToolExample2 extends Component {
	handleClick(index) {
		const { dispatch } = this.props
		dispatch(select(index))
	}

	buildDisplay() {
		const { list: thingsList, selectedIndex } = this.props.things
		return thingsList.map( (value, index) => {
			const classes = index === selectedIndex ?
			'tool-example-2-item tool-example-2-selected' : 'tool-example-2-item';
			return (
				<li key={index} onClick={this.handleClick.bind(this, index)} className={classes}>
					<span>{value}</span>
				</li>
			)
		})
	}

	render() {
		const { toolSelector } = this.props
		return (
			<div className='tool-example-2'>
				{toolSelector}
				<h2>Tool example 2</h2>
				<ul>
					{this.buildDisplay()}
				</ul>
			</div>
		)
	}
}

ToolExample2.niceName = 'Tool Example 2'

const mapStateToProps = state => ({
	things: state.data.things
})

export default connect(mapStateToProps)(ToolExample2)
