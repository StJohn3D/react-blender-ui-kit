import { combineReducers } from 'redux';
import { SELECTION } from '../constants/action-types'
import { timberUIReducer } from 'timber-ui'

const initialData = {
    things: {
        list: ['Thing 1', 'Thing 2', 'Thing 3'],
        selectedIndex: 0
    }
}

const rootReducer = combineReducers({
    timberUI: timberUIReducer,
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
