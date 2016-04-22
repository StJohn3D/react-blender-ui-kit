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
    console.log('PANEL CONSTRUCTOR')
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

  getContainerInfo() {
    const { resize, panels, parentContainerID, containerIndex } = this.props
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
    }
  }

  render() {
    const { children, width, height, resize, panels, parentContainerID, flow, type } = this.props
    let style = {
      width: width || 'auto',
      height: height || 'auto'
    }
    const resizer = this.buildResizer()
    if (resize.isResizing) {
      if (resize.parentContainerID !== parentContainerID) {
          if (flow === CONTAINER_FLOW.VERTICAL && type === PANEL_TYPE.BOTTOM) {
            style.height = 'auto'
          }
      }
      else {
        const containerInfo = this.getContainerInfo()
        if (containerInfo.doIComeAfterThePanelBeingResized) {
          switch (flow) {
            case CONTAINER_FLOW.VERTICAL:
              style.height = 'auto'
              break
            case CONTAINER_FLOW.HORIZONTAL:
              style.width = 'auto'
              break
          }
        }
        else if (containerInfo.amIBeingResized) {
          console.log('ME')
          switch (flow) {
            case CONTAINER_FLOW.VERTICAL:
              this.handleResizeV()
              style.height = this.resizedHeight
              break
            case CONTAINER_FLOW.HORIZONTAL:
              this.handleResizeH()
              style.width = this.resizedWidth
              break
          }
        }
      }
    }
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
		var startX = HighVolumeStore.mouseX;
		var startWidth = this.getClientWidth();
		var updateWidth = function() {
			var newWidth = Number(startWidth) + (HighVolumeStore.mouseX - startX);
			this.resizedWidth = newWidth + 'px'
		}.bind(this);
  
		this.handleResizing(updateWidth);
	}
  
	handleResizeV() {
    console.log('V')
		var startY = HighVolumeStore.mouseY;
		var startHeight = this.getClientHeight();
		var updateHeight = function() {
			var newHeight = Number(startHeight) + (HighVolumeStore.mouseY - startY);
			this.resizedHeight = newHeight + 'px'
		}.bind(this);
  
		this.handleResizing(updateHeight);
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
