import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Todo from './routes/todo'
import Login from './routes/login'

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" render={() => <div>1</div>} />
                <Route path="/todo" component={Todo} />
                <Route path="/login" component={Login} />
            </Switch>
        </BrowserRouter>
    )
}

export default App
