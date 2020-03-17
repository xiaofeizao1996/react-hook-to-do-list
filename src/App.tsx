import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Todo from './routes/todo'
import Login from './routes/login'
import SignUp from './routes/sign-up'

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/todo" component={Todo} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/sign-up" component={SignUp} />
                <Route render={() => <div>NOT FOUND</div>} />
            </Switch>
        </BrowserRouter>
    )
}

export default App
