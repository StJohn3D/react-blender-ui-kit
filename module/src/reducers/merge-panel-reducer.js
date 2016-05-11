import { layout } from '../utils/layout'

export default (state, payload) => {
    let newIndex = Object.assign({}, state.index)
    delete newIndex[payload.target]
    return Object.assign({}, state, {
        merge: {
            isMerging: false,
            panelID: undefined,
            intent: undefined
        },
        index: newIndex
    })
}