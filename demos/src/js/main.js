import '../styles/bootstrap.min.css'
import '../styles/styles.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { compose, createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import TimberApp from './components/timber/TimberApp'
import Container from './components/timber/Container'
import Panel from './components/timber/Panel'

const createFinalStoreWithMiddleware = compose(
  applyMiddleware(),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)

const store = createFinalStoreWithMiddleware(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <TimberApp>
      <Container flow="VERTICAL">
        <Panel height="100px">
          <h1>
            Hi
          </h1>
        </Panel>
        <Panel height="100px">
          <h1>
            Bye
          </h1>
        </Panel>
        <Panel width='50px'>
          <h1>
            Bye
          </h1>
        </Panel>
      </Container>
    </TimberApp>
  </Provider>,
  document.getElementById('app')
);
