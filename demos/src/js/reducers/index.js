import { combineReducers } from 'redux';
import { MOUSE, REGISTER, RESIZE, UI, SELECTION } from '../constants/action-types'

const initialState = {
    resize: {
        isResizing: false,
        panelID: undefined,
        parentContainerID: undefined
    },
    mouse: {
        position: {
            x: 0,
            y: 0
        },
        isLeftDown: false
    },
    containers: {},
    panels: {},
    tools: []
}

const initialData = {
    things: {
        list: ['Thing 1', 'Thing 2', 'Thing 3'],
        selectedIndex: 0
    }
}

const rootReducer = combineReducers({
    timberUI: function(state = initialState, action) {
        let stateOverride
        switch (action.type) {
            case MOUSE.LEFT_BUTTON_PRESSED:
                return Object.assign({}, state, {
                    mouse: {
                        isLeftDown: true
                    }
                })

            case MOUSE.LEFT_BUTTON_RELEASED:
                return Object.assign({}, state, {
                    resize: {
                        ...state.resize,
                        isResizing : false,
                        panelID: undefined,
                        parentContainerID: undefined
                    },
                    mouse: {
                        isLeftDown: false
                    }
                })

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
    },
    data: function(state = initialData, action) {
        switch (action.type) {
            case SELECTION.CHANGED:
                return Object.assign({}, state, {
                    things: {
                        ...state.things,
                        selectedIndex: action.payload.index
                    }
                })
            default:
                return state
        }
    }
});

export default rootReducer;
