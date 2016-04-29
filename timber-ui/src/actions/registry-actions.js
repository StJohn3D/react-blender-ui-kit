import { REGISTER } from '../constants/action-types'

export const registerContainer = payload => ({
    type: REGISTER.CONTAINER,
    payload: payload
})

export const registerPanel = payload => ({
    type: REGISTER.PANEL,
    payload: payload
})

export const registerTools = payload => ({
    type: REGISTER.TOOLS,
    payload: payload
})