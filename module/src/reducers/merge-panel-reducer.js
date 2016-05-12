import { layout } from '../utils/layout'

export default (state, payload) => {
    let newIndex = Object.assign({}, state.index)
    const target = layout(newIndex).getProps(payload.target)
    const parent = layout(newIndex).getProps(target.parentID)
    parent.children.forEach(function(child) {
        if (child.parentIndex > target.parentIndex) {
            newIndex[child.id].parentIndex--
        }
    })
    delete newIndex[target.id]
    newIndex = layout(newIndex).clean()
    return Object.assign({}, state, {
        merge: {
            isMerging: false,
            panelID: undefined,
            intent: undefined
        },
        index: newIndex
    })
}