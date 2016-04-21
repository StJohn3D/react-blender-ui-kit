import { RESIZE } from '../constants/action-types'

export const beginResizing = panelID => {
  return {
    type: RESIZE.BEGIN,
    payload: {
      panelID
    }
  }
}

export const doneResizing = () => {
  return {
    type: RESIZE.DONE,
    payload: {}
  }
}