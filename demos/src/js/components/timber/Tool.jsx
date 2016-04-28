import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { toolSelected } from '../../actions/ui-actions'

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
        const { tools, panels, panelID } = this.props
        if ( tools.length ) {
            const tool = tools[panels[panelID].selectedToolIndex]
            const value = tool.props.name || tool.type.niceName || tool.type.displayName
            const selector = <select onChange={this.handleToolChange.bind(this)}>{tools.map((tool, index) => {
                const opValue = tool.props.name || tool.type.niceName || tool.type.displayName
                return <option selected={opValue === value} key={index}>{opValue}</option>
            })}</select>
            return (
                <tool.type toolSelector={selector} {...tool.props}/>
            )
        } else return null
    }
}

const mapStateToProps = state => ({
    tools : state.timberUI.tools,
    panels: state.timberUI.panels
})


export default connect(mapStateToProps)(Tool)