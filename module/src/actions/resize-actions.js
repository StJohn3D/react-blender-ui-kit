import { RESIZE } from '../constants/action-types'

export const beginResizing = (id, parentID, parentIndex) => {
  return {
    type: RESIZE.BEGIN,
    payload: {
      panelID: id,
      parentContainerID: parentID,
      containerIndex: parentIndex
    }
  }
}

export const doneResizing = () => {
  return {
    type: RESIZE.DONE,
    payload: {}
  }
}
