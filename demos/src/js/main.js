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
				<Panel>
					<Container flow="HORIZONTAL">
						<Panel width='300px'>
							<ToolExample1/>
						</Panel>
						<Panel>
							<Container flow="VERTICAL">
								<Panel height="10%">
									<ToolExample1/>
								</Panel>
								<Panel>
									<Container flow="HORIZONTAL">
										<Panel>
											<ToolExample1/>
										</Panel>
										<Panel>
											<ToolExample2/>
										</Panel>
										<Panel width='250px'>
											<ToolExample1/>
										</Panel>
									</Container>
								</Panel>
								<Panel height='10%'>
									<ToolExample1/>
								</Panel>
							</Container>
						</Panel>
					</Container>
				</Panel>
				<Panel height='10%'>
					<ToolExample1/>
				</Panel>
			</Container>
		</TimberApp>
	</Provider>,
	document.getElementById('app')
);
