import React, { Component } from 'react'

class Header extends Component {

  state = {
    inputValue: ''
  }

  onChangeInput = (e) => {
    this.setState({
      inputValue: e.target.value
    })
  }

  onKeyUpInput = (e) => {
    const { inputValue } = this.state
    if (e.keyCode === 13 && inputValue) {
      this.props.addUndoItem({
        value: inputValue,
        isFocus: false,
        isChecked: false
      })
      this.setState({
        inputValue: ''
      })
    }
  }

  render() {
    const { inputValue } = this.state
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

export default Header
