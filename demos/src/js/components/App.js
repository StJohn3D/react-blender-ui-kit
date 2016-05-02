import React, { Component } from 'react'
import TimberApp from './timber/TimberApp'

class App extends Component {

  render() {
    return (
      <TimberApp>
        {children}
      </TimberApp>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
