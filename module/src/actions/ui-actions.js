import { UI } from '../constants/action-types'

export const toolSelected = payload => ({
    type: UI.TOOL_SELECTED,
    payload: payload
})

export const beginResizing = panelID => ({
    type: UI.RESIZE_BEGIN,
    payload: {
        panelID
    }
})

export const doneResizing = () => ({
    type: UI.RESIZE_DONE,
    payload: {}
})

export const startMerge = ({panelID, intent}) => ({
    type: UI.MERGE_START,
    payload: {
        panelID,
        intent
    }
})