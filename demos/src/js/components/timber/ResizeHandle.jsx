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
      <div className={className} onMouseDown={beginResize}>
        <div></div>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = (dispatch, props) => {
  return {
    beginResize: (e) => {
      e.preventDefault()
      dispatch(beginResizing(props.id, props.parentContainerID, props.containerIndex))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ResizeHandle)
