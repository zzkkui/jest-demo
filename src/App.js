import React from 'react';
import { hot } from 'react-hot-loader/root';
import TodoList from './views/TodoList'
// import Self from './views/self'

function App() {
  return (
    <div className="container" data-test="container">
      <TodoList />
    </div>
  );
}

export default hot(App);
