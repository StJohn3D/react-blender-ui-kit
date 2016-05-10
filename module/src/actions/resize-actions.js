import { RESIZE } from '../constants/action-types'

export const beginResizing = (id, parentID) => {
  return {
    type: RESIZE.BEGIN,
    payload: {
      panelID: id,
      parentContainerID: parentID
    }
  }
}

export const doneResizing = () => {
  return {
    type: RESIZE.DONE,
    payload: {}
  }
}
