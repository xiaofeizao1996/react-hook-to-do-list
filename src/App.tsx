import React from 'react'
import { Switch, Route } from 'react-router'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './store'
import Todo from './routes/todo'
import Login from './routes/login'
import SignUp from './routes/sign-up'

const App: React.FC = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/todo" component={Todo} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route render={() => <div>NOT FOUND</div>} />
      </Switch>
    </ConnectedRouter>
  </Provider>
)

export default App
