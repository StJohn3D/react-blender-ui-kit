import { MOUSE } from '../constants/action-types'

export const pressLeftMouseButton = e => {
  return {
    type: MOUSE.LEFT_BUTTON_PRESSED,
    payload: {
      isLeftDown: true
    }
  }
}

export const releaseLeftMouseButton = e => {
  return {
    type: MOUSE.LEFT_BUTTON_RELEASED,
    payload: {
      isLeftDown: false
    }
  }
}
