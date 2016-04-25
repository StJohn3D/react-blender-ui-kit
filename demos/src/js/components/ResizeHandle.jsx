import React, { Component } from 'react'
import { connect } from 'react-redux'
import CONTAINER_FLOW from '../constants/container-flows'
import MousePosition from '../utils/mouse-position'
import classNames from 'classnames'

class ResizeHandle extends Component {
  render() {
    const { flow, index, panelCount, isResizing } = this.props
    const direction = flow === CONTAINER_FLOW.HORIZONTAL ? "ew" : "ns"
    const innerHandle = flow === CONTAINER_FLOW.HORIZONTAL
      ? <div /> : <div><div /></div>
    const directionClassName = `timber-resizer-${direction}`
    const className = classNames({
      [directionClassName]: true,
      'timber-resize-hover': isResizing,
    })
    return index < panelCount
      ? <div className={className} onMouseDown={this.onMouseDown}>
          { innerHandle }
        </div>
      : undefined
  }

  onMouseDown = e => {
    const { dispatch, panelID, flow } = this.props
    window.addEventListener('mousemove', this.onMouseMove)
    window.addEventListener('mouseup', this.onMouseUp)
    e.preventDefault()
    return dispatch({
      type: 'GRAB_RESIZE_HANDLE',
      payload: {
        panelID, flow, mousePosition: MousePosition.current,
      }
    })
  }

  onMouseMove = e => {
    const { dispatch, panelID, flow } = this.props
    return dispatch({
      type: 'DRAG_RESIZE_HANDLE',
      payload: {
        panelID, flow, mousePosition: MousePosition.current,
      }
    })
  }

  onMouseUp = e => {
    const { dispatch, panelID, flow } = this.props
    window.removeEventListener('mousemove', this.onMouseMove)
    window.removeEventListener('mouseup', this.onMouseUp)
    return dispatch({
      type: 'DROP_RESIZE_HANDLE',
      payload: {
        panelID, flow, mousePosition: MousePosition.current,
      }
    })
  }
}

const mapStateToProps = ({workspacr: {resizing}}, { panelID }) => {
  return {
    isResizing: resizing && resizing.panelID === panelID ? true : false,
  }
}

export default connect(mapStateToProps)(ResizeHandle)
