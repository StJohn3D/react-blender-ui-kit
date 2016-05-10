import { RESIZE } from '../constants/action-types'

export const beginResizing = (id) => {
  return {
    type: RESIZE.BEGIN,
    payload: {
      panelID: id
    }
  }
}

export const doneResizing = () => {
  return {
    type: RESIZE.DONE,
    payload: {}
  }
}
