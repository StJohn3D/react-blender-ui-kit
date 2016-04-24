import { combineReducers } from 'redux';
import CONTAINER_FLOW from './constants/container-flows'
import _ from 'lodash'

const initialState = {}

const reducer = combineReducers({
  workspacr: (state = initialState, action) => {
    const { type, payload } = action
    const mouseOffset = { x: 3, y: 0 }
    switch (type) {
      case 'INITIALIZE_STATE':
        return Object.assign({}, state, payload)

      case 'GRAB_RESIZE_HANDLE':
      case 'DRAG_RESIZE_HANDLE':
      case 'DROP_RESIZE_HANDLE':
        const { panelID, mousePosition, flow } = payload
        const { panels } = state
        const { parentContainerID, index } = panels[panelID]
        const affectedPanels = _.filter(panels, x =>
          (x.parentContainerID === parentContainerID))
        const otherPanels = _.filter(affectedPanels, x =>
          (x.panelID != panelID))
        let newPanels = { ...panels }
        switch (flow) {

          case CONTAINER_FLOW.HORIZONTAL: {
            const totalWidth = _.sumBy(affectedPanels, x => (x.clientWidth))
            const delta = mousePosition.clientX + mouseOffset.x - panels[panelID].clientWidth
            newPanels[panelID] = {
              ...panels[panelID],
              clientWidth: panels[panelID].clientWidth + delta
            }
            otherPanels.forEach(x => {
              newPanels[x.panelID] = {
                ...panels[x.panelID],
                clientWidth: x.clientWidth - delta
              }
            })
            break
          }

        }

        return Object.assign({}, state, {
          resizing: type === 'DROP_RESIZE_HANDLE' ? undefined : {
            panelID,
          },
          panels: newPanels
        })

      default:
        return state
    }
  }
});

export default reducer;
