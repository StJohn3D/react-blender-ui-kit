import { UI, LAYOUT } from '../constants/action-types'
import splitPanelReducer from './split-panel-reducer'

const initialState = {
    resize: {
        isResizing: false,
        panelID: undefined
    },
    merge: {
        isMerging: false,
        panelID: undefined,
        intent: undefined
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

        case LAYOUT.SPLIT_PANEL:
            return splitPanelReducer( state, action.payload )

        case LAYOUT.MERGE_PANEL:
            return mergePanelReducer( state, action.payload )

        case UI.MERGE_START:
            return Object.assign({}, state, {
                merge: {
                    isMerging: true,
                    panelID: action.payload.panelID,
                    intent: action.payload.intent
                }
            })
        
        case UI.MERGE_CANCELED:
            return Object.assign({}, state, {
                merge: {
                    isMerging: false,
                    panelID: undefined,
                    intent: undefined
                }
            })

        case UI.RESIZE_BEGIN:
            return Object.assign({}, state, {
                resize: {
                    isResizing: true,
                    panelID: action.payload.panelID
                }
            })

        case UI.RESIZE_DONE:
            return Object.assign({}, state, {
                resize: {
                    isResizing: false,
                    panelID: undefined
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

        default:
            return state
    }
}

export default reduxUIPanelsReducer