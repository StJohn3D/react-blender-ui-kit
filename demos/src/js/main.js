import '../styles/styles.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { compose, createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
// import TimberApp from './components/timber/TimberApp'
// import Container from './components/timber/Container'
// import Panel from './components/timber/Panel'
import ToolExample1 from './components/tools/ToolExample1'
import ToolExample2 from './components/tools/ToolExample2'
// import { TimberApp, Container, Panel } from 'timber-ui'
// console.log(TimberApp, Container, Panel)
import TestMod from 'test-mod'


const createFinalStoreWithMiddleware = compose(
    applyMiddleware(),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)

const store = createFinalStoreWithMiddleware(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <TestMod />
    </Provider>,
    document.getElementById('app')
);
