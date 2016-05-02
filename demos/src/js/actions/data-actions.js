import { SELECTION } from '../constants/action-types'

export const select = (index) => {
  return {
    type: SELECTION.CHANGED,
    payload: {
      index
    }
  }
}
