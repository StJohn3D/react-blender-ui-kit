import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { registerPanel } from '../../actions/registry-actions'
import PANEL_TYPE from '../../constants/panel-types'
import CONTAINER_FLOW from '../../constants/container-flows'
import ResizeHandle from './ResizeHandle'
import HighVolumeStore from '../../utils/high-volume-store'

class Panel extends Component {

  buildResizer() {
    const { id, type, parentContainerID, containerIndex, flow } = this.props
    const handleProps = {
      id, type, parentContainerID, containerIndex, flow
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
        if (panel.id === resize.panelID) {
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
          this.unsubscribe = HighVolumeStore.subscribe(() => {

          })
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

  // handleResizing(updateFunc) {
	// 	var listenerID;
  //
	// 	var updateSize = () => {
	// 		if ( MouseStore.leftButtonState === 'UP' ) {
	// 			this.setState({ active: false }, function() {
	// 				uiActions.doneResizing();
	// 				listenerID.remove();
	// 			});
	// 		} else {
	// 			updateFunc();
	// 		}
	// 	}.bind(this);
  //
	// 	this.setState({ active: true }, function() {
	// 		uiActions.resizing();
	// 		listenerID = MouseStore.addListener(updateSize);
	// 	});
	// }
  //
	// handleResizeH() {
	// 	event.preventDefault();
	// 	var refs = uiStore.getChildPanels( this.props.parentContainerID );
	// 	refs[ this.props.containerIndex + 1 ].setWidth('auto');
  //
	// 	var startX = MouseStore.mouseX;
	// 	var startWidth = this.getClientWidth();
	// 	var updateWidth = function() {
	// 		var newWidth = Number(startWidth) + (MouseStore.mouseX - startX);
	// 		this.setWidth( newWidth + 'px' );
	// 	}.bind(this);
  //
	// 	this.handleResizing(updateWidth);
	// }
  //
	// handleResizeV() {
	// 	event.preventDefault();
	// 	var refs = uiStore.getChildPanels( this.props.parentContainerID );
	// 	refs[ this.props.containerIndex + 1 ].setHeight('auto');
  //
	// 	var startY = MouseStore.mouseY;
	// 	var startHeight = this.getClientHeight();
	// 	var updateHeight = function() {
	// 		var newHeight = Number(startHeight) + (MouseStore.mouseY - startY);
	// 		this.setHeight( newHeight + 'px' );
	// 	}.bind(this);
  //
	// 	this.handleResizing(updateHeight);
	// }

  // after panel renders, register it in the store
  componentDidMount() {
    const { dispatch, id, tools, parentContainerID, containerIndex } = this.props
    const node = ReactDOM.findDOMNode(this)
    dispatch(registerPanel({
      id, // todo make this a required proptype
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
