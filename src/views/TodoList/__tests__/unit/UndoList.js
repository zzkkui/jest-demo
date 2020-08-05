
import React from 'react';
import { shallow } from 'enzyme';
import UndoList from '../../components/UndoList';
import { findTestWrapper } from '../../../../utils/testUtils'
import store from '../../../../store/createStore'

const listData = [{
  value: 'jest',
  isFocus: true,
  isChecked: false
}, {
  value: 'TDD',
  isFocus: false,
  isChecked: true
}, {
  value: 'react',
  isFocus: false,
  isChecked: false
}]

describe('UndoList 组件', () => {

  it('样式渲染正常', () => {
    const warpper = shallow(<UndoList store={store} />).find('UndoList').dive()
    warpper.setProps({
      undoItems: listData
    })
    expect(warpper).toMatchSnapshot()
  })

  it('传入的 list 为空数组', () => {
    const warpper = shallow(<UndoList store={store} />).find('UndoList').dive()
    warpper.setProps({
      undoItems: []
    })
    const countEle = findTestWrapper(warpper, 'count')
    const listItemEle = findTestWrapper(warpper, 'list-item')
    expect(countEle.text()).toBe("0")
    expect(listItemEle.length).toBe(0)
  })

  it('传入的 list 不为空数组，展示数据，有删除按钮，有 checkbox', () => {
    const warpper = shallow(<UndoList store={store} />).find('UndoList').dive()
    warpper.setProps({
      undoItems: listData
    })
    const countEle = findTestWrapper(warpper, 'count')
    const listItemEle = findTestWrapper(warpper, 'list-item')
    const deleteItems = findTestWrapper(warpper, 'delete-item')
    const checkItems = findTestWrapper(warpper, 'check-item')
    expect(countEle.text()).toBe("3")
    expect(listItemEle.length).toBe(3)
    expect(deleteItems.length).toBe(3)
    expect(checkItems.length).toBe(3)
  })

  it('未选中的项，点击删除按钮，会调用传入的 changeItems 方法', () => {
    const fn = jest.fn()
    const index = 1
    const warpper = shallow(<UndoList store={store} />).find('UndoList').dive()
    warpper.setProps({
      changeItems: fn,
      undoItems: listData
    })
    const deleteItems = findTestWrapper(warpper, 'delete-item')
    deleteItems.at(index).simulate('click', {
      // 阻止事件冒泡
      stopPropagation() { }
    })
    if (!listData[index].isChecked) {
      expect(fn).toHaveBeenLastCalledWith(listData[index])
    }
  })

  it('已经选中的项，点击删除按钮，不会调用传入的 deleteUndoItem 方法', () => {
    const fn = jest.fn()
    const index = 1
    const warpper = shallow(<UndoList store={store} />).find('UndoList').dive()
    warpper.setProps({
      changeItems: fn,
      undoItems: listData
    })
    const deleteItems = findTestWrapper(warpper, 'delete-item')
    deleteItems.at(index).simulate('click', {
      // 阻止事件冒泡
      stopPropagation() { }
    })
    if (listData[index].isChecked) {
      expect(fn).not.toHaveBeenCalled()
    }
  })

  it('当 isFocus 为 true 这一项被点击时，不触发执行 changeItems 方法', () => {
    const fn = jest.fn()
    const index = 0
    const listData = [{
      value: 'jest',
      isFocus: true,
      isChecked: false
    }, {
      value: 'TDD',
      isFocus: false,
      isChecked: true
    }, {
      value: 'react',
      isFocus: false,
      isChecked: false
    }]
    const warpper = shallow(<UndoList store={store} />).find('UndoList').dive()
    warpper.setProps({
      changeItems: fn,
      undoItems: listData
    })
    const listItemEle = findTestWrapper(warpper, 'list-item')
    listItemEle.at(index).simulate('click')
    // listItemEle.at(index).simulate('focus')
    // 这里只有 isFocus 为 true 的项才会调用 changeItems
    if (listData[index].isFocus) {
      expect(fn).not.toHaveBeenCalled()
    }
  })

  it('当 isFocus 为 false 这一项被点击时，会触发执行 changeItems 方法', () => {
    const fn = jest.fn()
    const index = 1
    const listData = [{
      value: 'jest',
      isFocus: true,
      isChecked: false
    }, {
      value: 'TDD',
      isFocus: false,
      isChecked: true
    }, {
      value: 'react',
      isFocus: false,
      isChecked: false
    }]
    const warpper = shallow(<UndoList store={store} />).find('UndoList').dive()
    warpper.setProps({
      changeItems: fn,
      undoItems: listData
    })
    const listItemEle = findTestWrapper(warpper, 'list-item')
    listItemEle.at(index).simulate('click', {
      stopPropagation() { }
    })
    // listItemEle.at(index).simulate('focus')
    // 这里只有 isFocus 为 true 的项才会调用 changeItems
    if (!listData[index].isFocus) {
      expect(fn).toHaveBeenLastCalledWith([
        listData[0],
        {
          value: 'TDD',
          isFocus: true,
          isChecked: true
        },
        listData[2]])
    }
  })

  it('当某一项 isFocus 为true，展示 input 框', () => {
    const listData = [{
      value: 'jest',
      isFocus: true,
      isChecked: false
    }, {
      value: 'TDD',
      isFocus: false,
      isChecked: true
    }, {
      value: 'react',
      isFocus: false,
      isChecked: false
    }]
    const warpper = shallow(<UndoList store={store} />).find('UndoList').dive()
    warpper.setProps({
      undoItems: listData
    })
    const inputItemEle = findTestWrapper(warpper, 'list-input')
    expect(inputItemEle.length).toBe(1)
  })

  it('当某一项输入框失去焦点，触发 changeItems 方法', () => {
    const listData = [{
      value: 'jest',
      isFocus: true,
      isChecked: false
    }, {
      value: 'TDD',
      isFocus: false,
      isChecked: true
    }, {
      value: 'react',
      isFocus: false,
      isChecked: false
    }]
    const fn = jest.fn()
    const index = 0
    const warpper = shallow(<UndoList store={store} />).find('UndoList').dive()
    warpper.setProps({
      undoItems: listData,
      changeItems: fn
    })
    const inputItemEle = findTestWrapper(warpper, 'list-input')
    inputItemEle.at(index).simulate('blur')
    expect(fn).toHaveBeenLastCalledWith([
      {
        value: 'jest',
        isFocus: false,
        isChecked: false
      },
      listData[1],
      listData[2]])
  })

  it('当某一项 input change，触发执行传入的 changeItems 方法', () => {
    const listData = [{
      value: 'jest',
      isFocus: true,
      isChecked: false
    }, {
      value: 'TDD',
      isFocus: false,
      isChecked: true
    }, {
      value: 'react',
      isFocus: false,
      isChecked: false
    }]
    const fn = jest.fn()
    const index = 0
    const userInput = 'jest-change'
    const warpper = shallow(<UndoList store={store} />).find('UndoList').dive()
    warpper.setProps({
      undoItems: listData,
      changeItems: fn
    })
    const inputItemEle = findTestWrapper(warpper, 'list-input')
    inputItemEle.at(index).simulate('change', {
      target: {
        value: userInput
      }
    })
    expect(fn).toHaveBeenLastCalledWith([
      {
        value: userInput,
        isFocus: true,
        isChecked: false
      },
      listData[1],
      listData[2]])
  })

  it('当某一项 checkout 选中，触发 changeItems 方法', () => {
    const listData = [{
      value: 'jest',
      isFocus: true,
      isChecked: false
    }, {
      value: 'TDD',
      isFocus: false,
      isChecked: true
    }, {
      value: 'react',
      isFocus: false,
      isChecked: false
    }]
    const fn = jest.fn()
    const index = 0
    const warpper = shallow(<UndoList store={store} />).find('UndoList').dive()
    warpper.setProps({
      undoItems: listData,
      changeItems: fn
    })
    const checkItemEle = findTestWrapper(warpper, 'check-item')
    checkItemEle.at(index).simulate('click', {
      stopPropagation() { }
    })
    expect(fn).toHaveBeenLastCalledWith([
      {
        value: 'jest',
        isFocus: true,
        isChecked: true
      },
      listData[1],
      listData[2]])
  })
});


