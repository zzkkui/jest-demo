import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from './components/Header'
import UndoList from './components/UndoList'
import DoList from './components/DoList'
import './index.css'

export class TodoList extends Component {
  render() {
    const { undoItems } = this.props;
    return (
      <div>
        <Header />
        <UndoList />
        <DoList list={undoItems} />
      </div>
    )
  }
}

export default connect(
  ({ todo }) => ({ undoItems: todo.undoItems })
)(TodoList)
