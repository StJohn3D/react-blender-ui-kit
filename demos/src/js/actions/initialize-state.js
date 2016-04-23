import ReactDOM from 'react-dom'

let sequences = {}
const generateID = context => {
  if (!sequences[context]) sequences[context] = 0
  return `${context}_${sequences[context]++}`
}

const buildLayout = root => (
  root ? [root].map((it) => {
      const { clientWidth, clientHeight, offsetTop, offsetLeft } = ReactDOM.findDOMNode(it)
      const containers = buildContainers(it.containers)
      return {
        clientWidth, clientHeight, offsetTop, offsetLeft, containers
      }
    })[0] : undefined
)

const buildContainers = containers => (
  containers ? containers.map((containerConnector, index) => {
    const container = containerConnector.getWrappedInstance()
    container.containerID = generateID('CONTAINER')
    containerConnector.containerID = container.containerID
    const { containerID } = container
    const { clientWidth, clientHeight } = ReactDOM.findDOMNode(container)
    const panels = buildPanels(container.panels)
    const { flow } = container.props
    return {
      containerID, index, clientWidth, clientHeight, panels, flow
    }
  }) : []
)

const buildPanels = panels => (
  panels ? panels.map((panelConnector, index) => {
    const panel = panelConnector.getWrappedInstance()
    panel.panelID = generateID('PANEL')
    panelConnector.panelID = panel.panelID
    const { panelID } = panel
    const { clientWidth, clientHeight } = ReactDOM.findDOMNode(panel)
    const containers = buildContainers(panel.containers)
    return {
      panelID, index, clientWidth, clientHeight, containers
    }
  }) : []
)

export default buildLayout
