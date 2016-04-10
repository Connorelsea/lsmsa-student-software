import { createDevTools } from "redux-devtools"
import LogMonitor from "redux-devtools-log-monitor"
import DockMonitor from "redux-devtools-dock-monitor"

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { routerReducer, syncHistoryWithStore, routerActions, routerMiddleware } from 'react-router-redux'
import { UserAuthWrapper } from 'redux-auth-wrapper'

import * as reducers from "./reducers"
import { App, Home, Foo, Admin, Login } from "./components"

const baseHistory = browserHistory
const routingMiddleware = routerMiddleware(baseHistory)
const reducer = combineReducers(Object.assign({}, reducers, {
	routing: routerReducer
}))

const DevTools = createDevTools(
	<DockMonitor toggleVisibilityKey="ctrl-h"
							 changePositionKey="ctrl-q">
		<LogMonitor theme="tomorrow" />
	</DockMonitor>
)

const enhancer = compose(
	applyMiddleware(routingMiddleware),
	DevTools.instrument()
)

const store = createStore(reducer, enhancer)
const history = syncHistoryWithStore(baseHistory, store)

ReactDOM.render(
	<Provider store={store}>
		<div>
			<Router history={history}>
				<Route path="/" component={App}>
					  <IndexRoute component={Home} />
				</Route>
			</Router>
		</div>
	</Provider>,
	document.getElementById("mount")
)