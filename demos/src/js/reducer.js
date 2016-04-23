import { combineReducers } from 'redux';

const initialState = {}

const reducer = combineReducers({
  workspacr: function(state = initialState, action) {
    switch (action.type) {

      case 'INITIAL_ACTION':
        return Object.assign({}, state, {
          layout: action.payload
        })

      default:
        return initialState
    }
  }
});

export default reducer;
