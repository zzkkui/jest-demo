import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import TodoList from './views/TodoList'
import Home from './views/Home'
import NotFound from './views/404'

function App() {
  return (
    <div className="container" data-test="container">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/todo" exact>
            <TodoList />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default hot(App);
