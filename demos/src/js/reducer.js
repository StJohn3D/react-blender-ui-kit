import { combineReducers } from 'redux';

const initialState = {}

const reducer = combineReducers({
  workspacr: function(state = initialState, action) {
    switch (action.type) {

      case 'INITIALIZE_STATE':
        return Object.assign({}, state, action.payload)

      default:
        return initialState
    }
  }
});

export default reducer;
