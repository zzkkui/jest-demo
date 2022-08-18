import React from 'react'

function DList(props) {
  const { list } = props;
  return (
    <div className="do-list">
      <div className="do-list-title">
        已经完成
        <div className="do-list-count" data-test="count">{list.length}</div>
      </div>
      <ul className="do-list-ul">
        {
          list.map((n, i) =>
            n.isChecked ? <li className="do-list-item" data-test="do-list-item" key={i}>
              <span>{n.value}</span>
            </li> : '')
        }
      </ul>
    </div>
  )
}

export default DList
