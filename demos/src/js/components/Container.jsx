import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import CONTAINER_FLOW from '../constants/container-flows'
import * as styles from '../utils/temp-styles'

class Container extends Component {
  render() {
    this.panels = this.panels || []
    const { containerID, children, flow } = this.props
    return (
      <div style={styles.container}>
        {React.Children.map(children, (childComponent, childIndex) => {
          const key = `child${childIndex}`
          let props = { ...childComponent.props }
          props.parentContainerID = containerID
          props.ref = panel => { if (panel) this.panels.push(panel) }
          if (flow === CONTAINER_FLOW.HORIZONTAL)
            props.key = key
          props.panelID = this.panels.length > childIndex
            ? this.panels[childIndex].panelID : undefined
          const panel = <childComponent.type { ...props } />
          switch (flow) {
            case CONTAINER_FLOW.VERTICAL:
              return (
                <div key={key} className='timber-row'>
                  { panel }
                </div>
              )

            case CONTAINER_FLOW.HORIZONTAL:
              return panel
          }
        })}
      </div>
    )
  }
}

const mapStateToProps = state => ({ ...state })

export default connect(mapStateToProps, null, null, { withRef: true })(Container)
