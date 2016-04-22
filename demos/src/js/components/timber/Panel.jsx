import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import generateID from '../../utils/generate-id'
import { registerPanel } from '../../actions/registry-actions'
import PANEL_TYPE from '../../constants/panel-types'
import CONTAINER_FLOW from '../../constants/container-flows'
import ResizeHandle from './ResizeHandle'
import HighVolumeStore from '../../utils/high-volume-store'

class Panel extends Component {
  constructor() {
    super()
    this.id = generateID('PANEL')
    this.state = {}
  }

  buildResizer() {
    const { type, parentContainerID, containerIndex, flow } = this.props
    const handleProps = {
      id: this.id, type, parentContainerID, containerIndex, flow
    }
    switch (type) {
      case PANEL_TYPE.LEFT:
      case PANEL_TYPE.CENTER:
      case PANEL_TYPE.TOP:
      case PANEL_TYPE.MIDDLE:
        return <ResizeHandle {...handleProps} />

      default:
        return undefined
    }
  }

  getContainerInfo(props) {
    const { resize, panels, parentContainerID, containerIndex } = props
    let amIBeingResized = false
    let doIComeAfterThePanelBeingResized = false
    for (let panelKey in panels) {
      let panel = panels[panelKey]
      if (panel.parentContainerID === parentContainerID) {
        if (this.id === resize.panelID) {
          amIBeingResized = true
        }
        else if (resize.containerIndex + 1 === containerIndex) {
          doIComeAfterThePanelBeingResized = true
        }
      }
    }
    return {
      amIBeingResized,
      doIComeAfterThePanelBeingResized
    }
  }

  componentWillUnmount() {
    if (typeof this.unsubscribe === 'function') {
      this.unsubscribe()
      delete this.unsubscribe
    }
  }

  componentWillUpdate(nextProps) {
    delete this.resizedHeight
    delete this.resizedWidth

    const { resize, panels, parentContainerID, flow, type } = nextProps
    if (resize.isResizing) {
      if (resize.parentContainerID !== parentContainerID) {
          if (flow === CONTAINER_FLOW.VERTICAL && type === PANEL_TYPE.BOTTOM) {
            this.resizedHeight = 'auto'
          }
      }
      else {
        const containerInfo = this.getContainerInfo(nextProps)
        if (containerInfo.doIComeAfterThePanelBeingResized) {
          switch (flow) {
            case CONTAINER_FLOW.VERTICAL:
              this.resizedHeight = 'auto'
              break
            case CONTAINER_FLOW.HORIZONTAL:
              this.resizedWidth = 'auto'
              break
          }
        }
        else if (containerInfo.amIBeingResized) {
          switch (flow) {
            case CONTAINER_FLOW.VERTICAL:
              this.handleResizeV()
              break
            case CONTAINER_FLOW.HORIZONTAL:
              this.handleResizeH()
              break
          }
        }
      }
    } else {
      if (typeof this.unsubscribe === 'function') {
        this.unsubscribe()
        delete this.unsubscribe
      }
    }
  }

  render() {
    const { children, width, height, resize, panels, parentContainerID, flow, type } = this.props
    let style = {
      width: this.state.width || width || 'auto',
      height: this.state.height || height || 'auto'
    }

    const resizer = this.buildResizer()
    
    return (
      <section className="timber-panel" style={style}>
        {children}
        {resizer}
      </section>
    )
  }

  getClientWidth() {
    return ReactDOM.findDOMNode(this).clientWidth
  }
  getClientHeight() {
    return ReactDOM.findDOMNode(this).clientHeight
  }

  handleResizing(updateFunc) {
    if (!this.unsubscribe) this.unsubscribe = HighVolumeStore.subscribe(updateFunc)
  }
  
	handleResizeH() {
    console.log('H')
		const startX = HighVolumeStore.mouseX;
		const startWidth = this.getClientWidth();
		const updateWidth = () => {
			const newWidth = Number(startWidth) + (HighVolumeStore.mouseX - startX);
			this.setState({width: newWidth + 'px'})
		}
  
		this.handleResizing(updateWidth)
	}
  
	handleResizeV() {
		const startY = HighVolumeStore.mouseY;
		const startHeight = this.getClientHeight();
		const updateHeight = () => {
			const newHeight = Number(startHeight) + (HighVolumeStore.mouseY - startY);
			this.setState({height: newHeight + 'px'})
		}
  
		this.handleResizing(updateHeight)
	}

  // after panel renders, register it in the store
  componentDidMount() {
    const { dispatch, tools, parentContainerID, containerIndex } = this.props
    const node = ReactDOM.findDOMNode(this)
    dispatch(registerPanel({
      id: this.id, // todo make this a required proptype
      width: node.clientWidth,
      height: node.clientHeight,
      parentContainerID,
      containerIndex,
      tools: tools || [],
    }))
  }
}

const mapStateToProps = state => ({
  resize: state.timberUI.resize,
  panels: state.timberUI.panels
})

export default connect(mapStateToProps)(Panel)
