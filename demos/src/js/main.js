import '../styles/bootstrap.min.css';
import '../styles/styles.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers';
import App from './components/App';

const createFinalStoreWithMiddleware = compose(
  applyMiddleware(),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)

const store = createFinalStoreWithMiddleware(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App>
      <h1>
        Hi
      </h1>
    </App>
  </Provider>,
  document.getElementById('app')
);
