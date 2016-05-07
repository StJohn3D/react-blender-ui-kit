import { RESIZE, UI, LAYOUT } from '../constants/action-types'

const initialState = {
    resize: {
        isResizing: false,
        panelID: undefined,
        parentContainerID: undefined,
        containerIndex: undefined
    },
    tools: [],
    index: []
}

const reduxUIPanelsReducer = function(state = initialState, action) {
    let stateOverride
    switch (action.type) {
        case LAYOUT.INIT:
            return Object.assign({}, state, {
                tools: action.payload.tools,
                index: action.payload.index
            })

        case RESIZE.BEGIN:
            return Object.assign({}, state, {
                resize: {
                    isResizing: true,
                    panelID: action.payload.panelID,
                    parentContainerID: action.payload.parentContainerID,
                    containerIndex: action.payload.containerIndex
                }
            })

        case RESIZE.DONE:
            return Object.assign({}, state, {
                resize: {
                    isResizing: false,
                    panelID: undefined,
                    parentContainerID: undefined,
                    containerIndex: undefined
                }
            })

        case UI.TOOL_SELECTED:
            stateOverride = {
                panels: {
                    ...state.panels
                }
            }
            stateOverride.panels[action.payload.panelID].selectedToolIndex = action.payload.selectedIndex
            return Object.assign({}, state, stateOverride)

        default:
            return state
    }
}

export default reduxUIPanelsReducer