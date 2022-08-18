import React from 'react';
import { createStore } from 'redux'
import { mount } from 'enzyme';
import { Provider } from 'react-redux'
import axios from 'axios'
import ListWap, { List } from '../..';
import { findTestWrapper } from '../../../../utils/testUtils'
import { reducers, enhancer } from '../../../../store/createStore'

jest.mock('axios')

let store;
const listItem = [{
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

beforeEach(() => {
  store = createStore(reducers, enhancer)
  jest.useFakeTimers()
})

describe('List 集成测试', () => {
  it(`
    1. Header 输入框输入内容
    2. 点击回车
    3. 列表中展示用户输入内容项
  `, () => {
    axios.get.mockImplementation((...args) => {
      if (args[0] === '/init') {
        return Promise.resolve({ data: {} })
      } else if (args[0] === '/undolist.json') {
        return Promise.resolve({ data: [] })
      }
    })
    const warpper = mount(<Provider store={store}><ListWap /></Provider>)
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
    const listItem = findTestWrapper(warpper, 'undo-list-item')
    expect(listItem.length).toBe(1)
    expect(listItem.text()).toContain(headerInputValue)
  })

  it(`
    1. 用户打开页面，请求正常
    2. 应该展示接口返回的数据
  `, (done) => {
    // 测试生命周期
    // const componentDidMountSpy = jest.spyOn(List.prototype, 'componentDidMount');
    axios.get.mockImplementation((...args) => {
      if (args[0] === '/init') {
        return Promise.resolve({ data: { aa: 'aa' } })
      } else if (args[0] === '/undolist.json') {
        return Promise.resolve({ data: listItem })
      }
    })
    const warpper = mount(<Provider store={store}><ListWap /></Provider>)
    // expect(componentDidMountSpy).toHaveBeenCalled();
    // componentDidMountSpy.mockReset();
    // componentDidMountSpy.mockRestore();

    // 或者 setTimeout
    process.nextTick(() => {
      // 更新
      warpper.update()
      // console.log(warpper.debug())
      const listItem = findTestWrapper(warpper, 'undo-list-item')
      expect(listItem.length).toBe(3)
      done()
    })
  })

  it(`
    1. 用户打开页面，请求不正常
    2. 页面无列表内容，但页面正常展示
  `, (done) => {
    axios.get.mockImplementation((...args) => {
      if (args[0] === '/init') {
        return Promise.reject(new Error(500))
      } else if (args[0] === '/undolist.json') {
        return Promise.reject(new Error(500))
      }
    })
    const warpper = mount(<Provider store={store}><ListWap /></Provider>)
    // 或者 setTimeout
    process.nextTick(() => {
      // 更新
      warpper.update()
      // console.log(warpper.debug())
      const listItem = findTestWrapper(warpper, 'undo-list-item')
      expect(listItem.length).toBe(0)
      done()
    })
  })

  // it(`
  //   1. 用户打开页面
  //   2. 五秒后
  //   3. 应该展示接口返回的数据
  // `, (done) => {
  //   axios.get.mockImplementation((...args) => {
  //     if (args[0] === '/init') {
  //       return Promise.resolve({  data: { aa: 'aa' }  })
  //     } else if (args[0] === '/undolist.json') {
  //       return Promise.resolve({ data: listItem })
  //     }
  //   })
  //   const warpper = mount(<Provider store={store}><TodoListWap /></Provider>)

  //   // jest.runAllTimers()
  //   jest.advanceTimersByTime(5000)
  //   process.nextTick(() => {
  //     warpper.update()
  //     // console.log(warpper.debug())
  //     const listItem = findTestWrapper(warpper, 'undo-list-item')
  //     expect(listItem.length).toBe(3)
  //     done()
  //   })

  //   // setTimeout(() => {
  //   //   // 更新
  //   //   warpper.update()
  //   //   // console.log(warpper.debug())
  //   //   const listItem = findTestWrapper(warpper, 'undo-list-item')
  //   //   expect(listItem.length).toBe(3)
  //   //   done()
  //   // }, 4000)
  // })
});
