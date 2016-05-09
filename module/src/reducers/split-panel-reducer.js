import { UI } from '../constants/action-types'
import flow from '../constants/container-flows'
import { layout } from '../utils/layout'

const splitHorizontal = (state, payload) => {
    const { parentContainerFlow, newPanelID, parentID, newParentIndex, toolIndex } = payload
    const { children } = layout(state.index).getProps(parentID)


    switch ( parentContainerFlow ) {
        case flow.HORIZONTAL:
            let newIndex = Object.assign({}, state.index, {
                [newPanelID]: {
                    type: 'Panel',
                    parentID,
                    parentIndex: newParentIndex,
                    toolIndex,
                }
            })
            children.forEach((child) => {
                newIndex[child.id].parentIndex = child.parentIndex < newParentIndex ?
                    child.parentIndex : child.parentIndex + 1
            })
            return Object.assign({}, state, {
                index: newIndex
            })
        case flow.VERTICAL:
            break
        default:
            return state
    }
}

export default (state, payload) => {
    switch ( payload.intent ) {
        case UI.SPLIT.HORIZONTAL:
            return splitHorizontal( state, payload )
        case UI.SPLIT.VERTICAL:
            break
        default:
            return state
    }
}