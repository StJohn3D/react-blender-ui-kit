import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as mouseActionCreators from '../../actions/mouse-actions'
import { generateID } from '../../actions/init-actions'

class TimberApp extends Component {

  render() {
    const { children, onMouseDown, onMouseUp } = this.props
    const container = React.Children.only(children)
    return (
      <div className="timber-ui" onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
        <container.type id={generateID('CONTAINER')} {...container.props} />
      </div>
    );
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => {
  return {
    onMouseDown: (e) => {
      console.log('left mouse button pressed')
      dispatch(mouseActionCreators.pressLeftMouseButton(e))
    },
    onMouseUp: (e) => {
      console.log('left mouse button released')
      dispatch(mouseActionCreators.releaseLeftMouseButton(e))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimberApp);
