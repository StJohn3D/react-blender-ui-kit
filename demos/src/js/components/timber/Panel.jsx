import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { registerPanel } from '../../actions/registry-actions'
import PANEL_TYPE from '../../constants/panel-types'
import ResizeHandle from './ResizeHandle'

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

  render() {
    const { children, width, height } = this.props
    const style = {
      width: width || 'auto',
      height: height || 'auto'
    }
    const resizer = this.buildResizer()
    return (
      <section className="timber-panel" style={style}>
        {children}
        {resizer}
      </section>
    )
  }

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

const mapStateToProps = state => ({})

export default connect(mapStateToProps)(Panel)
