import React, { Component } from 'react'
import { connect } from 'react-redux'

import { actions } from '../../../store/createStore'

export class Header extends Component {

  state = {
    a: 1
  }

  onChangeInput = (e) => {
    this.props.changeInputValue(e.target.value)
  }

  onKeyUpInput = (e) => {
    const { inputValue, undoItems } = this.props
    if (e.keyCode === 13 && inputValue) {
      this.props.changeItems([
        ...undoItems,
        {
          value: inputValue,
          isFocus: false,
          isChecked: false
        }])
      this.props.changeInputValue('')
    }
  }

  render() {
    const { inputValue } = this.props
    return (
      <div className="header">
        <div className="header-content">
          TodoList
          <input placeholder="AddTodo" className="header-input" data-test="input" value={inputValue} onChange={this.onChangeInput} onKeyUp={this.onKeyUpInput} />
        </div>
      </div>
    )
  }
}

export default connect(({ todo }) => ({
  inputValue: todo.inputValue,
  undoItems: todo.undoItems
}),
  {
    changeInputValue: actions.changeInputValue,
    changeItems: actions.changeItems
  }
)(Header)
