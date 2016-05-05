import { combineReducers } from 'redux';
import { SELECTION } from '../constants/action-types'
import { ReduxUIPanelsReducer } from 'redux-ui-panels'

const initialData = {
    things: {
        list: ['Thing 1', 'Thing 2', 'Thing 3'],
        selectedIndex: 0
    }
}

const rootReducer = combineReducers({
    ReduxUIPanels: ReduxUIPanelsReducer,
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
