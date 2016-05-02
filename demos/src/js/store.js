import { compose, createStore, applyMiddleware } from 'redux'
import reducer from './reducer'

const createFinalStoreWithMiddleware = compose(
  applyMiddleware(),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)

const store = createFinalStoreWithMiddleware(reducer);

export default store
