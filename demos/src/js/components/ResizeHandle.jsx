import React, { Component } from 'react'
import CONTAINER_FLOW from '../constants/container-flows'

class ResizeHandle extends Component {
  render() {
    const { flow, index, panelCount } = this.props
    const direction = flow === CONTAINER_FLOW.HORIZONTAL ? "ew" : "ns"
    const innerHandle = flow === CONTAINER_FLOW.HORIZONTAL
      ? <div /> : <div><div /></div>
    const className = `timber-resizer-${direction}`
    return index < panelCount
      ? <div className={className}>{ innerHandle }</div> : undefined
  }
}

export default ResizeHandle
