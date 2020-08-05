import React from 'react';
import { shallow } from 'enzyme';
import TodoList from '../../index';

const list = [{
  value: 'jest',
  isFocus: true,
  isChecked: false
}, {
  value: 'TDD',
  isFocus: false,
  isChecked: false
}, {
  value: 'react',
  isFocus: false,
  isChecked: false
}]

describe('TodoList 组件', () => {
  it('初始化列表为空', () => {
    const warpper = shallow(<TodoList />)
    expect(warpper.state('undoItems')).toEqual([])
  })

  it('Header 组件存在 addUndoItem 属性', () => {
    const warpper = shallow(<TodoList />)
    const Header = warpper.find('Header')
    expect(Header.prop('addUndoItem')).toBeTruthy()
    // const Header = warpper.find('Header')
    // // warpper.instance() 是 TodoList 的实例
    // expect(Header.prop('addUndoItem')).toBe(warpper.instance().addUndoItem)
  })

  it('addUndoItem 方法调用， undoItems 数据项增加', () => {
    const warpper = shallow(<TodoList />)
    const { addUndoItem } = warpper.instance()
    const item = { value: 'react', isFocus: false }
    addUndoItem(item)
    expect(warpper.state('undoItems')[0]).toBe(item)
    expect(warpper.state('undoItems').length).toBe(1)
    const item1 = { value: 'jest', isFocus: false }
    addUndoItem(item1)
    expect(warpper.state('undoItems')[1]).toBe(item1)
    expect(warpper.state('undoItems').length).toBe(2)
    // const Header = warpper.find('Header')
    // const addFunc = Header.prop('addUndoItem')
    // const value = 'jest'
    // addFunc(value)
    // // warpper.instance() 是 TodoList 的实例
    // expect(warpper.state('undoItems')[0]).toBe(value)
    // addFunc('react')
    // expect(warpper.state('undoItems')[1]).toBe('react')
  })

  it('UndoList 组件存在 list、deleteUndoItem、changeStatus、changeInputItem、changeCheckout 属性', () => {
    const warpper = shallow(<TodoList />)
    const UndoList = warpper.find('UndoList')
    console.log(UndoList.prop('deleteUndoItem'))
    expect(UndoList.prop('deleteUndoItem')).toBeTruthy()
    expect(UndoList.prop('list')).toBeTruthy()
    expect(UndoList.prop('changeStatus')).toBeTruthy()
    expect(UndoList.prop('changeInputItem')).toBeTruthy()
    expect(UndoList.prop('changeCheckout')).toBeTruthy()
    // warpper.instance() 是 TodoList 的实例
    // expect(UndoList.prop('deleteUndoItem')).toBe(warpper.instance().deleteUndoItem)
    // expect(UndoList.prop('list')).toEqual(warpper.instance().state.undoItems)
  })

  it('deleteUndoItem 方法调用 应该删除对应 item', () => {
    const warpper = shallow(<TodoList />)
    warpper.setState({
      undoItems: list
    })
    warpper.instance().deleteUndoItem(1)
    expect(warpper.state('undoItems')).toEqual([list[0], list[2]])
  })

  it('changeStatus 方法调用 改变对应项的 isFocus', () => {
    const warpper = shallow(<TodoList />)
    const index = 1
    warpper.setState({
      undoItems: list
    })
    warpper.instance().changeStatus(index)
    expect(warpper.state('undoItems')[index]).toEqual({ ...list[index], isFocus: true })
  })

  it('changeInputItem 方法调用 改变对应项的 isFocus 和 value', () => {
    const warpper = shallow(<TodoList />)
    const userInput = 'jest-change'
    const index = 0
    warpper.setState({
      undoItems: list
    })
    warpper.instance().changeInputItem(userInput, index)
    expect(warpper.state('undoItems')[index]).toEqual({ ...list[index], value: userInput })
  })

  it('changeCheckout 方法调用 改变对应项的 isFocus 和 value', () => {
    const warpper = shallow(<TodoList />)
    const index = 0
    warpper.setState({
      undoItems: list
    })
    warpper.instance().changeCheckout(index)
    expect(warpper.state('undoItems')[index]).toEqual({ ...list[index], isChecked: true })
  })
});

