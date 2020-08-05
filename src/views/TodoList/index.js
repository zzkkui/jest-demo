import React, { Component } from 'react'
import Header from './components/Header'
import UndoList from './components/UndoList'
import DoList from './components/DoList'
import './index.css'

class TodoList extends Component {
  state = {
    undoItems: []
  }

  addUndoItem = (item) => {
    this.setState({
      undoItems: [...this.state.undoItems, item]
    })
  }

  deleteUndoItem = (i) => {
    const newUndoItems = [...this.state.undoItems]
    newUndoItems.splice(i, 1)
    this.setState({
      undoItems: newUndoItems
    })
  }

  changeStatus = (i) => {
    const newUndoItems = [...this.state.undoItems]
    newUndoItems[i].isFocus = !newUndoItems[i].isFocus
    return this.setState({
      undoItems: newUndoItems
    })
  }

  changeInputItem = (value, i) => {
    const newUndoItems = [...this.state.undoItems]
    newUndoItems[i] = {
      ...newUndoItems[i],
      value
    }
    this.setState({
      undoItems: newUndoItems
    })
  }

  changeCheckout = (i) => {
    const newUndoItems = [...this.state.undoItems]
    newUndoItems[i].isChecked = !newUndoItems[i].isChecked
    return this.setState({
      undoItems: newUndoItems
    })
  }

  render() {
    const { undoItems } = this.state;
    return (
      <div>
        <Header addUndoItem={this.addUndoItem} />
        <UndoList
          deleteUndoItem={this.deleteUndoItem}
          list={undoItems}
          changeStatus={this.changeStatus}
          changeInputItem={this.changeInputItem}
          changeCheckout={this.changeCheckout}
        />
        <DoList list={undoItems} />
      </div>
    )
  }
}

export default TodoList
