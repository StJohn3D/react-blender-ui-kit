import '../styles/bootstrap.min.css'
import '../styles/styles.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { compose, createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import TimberApp from './components/TimberApp'
import Container from './components/Container'
import Panel from './components/Panel'
import store from './store'
import CONTAINER_FLOW from './constants/container-flows'
import MousePosition from './utils/mouse-position'

const createFinalStoreWithMiddleware = compose(
  applyMiddleware(),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)

const TwoColumns = () => (
  <TimberApp>
    <Container flow={CONTAINER_FLOW.HORIZONTAL}>
      <Panel>
        Left
      </Panel>
      <Panel>
        Right
      </Panel>
    </Container>
  </TimberApp>
)
const ThreeColumns = () => (
  <TimberApp>
    <Container flow={CONTAINER_FLOW.HORIZONTAL}>
      <Panel>
        Left
      </Panel>
      <Panel>
        Center
      </Panel>
      <Panel>
        Right
      </Panel>
    </Container>
  </TimberApp>
)

const SevenColumns = () => (
  <TimberApp>
    <Container flow={CONTAINER_FLOW.HORIZONTAL}>
      <Panel>
        One
      </Panel>
      <Panel>
        Two
      </Panel>
      <Panel>
        Three
      </Panel>
      <Panel>
        Four
      </Panel>
      <Panel>
        Five
      </Panel>
      <Panel>
        Six
      </Panel>
      <Panel>
        Seven
      </Panel>
    </Container>
  </TimberApp>
)

const TwoRows = () => (
  <TimberApp>
    <Container flow={CONTAINER_FLOW.VERTICAL}>
      <Panel>
        Top
      </Panel>
      <Panel>
        Bottom
      </Panel>
    </Container>
  </TimberApp>
)
const ThreeRows = () => (
  <TimberApp>
    <Container flow={CONTAINER_FLOW.VERTICAL}>
      <Panel>
        Top
      </Panel>
      <Panel>
        Middle
      </Panel>
      <Panel>
        Bottom
      </Panel>
    </Container>
  </TimberApp>
)

ReactDOM.render(
  <Provider store={store}>
    <SevenColumns />
  </Provider>,
  document.getElementById('app')
)
