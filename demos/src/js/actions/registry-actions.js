import { REGISTER } from '../constants/action-types'

export const registerContainer = payload => ({
  type: REGISTER.CONTAINER,
  payload: payload
})
