import React, { Component, PropTypes } from 'react'

class MergeIndicator extends Component {
    constructor() {
        super()
        this.state = {
            isMergeTarget: false
        }
    }

    handleMouseOver(e) {
        this.setState({
            isMergeTarget: true
        })
    }

    handleMouseOut(e) {
        this.setState({
            isMergeTarget: false
        })
    }

    handleMouseUp(e) {

    }

    render() {
        const {panelID, merge} = this.props
        if ( !merge.isMerging ) return false

        const { isMergeTarget } = this.state
        const handleMouseOver = this.handleMouseOver.bind(this)
        const handleMouseOut = this.handleMouseOut.bind(this)
        const handleMouseUp = this.handleMouseUp.bind(this)
        return (<div
            className={isMergeTarget ? 'ruip-merge-from-bottom' : 'hidden'}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onMouseUp={handleMouseUp}
        ></div>)
    }
}

export default MergeIndicator