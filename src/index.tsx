import React from 'react'
import ReactDOM from 'react-dom'
import 'normalize.css'
import App from './App'
import showConstants from './services/config'

showConstants()

ReactDOM.render(<App />, document.querySelector('#root'))
