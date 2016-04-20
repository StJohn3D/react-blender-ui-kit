import { combineReducers } from 'redux';
import friendList from './friendList';
import { MOUSE, REGISTER } from '../constants/action-types'

const initialState = {
  mouse: {
    position: {
      x: 0,
      y: 0
    },
    isLeftDown: false
  },
  containers: {},
  panels: []
}

const rootReducer = combineReducers({
  timberUI: function(state = initialState, action) {
    switch (action.type) {

      case MOUSE.LEFT_BUTTON_PRESSED:
      case MOUSE.LEFT_BUTTON_RELEASED:
        return Object.assign({}, state, {
          mouse: {
            isLeftDown: action.payload.isLeftDown
          }
        })

      case REGISTER.CONTAINER:
        let stateOverride = {
          containers: {
            ...state.containers
          }
        }
        stateOverride.containers[action.payload.id] = action.payload
        return Object.assign({}, state, stateOverride)

      default:
        return initialState
    }
  }
});

export default rootReducer;
