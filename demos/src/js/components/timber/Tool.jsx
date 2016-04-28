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
            const selector = <select onChange={this.handleToolChange.bind(this)}>{tools.map((tool, index) => {
                return <option key={index}>{tool.type.niceName}</option>
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