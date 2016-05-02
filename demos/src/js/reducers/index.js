import { combineReducers } from 'redux';
import friendList from './friendList';
import { MOUSE, REGISTER, RESIZE, SELECTION } from '../constants/action-types'

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

			default:
			return initialState
		}
	},
	data: function(state = initialData, action) {
		switch (action.type) {
			case SELECTION.CHANGED:
			return Object.assign({}, state, {
				selectedIndex: action.payload.index
			})
			default:
			return initialData
		}
	}
});

export default rootReducer;
