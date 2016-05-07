import React from 'react'
import { connect } from 'react-redux'
import CONTAINER_FLOW from '../constants/container-flows'
import { beginResizing } from '../actions/resize-actions'

const ResizeHandle = ({ flow, beginResize }) => {
    const className = flow === CONTAINER_FLOW.HORIZONTAL
      ? 'ruip-resize-h' : 'ruip-resize-v'
    return (
      <div className={className} onMouseDown={beginResize}>
        <div></div>
      </div>
    )
}

const mapStateToProps = state => ({})

const mapDispatchToProps = (dispatch, props) => {
  return {
    beginResize: (e) => {
      e.preventDefault()
      dispatch(beginResizing(props.id, props.parentID, props.parentIndex))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ResizeHandle)
