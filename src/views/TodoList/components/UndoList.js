import React, { Component } from 'react'

class UndoList extends Component {

  state = {
    count: 0
  }

  inputRef = React.createRef();

  onClickDelete = (e, index) => {
    e.stopPropagation()
    !this.props.list[index].isChecked && this.props.deleteUndoItem(index)
  }

  changeStatus = async (index) => {
    const { list } = this.props;
    if (!list[index].isFocus) {
      await this.props.changeStatus(index)
      this.inputRef.current && this.inputRef.current.focus()
    }
  }

  onBlurInputItem = (index) => {
    this.props.changeStatus(index)
  }

  changeInputItem = (e, i) => {
    this.props.changeInputItem(e.target.value, i)
  }

  changeCheckout = (e, i) => {
    e.stopPropagation()
    this.props.changeCheckout(i)
  }

  render() {
    const { list } = this.props;
    return (
      <div className="undo-list">
        <div className="undo-list-title">
          正在进行
          <div className="undo-list-count" data-test="count">{list.length}</div>
        </div>
        <ul className="undo-list-ul">
          {
            list.map((n, i) =>
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

export default UndoList
