import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import Header from './components/Header'
import UList from './components/UList'
import DList from './components/DList'
import { actions } from '../../store/createStore'
import './index.css'

export class List extends Component {

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
        <UList />
        <DList list={undoItems} />
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
)(List)
