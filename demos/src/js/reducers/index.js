import { combineReducers } from 'redux';
import friendList from './friendList';
import { MOUSE } from '../constants/action-types'

const initialState = {
  mouse: {
    position: {
      x: 0,
      y: 0
    },
    isLeftDown: false
  },
  containers: [],
  panels: []
}

const rootReducer = combineReducers({
  timberUI: function(state = initialState, action) {
    switch (action.type) {

      case MOUSE.LEFT_BUTTON_PRESSED:
      case MOUSE.LEFT_BUTTON_RELEASED:
        return Object.assign({}, state, {
          ...state,
          mouse: {
            ...state.position,
            isLeftDown: action.payload.isLeftDown
          }
        })

      default:
        return initialState
    }
  }
});

export default rootReducer;
