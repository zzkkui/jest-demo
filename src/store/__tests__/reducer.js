import reducer from '../reducer'
import * as types from '../contants'

describe('reducer', () => {
  it('测试初始值', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        inputValue: '',
        undoItems: [],
        data: {}
      }
    )
  })

  it('测试 INIT_DATA', () => {
    expect(
      reducer('', {
        type: types.INIT_DATA,
        value: {
          aa: 'aa'
        }
      })
    ).toEqual({ data: { aa: 'aa' } })
  })

  it('测试 CHANGE_INPUT_VALUE', () => {
    expect(
      reducer('', {
        type: types.CHANGE_INPUT_VALUE,
        value: 'jest'
      })
    ).toEqual({ "inputValue": "jest" })
  })

  it('测试 CHANGE_ITEMS', () => {
    expect(
      reducer([], {
        type: types.CHANGE_ITEMS,
        value: [{
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
      })
    ).toEqual({
      undoItems: [{
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
    })
  })
})