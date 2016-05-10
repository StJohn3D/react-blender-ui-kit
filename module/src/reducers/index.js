import { RESIZE, UI, LAYOUT } from '../constants/action-types'
import splitPanelReducer from './split-panel-reducer'

const initialState = {
    resize: {
        isResizing: false,
        panelID: undefined,
        parentContainerID: undefined,
        containerIndex: undefined
    },
    tools: [],
    index: {}
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
                    panelID: action.payload.panelID
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
            return Object.assign({}, state, {
                index: {
                    ...state.index,
                    [action.payload.panelID]: {
                        ...state.index[action.payload.panelID],
                        toolIndex: action.payload.selectedIndex
                    }
                }
            })

        case LAYOUT.SPLIT_PANEL:
            return splitPanelReducer( state, action.payload )

        default:
            return state
    }
}

export default reduxUIPanelsReducer