import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import CONTAINER_FLOW from '../constants/container-flows'
import * as styles from '../utils/temp-styles'

class Container extends Component {
  render() {
    this.panels = this.panels || []
    const { containerID, children, flow, height, width } = this.props
    let style = {
      ...styles.container,
      height,
    }
    return (
      <div style={style}>
        {React.Children.map(children, (childComponent, childIndex) => {
          const props = {
            parent: {
              containerID,
              flow,
              panelCount: React.Children.count(children)
            },
            index: childIndex,
            ref: panel => {
              if (panel) this.panels.push(panel)
            },
            panelID: this.panels.length > childIndex
              ? this.panels[childIndex].panelID : undefined,
            ...childComponent.props
          }
          const panel = <childComponent.type { ...props } />
          return panel
        })}
      </div>
    )
  }
}

const mapStateToProps = state => ({ ...state })

export default connect(mapStateToProps, null, null, { withRef: true })(Container)
