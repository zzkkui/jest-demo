import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux'
import TodoList from '../..';
import { findTestWrapper } from '../../../../utils/testUtils'
import store from '../../../../store/createStore'

// 集成测试
it(`
  1. Header 输入框输入内容
  2. 点击回车
  3. 列表中展示用户输入内容项
`, () => {
  const warpper = mount(<Provider store={store}><TodoList /></Provider>)
  const headerInputValue = 'jest'
  const inputEle = findTestWrapper(warpper, 'input')
  inputEle.simulate('change', {
    target: {
      value: headerInputValue
    }
  })
  inputEle.simulate('keyUp', {
    keyCode: 13
  })
  const listItem = findTestWrapper(warpper, 'list-item')
  expect(listItem.length).toBe(1)
  expect(listItem.text()).toContain(headerInputValue)
})