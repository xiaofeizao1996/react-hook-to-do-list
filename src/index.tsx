import React from 'react'
import ReactDOM from 'react-dom'
import 'normalize.css'
import showConstants from 'services/config'
import App from './App'

showConstants()

ReactDOM.render(<App />, document.querySelector('#root'))
