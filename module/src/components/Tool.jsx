import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { toolSelected } from '../actions/ui-actions'

class Tool extends Component {
    handleToolChange(e) {
        const { dispatch, panelID } = this.props
        const selectedIndex = e.target.selectedIndex
        dispatch(toolSelected({
            panelID,
            selectedIndex
            })
        )
    }
    render() {
        const { tools, panelID, selectedIndex } = this.props
        if ( tools.length ) {
            const tool = tools[ selectedIndex || 0 ]
            const value = tool.props.name || tool.type.niceName || tool.type.displayName
            const selector = <select value={value} onChange={this.handleToolChange.bind(this)}>{tools.map((tool, index) => {
                const opValue = tool.props.name || tool.type.niceName || tool.type.displayName
                return <option value={opValue} key={index}>{opValue}</option>
            })}</select>
            return (
                <tool.type toolSelector={selector} {...tool.props}/>
            )
        } else return null
    }
}

const mapStateToProps = state => ({
    tools : state.repanel.tools
})


export default connect(mapStateToProps)(Tool)