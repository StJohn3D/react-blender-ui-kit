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

const ComplexLayout1 = () => (
  <TimberApp>
    <Container flow={CONTAINER_FLOW.VERTICAL}>
      <Panel>
        <h1>
          Hi
        </h1>
        <Container flow={CONTAINER_FLOW.HORIZONTAL}>
          <Panel>
            <h1>
              inner
            </h1>
          </Panel>
          <Panel>
            <h1>
              inner
            </h1>
          </Panel>
          <Panel>
            <h1>
              inner
            </h1>
          </Panel>
        </Container>
      </Panel>
      <Panel>
        <h1>
          Bye
        </h1>
      </Panel>
    </Container>
    <Container flow={CONTAINER_FLOW.HORIZONTAL}>
      <Panel>
        <h1>
          Hi
        </h1>
      </Panel>
      <Panel>
        <h1>
          Bye
        </h1>
      </Panel>
    </Container>
    <Container>
      <Panel>
        This is the last one
      </Panel>
  </Container>
  </TimberApp>
)

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

ReactDOM.render(
  <Provider store={store}>
    <ThreeColumns />
  </Provider>,
  document.getElementById('app')
)
