import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import generateID from '../utils/generate-id'
import { registerContainer } from '../actions/registry-actions'
import Row from './Row'
import PANEL_TYPE from '../constants/panel-types'
import CONTAINER_FLOW from '../constants/container-flows'

const computePanelType = (flow, i, lastIndex) => {
    if (lastIndex < 1) return PANEL_TYPE.ONLY
    switch (flow) {
        case CONTAINER_FLOW.HORIZONTAL:
            if (i === 0) return PANEL_TYPE.LEFT
            else if (i < lastIndex) return PANEL_TYPE.CENTER
            return PANEL_TYPE.RIGHT
        case CONTAINER_FLOW.VERTICAL:
            if (i === 0) return PANEL_TYPE.TOP
            else if (i < lastIndex) return PANEL_TYPE.MIDDLE
            else return PANEL_TYPE.BOTTOM
    }
}

class Container extends Component {
    constructor() {
        super()
        this.id = generateID('CONTAINER')
    }

    render() {
        const { children } = this.props
        let { flow } = this.props
        if ( typeof flow === 'string' ) flow = flow.toUpperCase();
        if ( flow && flow != CONTAINER_FLOW.HORIZONTAL && flow != CONTAINER_FLOW.VERTICAL ) {
            if ( console && console.warn ) console.warn("Container's flow prop expects either HORIZONTAL or VERTICAL, got " + flow + " - Defaulting to VERTICAL")
        }
        const _flow = flow == CONTAINER_FLOW.HORIZONTAL ? CONTAINER_FLOW.HORIZONTAL : CONTAINER_FLOW.VERTICAL
        const childrenArray = React.Children.toArray(children)
        return (
            <section className="timber-container">
                {childrenArray.map((child, i) => {
                    const type = computePanelType(_flow, i, childrenArray.length - 1)
                    const childComponent = <child.type
                        key={'child'+i}
                        parentContainerID={this.id}
                        containerIndex={i}
                        type={type}
                        flow={_flow}
                        {...child.props} />
                    switch (_flow) {
                        case CONTAINER_FLOW.VERTICAL:
                            return (
                                <Row key={'child-row'+i}>
                                    {childComponent}
                                </Row>
                            )

                        case CONTAINER_FLOW.HORIZONTAL:
                            return childComponent
                    }
                })}
            </section>
        )
    }

    // after container renders, register it in the store
    componentDidMount() {
        const { dispatch, id, flow, minWidth, tools } = this.props
        dispatch(registerContainer({
            id      : this.id,
            flow    : flow || CONTAINER_FLOW.VERTICAL,
            minWidth: minWidth || '480px',
            tools   : tools || []
        }))
    }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps)(Container)
