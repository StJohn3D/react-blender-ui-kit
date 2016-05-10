import { UI } from '../constants/action-types'

export const toolSelected = payload => ({
    type: UI.TOOL_SELECTED,
    payload: payload
})

export const beginResizing = (id) => {
    return {
        type: UI.RESIZE_BEGIN,
        payload: {
            panelID: id
        }
    }
}

export const doneResizing = () => {
    return {
        type: UI.RESIZE_DONE,
        payload: {}
    }
}