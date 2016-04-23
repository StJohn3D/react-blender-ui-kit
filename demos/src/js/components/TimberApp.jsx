import React, { Component } from 'react'
import { connect } from 'react-redux'
import CONTAINER_FLOW from '../constants/container-flows'
import initializeState from '../actions/initialize-state'
import * as styles from '../utils/temp-styles'

class TimberApp extends Component {
  render() {
    this.containers = this.containers || []
    const { children } = this.props
    return (
      <div style={styles.root}>
        {React.Children.map(children, (childComponent, childIndex) => {
          let props = { ...childComponent.props }
          props.ref = container => { if (container) this.containers.push(container) }
          props.flow = props.flow || CONTAINER_FLOW.HORIZONTAL
          props.containerID = this.containers.length > childIndex
            ? this.containers[childIndex].containerID : undefined
          return <childComponent.type { ...props } />
        })}
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
