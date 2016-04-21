import React, { Component } from 'react'
import { connect } from 'react-redux'
import { doneResizing } from '../../actions/resize-actions'
import generateID from '../../utils/generate-id'
import HighVolumeStore from '../../utils/high-volume-store'

class TimberApp extends Component {
  render() {
    const { children, onMouseMove } = this.props
    const container = React.Children.only(children)
    return (
      <div className="timber-ui" onMouseMove={onMouseMove} onMouseUp={this.onMouseUp.bind(this)}>
        <container.type id={generateID('CONTAINER')} {...container.props} />
      </div>
    );
  }

  componentWillMount() {
      const { onWindowResize } = this.props
      window.addEventListener('resize', onWindowResize);
  }

  onMouseUp(e) {
    const { isResizing, dispatch } = this.props
    if ( isResizing ) dispatch(doneResizing(e))
  }
}

const mapStateToProps = state => ({
  isResizing: state.timberUI.resize.isResizing
})

const mapDispatchToProps = (dispatch, props) => {
  return {
    onMouseMove: (e) => {
      HighVolumeStore._mouseMoved(e)
    },
    onWindowResize: (e) => {
      HighVolumeStore._windowOnResize(e, dispatch)
    },
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimberApp);
