import { UI } from '../constants/action-types'

export const toolSelected = payload => ({
    type: UI.TOOL_SELECTED,
    payload: payload
})