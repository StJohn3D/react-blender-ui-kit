import React, { Component } from 'react'
import { connect } from 'react-redux'

class App extends Component {

  render() {
    const { children, onMouseDown, onMouseUp } = this.props
    return (
      <div className="timber-ui" onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
        {children}
      </div>
    );
  }
}

const mapStateToProps = state => ({})

const createLeftMouseDown = e => ({
  type: 'MOUSE_LEFT_DOWN',
  payload: {
    isLeftDown: true
  }
})

const createLeftMouseUp = e => ({
  type: 'MOUSE_LEFT_UP',
  payload: {
    isLeftDown: false
  }
})

const mapDispatchToProps = dispatch => {
  return {
    onMouseDown: (e) => {
      console.log('left mouse button pressed')
      dispatch(createLeftMouseDown(e))
    },
    onMouseUp: (e) => {
      console.log('left mouse button released')
      dispatch(createLeftMouseUp(e))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
