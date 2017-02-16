import React from 'react'
import ReactDOM from 'react-dom'
import './static/css/semantic.css'
import './library/semantic.js'
import LoginForm from './components/passport/LoginForm'

const devBuild = process.env.NODE_ENV !== 'production'

const loginRoot = document.getElementById('login-root')
if (loginRoot) {
  ReactDOM.render(
    <LoginForm />,
    loginRoot
  )
}
