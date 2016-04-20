import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { registerPanel } from '../../actions/registry-actions'

class Panel extends Component {
  render() {
    const { children, width, height } = this.props
    const style = {
      width: width || 'auto',
      height: height || 'auto'
    }
    return (
      <section className="timber-panel" style={style}>
        {children}
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
