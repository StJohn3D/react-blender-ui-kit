import '../styles/styles.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { compose, createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import ToolExample1 from './components/tools/ToolExample1'
import ToolExample2 from './components/tools/ToolExample2'
import { ReduxUIPanels, Container, Panel } from 'redux-ui-panels'

const createFinalStoreWithMiddleware = compose(
    applyMiddleware(),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)

const store = createFinalStoreWithMiddleware(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <ReduxUIPanels tools={[<ToolExample1 name="Blocks"/>, <ToolExample2/>]}>
            <Container>
                <Panel>
                </Panel>
            </Container>
        </ReduxUIPanels>
    </Provider>,
    document.getElementById('app')
);
