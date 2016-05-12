import React from 'react'
import { connect } from 'react-redux'
import Panel from './Panel'
import Row from './Row'
import PANEL_TYPE from '../constants/panel-types'
import CONTAINER_FLOW from '../constants/container-flows'
import { layout } from '../utils/layout'

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

const Container = ({id, index}) => {
    const props = layout(index).getProps(id)
    let flow = props.flow
    if ( typeof flow === 'string' ) flow = flow.toUpperCase();
    if ( flow && flow != CONTAINER_FLOW.HORIZONTAL && flow != CONTAINER_FLOW.VERTICAL ) {
        if ( console && console.warn ) console.warn("Container's flow prop expects either HORIZONTAL or VERTICAL, got " + flow + " - Defaulting to VERTICAL")
    }
    const _flow = flow == CONTAINER_FLOW.HORIZONTAL ? CONTAINER_FLOW.HORIZONTAL : CONTAINER_FLOW.VERTICAL
    const childrenArray = props.children
    return (
        <section className="ruip-container">
            {childrenArray.map((child, i) => {
                if (child.type != 'Panel') return false
                const type = computePanelType(_flow, i, childrenArray.length - 1)
                const childComponent = <Panel key={'child-panel' + i} id={child.id} type={type} flow={_flow}/>
                switch (_flow) {
                    case CONTAINER_FLOW.VERTICAL:
                        return (
                            <Row key={'child-row' + i}>
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

const mapStateToProps = state => ({
    index: state.repanel.index
})

export default connect(mapStateToProps)(Container)
