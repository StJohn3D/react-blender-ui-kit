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
        const panel = panels[panelID]
        const { parentContainerID, index } = panel
        const allPanels = _.filter(_.sortBy(panels, x => (x.index)), x =>
          (x.parentContainerID === parentContainerID))
        const previousPanels = _.filter(allPanels, x => (x.index < panel.index))
        const delta = {
          x: mousePosition.clientX + mouseOffset.x - panel.clientWidth
            - _.sumBy(previousPanels, x => (x.clientWidth)),
        }
        let newPanels = { ...panels }
        switch (flow) {

          case CONTAINER_FLOW.HORIZONTAL: {
            const nextPanel = allPanels[index + 1]
            newPanels[panelID] = {
              ...panel,
              clientWidth: panel.clientWidth + delta.x,
            }
            newPanels[nextPanel.panelID] = {
              ...nextPanel,
              clientWidth: nextPanel.clientWidth - delta.x,
            }
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
