import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore, compose } from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducers/page'
import './static/css/semantic.css'
import './library/semantic.js'
import ListContainer from './containers/ListContainer'
import NewContainer from './containers/NewContainer'

const devBuild = process.env.NODE_ENV !== 'production'
let store

if (devBuild) {
  const logger = createLogger()
  store = createStore(
    reducer,
    compose(
      applyMiddleware(logger, thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )
}
else {
  store = createStore(
    reducer,
    applyMiddleware(thunk)
  )
}

const listRoot = document.getElementById('list-root')
if (listRoot) {
  ReactDOM.render(
    <Provider store={store}>
      <ListContainer />
    </Provider>,
    listRoot
  )
}

const newRoot = document.getElementById('new-root')
if (newRoot) {
  ReactDOM.render(
    <Provider store={store}>
      <NewContainer />
    </Provider>,
    newRoot
  )
}
