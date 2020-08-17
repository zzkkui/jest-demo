import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import Header from './components/Header'
import UndoList from './components/UndoList'
import DoList from './components/DoList'
import { actions } from '../../store/createStore'
import './index.css'

export class TodoList extends Component {

  componentDidMount() {
    // setTimeout(() => {
    //   this.props.getItems()
    // }, 5000)
    this.props.initData()
    this.props.getItems()

    // axios.get('/undolist.json').then(res => {
    //   this.props.changeItems(res.data)
    // }).catch(e => {
    //   console.log(e)
    // })
  }

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
  ({ todo }) => ({ undoItems: todo.undoItems }),
  {
    getItems: actions.getItems,
    changeItems: actions.changeItems,
    initData: actions.initData
  }
)(TodoList)
