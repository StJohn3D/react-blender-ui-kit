import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import flow from '../constants/container-flows'
import willMerge from '../constants/merge-directions'
import { cancelMerge } from '../actions/ui-actions'
import { mergePanel } from '../actions/layout-actions'
import { layout } from '../utils/layout'

class MergeIndicator extends Component {
    constructor() {
        super()
        this.state = {
            isMergeTarget: false,
            direction: undefined
        }
    }

    handleMouseOver(e) {
        if ( !this.props.merge.isMerging ) return false
        const {panelID, parentContainerFlow, merge, index} = this.props

        if ( panelID === merge.panelID
            && parentContainerFlow === merge.intent ) {
            const direction = parentContainerFlow === flow.HORIZONTAL ? willMerge.FROM_RIGHT : willMerge.FROM_TOP
            this.setState({
                isMergeTarget: true,
                direction
            })
        } else {
            const caller = layout(index).getProps(merge.panelID)
            const self = layout(index).getProps(panelID)
            if ( caller.parentID === self.parentID ) {
                if ( parentContainerFlow === flow.HORIZONTAL && caller.parentIndex === self.parentIndex - 1) {
                    this.setState({
                        isMergeTarget: true,
                        direction: willMerge.FROM_LEFT
                    })
                } else if ( parentContainerFlow === flow.VERTICAL && caller.parentIndex === self.parentIndex + 1) {
                    this.setState({
                        isMergeTarget: true,
                        direction: willMerge.FROM_BOTTOM
                    })
                }
            }
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
        } else {
            this.props.dispatch(mergePanel({
                target: this.props.panelID
            }))
        }
    }

    render() {
        const { merge } = this.props
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

const mapStateToProps = state => ({
    merge : state.ReduxUIPanels.merge,
    index : state.ReduxUIPanels.index
})

const mapDispatchToProps = (dispatch, props) => {
    return { dispatch, }
}

export default connect(mapStateToProps, mapDispatchToProps)(MergeIndicator)