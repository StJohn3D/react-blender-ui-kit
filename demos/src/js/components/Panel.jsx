import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Container from './Container'
import CONTAINER_FLOW from '../constants/container-flows'
import * as styles from '../utils/temp-styles'

class Panel extends Component {
  render() {
    this.containers = this.containers || []
    const { panelID, index, children, parent: { flow, panelCount } } = this.props
    let containerIndex = 0
    return (
      <section style={styles.panel[flow]}>
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
          const contents = typeof childComponent === 'object'
            ? <childComponent.type { ...props } />
            : childComponent
          let panel = (<div style={styles.tableCell}>
              { contents }
            </div>)
          switch (flow) {
            case CONTAINER_FLOW.HORIZONTAL: // columns
              panel = (
                <div style={styles.table}>
                  { panel }
                  { index < panelCount - 1
                    ? <div className="timber-resizer-ew"><div /></div>
                    : undefined }
                </div>
              )
              break
            case CONTAINER_FLOW.VERTICAL: // rows
              panel = (
                <div style={styles.tableCell}>
                  <div style={styles.table}>
                    <div style={styles.tableRow}>
                      { panel }
                    </div>
                    { index < panelCount - 1
                      ? <div className="timber-resizer-ns">
                          <div><div /></div>
                        </div>
                      : undefined }
                  </div>
                </div>
              )
              break
          }
          return panel
        })}
      </section>
    )
  }
}

const mapStateToProps = state => ({ ...state })

export default connect(mapStateToProps, null, null, { withRef: true })(Panel)
