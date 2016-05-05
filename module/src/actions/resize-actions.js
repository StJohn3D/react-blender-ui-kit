import { RESIZE } from '../constants/action-types'

export const beginResizing = (panelID, parentContainerID, containerIndex) => {
  return {
    type: RESIZE.BEGIN,
    payload: {
      panelID,
      parentContainerID,
      containerIndex
    }
  }
}

export const doneResizing = () => {
  return {
    type: RESIZE.DONE,
    payload: {}
  }
}
