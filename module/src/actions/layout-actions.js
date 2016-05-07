import { LAYOUT } from '../constants/action-types'

export const initiateLayout = payload => ({
    type: LAYOUT.INIT,
    payload: payload
})