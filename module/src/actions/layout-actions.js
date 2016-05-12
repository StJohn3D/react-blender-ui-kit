import { LAYOUT } from '../constants/action-types'

export const initiateLayout = payload => ({
    type: LAYOUT.INIT,
    payload: payload
})

export const splitPanel = payload => ({
    type: LAYOUT.SPLIT_PANEL,
    payload: payload
})

export const mergePanel = payload => ({
    type: LAYOUT.MERGE_PANEL,
    payload: payload
})