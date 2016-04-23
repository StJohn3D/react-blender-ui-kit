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
import ToolExample1 from './components/tools/ToolExample1'
import ToolExample2 from './components/tools/ToolExample2'

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
					<ToolExample1/>
				</Panel>
				<Panel height="100px">
					<ToolExample2/>
				</Panel>
				<Panel width='50px'>
					<ToolExample1/>
				</Panel>
			</Container>
		</TimberApp>
	</Provider>,
	document.getElementById('app')
);
