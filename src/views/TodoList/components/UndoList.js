import React, { Component } from 'react'
import { connect } from 'react-redux'

import { actions } from '../../../store/createStore'

class UndoList extends Component {

  inputRef = React.createRef();

  onClickDelete = (e, index) => {
    e.stopPropagation()
    if (!this.props.undoItems[index].isChecked) {
      const newUndoItems = [...this.props.undoItems]
      newUndoItems.splice(index, 1)
      this.props.changeItems(newUndoItems)
    }
  }

  changeStatus = async (index) => {
    const { undoItems } = this.props;
    if (!undoItems[index].isFocus) {
      const newUndoItems = [...undoItems]
      newUndoItems[index].isFocus = !newUndoItems[index].isFocus
      await this.props.changeItems(newUndoItems)
      this.inputRef.current && this.inputRef.current.focus()
    }
  }

  onBlurInputItem = (index) => {
    const newUndoItems = [...this.props.undoItems]
    newUndoItems[index].isFocus = !newUndoItems[index].isFocus
    this.props.changeItems(newUndoItems)
  }

  changeInputItem = (e, i) => {
    const newUndoItems = [...this.props.undoItems]
    newUndoItems[i] = {
      ...newUndoItems[i],
      value: e.target.value
    }
    this.props.changeItems(newUndoItems)
  }

  changeCheckout = (e, i) => {
    e.stopPropagation()
    const newUndoItems = [...this.props.undoItems]
    newUndoItems[i].isChecked = !newUndoItems[i].isChecked
    this.props.changeItems(newUndoItems)
  }

  render() {
    const { undoItems } = this.props;
    return (
      <div className="undo-list">
        <div className="undo-list-title">
          正在进行
          <div className="undo-list-count" data-test="count">{undoItems.length}</div>
        </div>
        <ul className="undo-list-ul">
          {
            undoItems.map((n, i) =>
              <li className={`${n.isChecked ? "undo-item-checked" : ''} undo-list-item`} data-test="list-item" key={i} onClick={() => this.changeStatus(i)}>
                <input className="undo-list-checkbox" type="checkbox" data-test="check-item" value={n.isChecked} onClick={(e) => this.changeCheckout(e, i)} />
                {
                  n.isFocus ?
                    <input className="undo-list-input" data-test="list-input" ref={this.inputRef} value={n.value} onBlur={() => this.onBlurInputItem(i)} onChange={(e) => this.changeInputItem(e, i)} /> :
                    <span>{n.value}</span>
                }
                <div className="undo-list-delete" data-test="delete-item" onClick={(e) => this.onClickDelete(e, i)}> - </div>
              </li>)
          }
        </ul>
      </div>
    )
  }
}

export default connect(
  ({ todo }) => ({ undoItems: todo.undoItems }),
  { changeItems: actions.changeItems }
)(UndoList)
