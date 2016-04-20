import { combineReducers } from 'redux';
import friendList from './friendList';

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

      case 'MOUSE_LEFT_DOWN':
      case 'MOUSE_LEFT_UP':
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
