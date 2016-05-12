import '../styles/styles.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { compose, createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import ToolExample1 from './components/tools/ToolExample1'
import ToolExample2 from './components/tools/ToolExample2'
import { Repanel, Container, Panel } from 'repanel'

const createFinalStoreWithMiddleware = compose(
    applyMiddleware(),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)

const store = createFinalStoreWithMiddleware(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <Repanel tools={[<ToolExample1 name="Blocks"/>, <ToolExample2/>]}>
            <Container>
                <Panel/>
                <Panel/>
            </Container>
        </Repanel>
    </Provider>,
    document.getElementById('app')
);
