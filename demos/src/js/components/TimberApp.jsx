import React, { Component } from 'react'
import { connect } from 'react-redux'
import Container from './Container'
import CONTAINER_FLOW from '../constants/container-flows'
import initializeState from '../actions/initialize-state'
import * as styles from '../utils/temp-styles'

class TimberApp extends Component {

  componentWillMount() {
    const { children } = this.props
    const childCount = React.Children.count(children)
    let isOnlyChildContainer = true
    if (childCount === 1) {
      const onlyChild = React.Children.only(children)
      isOnlyChildContainer = onlyChild && onlyChild.type && onlyChild.type === Container
    }
    if (childCount > 1 || !isOnlyChildContainer)
      throw 'Timber Violation: TimberApp can only contain a single Container component.'
  }

  render() {
    this.containers = this.containers || []
    const { children } = this.props
    const rootContainer = React.Children.only(children)
    const { flow } = rootContainer.props
    const props = {
      height: '100%',
      ref: container => { if (container) this.containers.push(container) },
      flow: flow || CONTAINER_FLOW.HORIZONTAL,
      containerID: this.containers.length
        ? this.containers[0].containerID : undefined,
      ...rootContainer.props,
    }
    return (
      <div style={styles.root}>
        <rootContainer.type { ...props } />
      </div>
    )
  }

  componentDidMount() {
    const { dispatch } = this.props
    const state = initializeState(this)
    dispatch({type: 'INITIALIZE_STATE', payload: state})
  }
}

const mapStateToProps = state => ({ ...state })

export default connect(mapStateToProps)(TimberApp);
