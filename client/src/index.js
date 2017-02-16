import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore, compose } from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducers'
import './static/semantic/dist/semantic.css'
import 'jquery'
import 'jquery-ujs'
//import './static/semantic/dist/semantic.js'
import FrameContainer from './containers/FrameContainer'
import ListContainer from './containers/ListContainer'
import NewContainer from './containers/NewContainer'
import LoginForm from './components/passport/LoginForm'
import RegisterForm from './components/passport/RegisterForm'

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

const frameRoot = document.querySelector('#frame #root')
if (frameRoot) {
  ReactDOM.render(
    <Provider store={store}>
      <FrameContainer />
    </Provider>,
    frameRoot
  )
}

const loginRoot = document.querySelector('#sessions-new #root')
if (loginRoot) {
  ReactDOM.render(
    <LoginForm />,
    loginRoot
  )
}

const registerRoot = document.querySelector('#users-signup #root')
if (registerRoot) {
  ReactDOM.render(
    <RegisterForm />,
    registerRoot
  )
}

const listRoot = document.querySelector('body.list #root')
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
