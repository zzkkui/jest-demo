
import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../components/Header';
import { findTestWrapper } from '../../../../utils/testUtils'

describe('Header 组件', () => {
  it('样式渲染正常', () => {
    const warpper = shallow(<Header />)
    expect(warpper).toMatchSnapshot()
  })

  it('包含一个 input 框', () => {
    const warpper = shallow(<Header />)
    const inputEle = findTestWrapper(warpper, 'input')
    // expect(inputEle.length).toBe(1)
    expect(inputEle).toExist()
  })

  it('input 框内容，初始化为空', () => {
    const warpper = shallow(<Header />)
    // const inputEle = warpper.find('[data-test="input"]')
    // expect(inputEle).toHaveProp('value', '')
    expect(warpper.state('inputValue')).toEqual('')
  })

  it('input 框内容，当用户输入时，会跟随变化', () => {
    const warpper = shallow(<Header />)
    const inputEle = findTestWrapper(warpper, 'input')
    const userInput = 'jest'
    // simulate 模拟事件触发
    inputEle.simulate('change', {
      target: {
        value: userInput
      }
    })
    warpper.setState({
      inputValue: userInput
    })
    // 测试 组件的数据（单元测试 倾向）
    // warpper.state 获取组件数据
    expect(warpper.state('inputValue')).toEqual(userInput)

    // // 测试 dom 上的属性值 （集成测试 倾向）
    // const newInputEle = warpper.find('[data-test="input"]')
    // expect(newInputEle.prop('value')).toEqual(userInput)
  })

  it('input 框回车时，如果 input 无内容，无操作', () => {
    const fn = jest.fn()
    const warpper = shallow(<Header addUndoItem={fn} />)
    const inputEle = findTestWrapper(warpper, 'input')
    warpper.setState({ inputValue: '' })
    inputEle.simulate('keyUp', {
      keyCode: 13
    })
    expect(fn).not.toHaveBeenCalled()
  })

  it('input 框回车时，如果 input 有内容，外部传入的函数被调用，内容被清除', () => {
    const fn = jest.fn()
    const warpper = shallow(<Header addUndoItem={fn} />)
    const inputEle = findTestWrapper(warpper, 'input')
    const value = {
      value: 'jest',
      isFocus: false,
      isChecked: false
    }
    warpper.setState({ inputValue: value.value })
    inputEle.simulate('keyUp', {
      keyCode: 13
    })
    expect(fn).toHaveBeenCalled()
    // 校验最后调用参数
    expect(fn).toHaveBeenLastCalledWith(value)
    expect(warpper.state('inputValue')).toBe('')
  })
});
