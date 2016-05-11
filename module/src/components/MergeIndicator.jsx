import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import flow from '../constants/container-flows'
import willMerge from '../constants/merge-directions'
import { cancelMerge } from '../actions/ui-actions'

class MergeIndicator extends Component {
    constructor() {
        super()
        this.state = {
            isMergeTarget: false,
            direction: undefined
        }
    }

    handleMouseOver(e) {
        const {panelID, parentContainerFlow, merge} = this.props
        if ( panelID === merge.panelID && parentContainerFlow === merge.intent ) {
            const direction = parentContainerFlow === flow.HORIZONTAL ? willMerge.FROM_RIGHT : willMerge.FROM_TOP
            this.setState({
                isMergeTarget: true,
                direction
            })
        }
    }

    handleMouseOut(e) {
        this.setState({
            isMergeTarget: false
        })
    }

    handleMouseUp(e) {
        if ( !this.state.isMergeTarget ) {
            this.props.dispatch(cancelMerge())
        }
    }

    render() {
        const {panelID, merge} = this.props
        if ( !merge.isMerging ) return false

        const { isMergeTarget, direction } = this.state
        const handleMouseOver = this.handleMouseOver.bind(this)
        const handleMouseOut = this.handleMouseOut.bind(this)
        const handleMouseUp = this.handleMouseUp.bind(this)
        return (<div
            className={isMergeTarget ? 'ruip-merge-' + direction : 'hidden'}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onMouseUp={handleMouseUp}
        ></div>)
    }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = (dispatch, props) => {
    return { dispatch, }
}

export default connect(mapStateToProps, mapDispatchToProps)(MergeIndicator)