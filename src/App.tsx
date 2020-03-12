import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Todo from './routes/todo'

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" render={() => <div>1</div>} />
                <Route path="/todo" component={Todo} />
            </Switch>
        </BrowserRouter>
    )
}

export default App
