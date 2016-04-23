import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Container from './Container'
import CONTAINER_FLOW from '../constants/container-flows'

class Panel extends Component {
  render() {
    this.containers = this.containers || []
    const { panelID, children } = this.props
    let containerIndex = 0
    return (
      <section className="timber-panel">
        {React.Children.map(children, (childComponent, childIndex) => {
          let props = { ...childComponent.props }
          if (childComponent.type === Container) {
            props.parentPanelID = panelID
            props.ref = container => { if (container) this.containers.push(container) }
            props.flow = props.flow || CONTAINER_FLOW.HORIZONTAL
            props.containerID = this.containers.length > containerIndex
              ? this.containers[containerIndex].containerID : undefined
            ++containerIndex
          }
          return typeof childComponent === 'object'
            ? <childComponent.type { ...props } />
            : childComponent
        })}
      </section>
    )
  }
}

const mapStateToProps = state => ({ ...state })

export default connect(mapStateToProps, null, null, { withRef: true })(Panel)
