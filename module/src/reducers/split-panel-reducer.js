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
            const containerID = generateID()
            const rightPanelID = generateID()
            return Object.assign({}, state, {
                index: {
                    ...state.index,
                    [containerID]: {
                        type: 'Container',
                        parentID: panelID,
                        parentIndex: 0,
                        flow: flow.HORIZONTAL
                    },
                    [resizeID]: {
                        type: 'Panel',
                        parentID: containerID,
                        parentIndex: 0,
                        toolIndex,
                    },
                    [rightPanelID]: {
                        type: 'Panel',
                        parentID: containerID,
                        parentIndex: 1,
                        toolIndex,
                    }
                }
            })
        default:
            return state
    }
}

const splitVertical = (state, payload) => {
    const { panelID, parentContainerFlow, resizeID, parentID, parentIndex, toolIndex } = payload
    const { children } = layout(state.index).getProps(parentID)


    switch ( parentContainerFlow ) {
        case flow.HORIZONTAL:
            const containerID = generateID()
            const rightPanelID = generateID()
            return Object.assign({}, state, {
                index: {
                    ...state.index,
                    [containerID]: {
                        type: 'Container',
                        parentID: panelID,
                        parentIndex: 0,
                        flow: flow.VERTICAL
                    },
                    [resizeID]: {
                        type: 'Panel',
                        parentID: containerID,
                        parentIndex: 0,
                        toolIndex,
                    },
                    [rightPanelID]: {
                        type: 'Panel',
                        parentID: containerID,
                        parentIndex: 1,
                        toolIndex,
                    }
                }
            })
        case flow.VERTICAL:
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
        default:
            return state
    }
}

export default (state, payload) => {
    switch ( payload.intent ) {
        case UI.SPLIT.HORIZONTAL:
            return splitHorizontal( state, payload )
        case UI.SPLIT.VERTICAL:
            return splitVertical( state, payload )
        default:
            return state
    }
}