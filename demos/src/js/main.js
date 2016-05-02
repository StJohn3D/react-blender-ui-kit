import '../styles/styles.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { compose, createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import ToolExample1 from './components/tools/ToolExample1'
import ToolExample2 from './components/tools/ToolExample2'
import { TimberApp, Container, Panel } from 'timber-ui'

const createFinalStoreWithMiddleware = compose(
    applyMiddleware(),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)

const store = createFinalStoreWithMiddleware(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <TimberApp tools={[<ToolExample1 name="Blocks"/>, <ToolExample2/>]}>
            <Container flow="VERTICAL">
                <Panel>
                    <Container flow="HORIZONTAL">
                        <Panel width='300px' toolIndex="1">
                        </Panel>
                        <Panel>
                            <Container flow="VERTICAL">
                                <Panel height="10%">
                                </Panel>
                                <Panel>
                                    <Container flow="HORIZONTAL">
                                        <Panel>
                                        </Panel>
                                        <Panel>
                                        </Panel>
                                        <Panel width='250px'>
                                        </Panel>
                                    </Container>
                                </Panel>
                                <Panel height='10%'>
                                </Panel>
                            </Container>
                        </Panel>
                    </Container>
                </Panel>
                <Panel height='10%'>
                </Panel>
            </Container>
        </TimberApp>
    </Provider>,
    document.getElementById('app')
);
