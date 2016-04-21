import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import CONTAINER_FLOW from '../../constants/container-flows'
import { beginResizing } from '../../actions/resize-actions'

class ResizeHandle extends Component {
  render() {
    const { flow, beginResize } = this.props
    const className = flow === CONTAINER_FLOW.HORIZONTAL
      ? 'timber-resize-h' : 'timber-resize-v'
    return (
      <div className={className} onMouseDown={beginResize}></div>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = (dispatch, props) => {
  return {
    beginResize: () => {
      dispatch(beginResizing(props.id))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ResizeHandle)
