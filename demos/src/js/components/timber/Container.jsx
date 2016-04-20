import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { generateID } from '../../actions/init-actions'

class Container extends Component {
  render() {
    const { children } = this.props

    return (
      <section className="timber-container">
        {children}
      </section>
    )
  }

  componentDidMount() {
    const { id, dispatch, flow, minWidth, reverse, tools } = this.props
    dispatch({
      type: 'CONTAINER_REGISTERED',
      payload: {
        id, // todo make this a required proptype
        flow : flow || 'VERTICAL',
        minWidth: minWidth || '480px',
        reverse: reverse || false,
        tools: tools || []
      }
    })
  }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps)(Container)
