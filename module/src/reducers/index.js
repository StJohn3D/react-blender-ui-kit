import { REGISTER, RESIZE, UI } from '../constants/action-types'

const initialState = {
    resize: {
        isResizing: false,
        panelID: undefined,
        parentContainerID: undefined
    },
    containers: {},
    panels: {},
    tools: []
}

const timberUIReducer = function(state = initialState, action) {
    let stateOverride
    switch (action.type) {
        case REGISTER.CONTAINER:
            stateOverride = {
                containers: {
                    ...state.containers
                }
            }
            stateOverride.containers[action.payload.id] = action.payload
            return Object.assign({}, state, stateOverride)

        case REGISTER.PANEL:
            stateOverride = {
                panels: {
                    ...state.panels
                }
            }
            stateOverride.panels[action.payload.id] = action.payload
            return Object.assign({}, state, stateOverride)

        case REGISTER.TOOLS:
            return Object.assign({}, state, {
                tools: action.payload.tools
            })

        case RESIZE.BEGIN:
            return Object.assign({}, state, {
                resize: {
                    ...state.resize,
                    isResizing: true,
                    panelID: action.payload.panelID,
                    parentContainerID: action.payload.parentContainerID,
                    containerIndex: action.payload.containerIndex
                }
            })

        case RESIZE.DONE:
            return Object.assign({}, state, {
                resize: {
                    ...state.resize,
                    isResizing: false,
                    panelID: undefined,
                    parentContainerID: undefined
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

export default timberUIReducer