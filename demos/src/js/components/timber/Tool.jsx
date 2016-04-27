import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Tool extends Component {
    render() {
        const { tools, panels, panelID } = this.props
        if ( tools.length ) {
            const tool = tools[panels[panelID].selectedToolIndex]
            const selector = <select></select>
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