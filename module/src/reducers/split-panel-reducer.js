import { UI } from '../constants/action-types'
import flow from '../constants/container-flows'
import { layout } from '../utils/layout'
import generateID from '../utils/generate-id'

const splitHorizontal = (state, payload) => {
    const { panelID, parentContainerFlow, resizeID, parentID, parentIndex, toolIndex } = payload
    const { children } = layout(state.index).getProps(parentID)


    switch ( parentContainerFlow ) {
        case flow.HORIZONTAL:
            let newIndex = Object.assign({}, state.index, {
                [resizeID]: {
                    type: 'Panel',
                    parentID,
                    parentIndex: parentIndex,
                    toolIndex,
                }
            })
            children.forEach((child) => {
                newIndex[child.id].parentIndex = child.parentIndex < parentIndex ?
                    child.parentIndex : child.parentIndex + 1
            })
            return Object.assign({}, state, {
                index: newIndex
            })
        case flow.VERTICAL:
            const leftPanelID = generateID()
            const rightPanelID = generateID()
            return Object.assign({}, state, {
                index: {
                    ...state.index,
                    [newPanelID]: {
                        type: 'Container',
                        parentID: panelID,
                        parentIndex: 0,
                        flow: flow.HORIZONTAL
                    },
                    [leftPanelID]: {
                        type: 'Panel',
                        parentID: newPanelID,
                        parentIndex: 0,
                        toolIndex,
                    },
                    [rightPanelID]: {
                        type: 'Panel',
                        parentID: newPanelID,
                        parentIndex: 1,
                        toolIndex,
                    }
                }
            })
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