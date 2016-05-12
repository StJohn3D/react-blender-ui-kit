import { layout } from '../utils/layout'
import generateID from '../utils/generate-id'

export default (state, payload) => {
    const { panelID, intent, parentContainerFlow, resizeID, parentID, parentIndex, toolIndex } = payload
    const { children } = layout(state.index).getProps(parentID)

    if ( parentContainerFlow === intent ) {
        // SJ:  Container is already flowing in the right direction
        //      We just need to insert a child and update indexes
        let newIndex = Object.assign({}, state.index, {
            [resizeID]: {
                type: 'Panel',
                parentID,
                parentIndex: parentIndex,
                toolIndex,
            }
        })
        children.forEach((child) => {
            newIndex[child.id].parentIndex = child.parentIndex < parentIndex ?
                child.parentIndex : child.parentIndex + 1
        })
        return Object.assign({}, state, {
            index: newIndex
        })
    } else {
        // SJ:  Container is going against the user's intent
        //      We need to create a new container with the correct flow
        //      And add two panels inside - one of which will be resized
        const containerID = generateID()
        const secondPanelID = generateID()
        return Object.assign({}, state, {
            index: {
                ...state.index,
                [containerID]: {
                    type: 'Container',
                    parentID: panelID,
                    parentIndex: 0,
                    flow: intent
                },
                [resizeID]: {
                    type: 'Panel',
                    parentID: containerID,
                    parentIndex: 0,
                    toolIndex,
                },
                [secondPanelID]: {
                    type: 'Panel',
                    parentID: containerID,
                    parentIndex: 1,
                    toolIndex,
                }
            }
        })
    }
}