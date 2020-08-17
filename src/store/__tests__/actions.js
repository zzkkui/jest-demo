
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from 'axios'
import fetchMock from 'fetch-mock'
import * as actions from '../actions'
import * as types from '../contants'

jest.mock('axios')

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

// afterEach(() => {
//   fetchMock.reset()
//   fetchMock.restore()
// })

describe('actions', () => {

  it('测试 changeInputValue', () => {
    const value = 'jest'
    const expectedAction = {
      type: types.CHANGE_INPUT_VALUE,
      value
    }
    expect(actions.changeInputValue(value)).toEqual(expectedAction)
  })

  it('测试 changeItems', () => {
    const value = [{
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
    const expectedAction = {
      type: types.CHANGE_ITEMS,
      value
    }
    expect(actions.changeItems(value)).toEqual(expectedAction)
  })

  // it('测试 getItems, 接口有返回', (done) => {
  //   const value = [{
  //     value: 'jest',
  //     isFocus: true,
  //     isChecked: false
  //   }, {
  //     value: 'TDD',
  //     isFocus: false,
  //     isChecked: true
  //   }, {
  //     value: 'react',
  //     isFocus: false,
  //     isChecked: false
  //   }]
  //   const expectedAction = [{
  //     type: types.CHANGE_ITEMS,
  //     value
  //   }]
  //   // fetchMock.get('/undolist.json', {
  //   //   data: [{
  //   //     value: 'jest',
  //   //     isFocus: true,
  //   //     isChecked: false
  //   //   }, {
  //   //     value: 'TDD',
  //   //     isFocus: false,
  //   //     isChecked: true
  //   //   }, {
  //   //     value: 'react',
  //   //     isFocus: false,
  //   //     isChecked: false
  //   //   }],
  //   //   success: true
  //   // })
  //   axios.get.mockResolvedValue({ data: value })
  //   const store = mockStore({ undoItems: value })
  //   store.dispatch(actions.getItems()).then((res) => {
  //     expect(store.getActions()).toEqual(expectedAction)
  //     done()
  //   })
  // })

  // it('测试 getItems, 接口报错', (done) => {
  //   axios.success = false
  //   const value = []
  //   const expectedAction = [{
  //     type: types.CHANGE_ITEMS,
  //     value
  //   }]
  //   axios.get.mockResolvedValue({ data: value })
  //   const store = mockStore({ undoItems: value })
  //   store.dispatch(actions.getItems()).then((res) => {
  //     expect(store.getActions()).toEqual(expectedAction)
  //     done()
  //   })
  // })

  // it('测试 initData, 接口有返回', (done) => {
  //   const value = { aa: 'aa' }
  //   const expectedAction = [{
  //     type: types.INIT_DATA,
  //     value
  //   }]
  //   axios.get.mockResolvedValue({ data: value })
  //   const store = mockStore({ data: value })

  //   store.dispatch(actions.initData()).then((res) => {
  //     expect(store.getActions()).toEqual(expectedAction)
  //     done()
  //   })
  // })
})