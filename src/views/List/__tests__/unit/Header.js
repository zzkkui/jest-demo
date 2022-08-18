
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store'
import HeaderWap, { Header } from '../../components/Header';
import { findTestWrapper } from '../../../../utils/testUtils'

const mockStore = configureStore([])

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
    const warpper = shallow(<Header inputValue={''} />)
    const inputEle = findTestWrapper(warpper, 'input')
    expect(inputEle.prop('value')).toEqual('')
  })

  it('input 框内容，当用户输入时，会触发 changeInputValue 方法', () => {
    const fn = jest.fn()
    const warpper = shallow(<Header inputValue={''} changeInputValue={fn} />)
    const inputEle = findTestWrapper(warpper, 'input')
    const userInput = 'jest'
    // simulate 模拟事件触发
    inputEle.simulate('change', {
      target: {
        value: userInput
      }
    })
    warpper.setProps({
      inputValue: userInput
    })
    expect(fn).toHaveBeenLastCalledWith(userInput)
    const newInputEle = findTestWrapper(warpper, 'input')
    expect(newInputEle.prop('value')).toEqual(userInput)
  })

  it('input 框回车时，如果 input 无内容，无操作', () => {
    const fn = jest.fn()
    const warpper = shallow(<Header inputValue={''} changeItems={fn} />)
    const inputEle = findTestWrapper(warpper, 'input')
    inputEle.simulate('keyUp', {
      keyCode: 13
    })
    expect(fn).not.toHaveBeenCalled()
  })

  it('input 框回车时，如果 input 有内容，changeInputValue, changeItems 被调用，内容被清除', () => {
    const fn = jest.fn()
    const fn1 = jest.fn()
    const warpper = shallow(<Header inputValue={''} undoItems={[]} changeItems={fn} changeInputValue={fn1} />)
    const inputEle = findTestWrapper(warpper, 'input')
    const value = {
      value: 'jest',
      isFocus: false,
      isChecked: false
    }
    const afterInputValue = ''
    warpper.setProps({ inputValue: value.value })
    inputEle.simulate('keyUp', {
      keyCode: 13
    })

    // expect(fn).toHaveBeenCalled()
    // 校验最后调用参数
    expect(fn).toHaveBeenLastCalledWith([value])
    expect(fn1).toHaveBeenLastCalledWith(afterInputValue)
    warpper.setProps({ inputValue: afterInputValue })
    warpper.setProps({ undoItems: [value] })
    const newInputEle = findTestWrapper(warpper, 'input')
    expect(newInputEle.prop('value')).toEqual(afterInputValue)
  })

  describe('Header 组件方法', () => {
    it('测试 onChangeInput 方法', () => {
      const fn = jest.fn()
      const value = 'jest'
      const e = { target: { value } }
      const warpper = shallow(<Header changeInputValue={fn} />)
      const spyFunction = jest.spyOn(warpper.instance(), 'onChangeInput');
      warpper.instance().onChangeInput(e);
      expect(spyFunction).toHaveBeenCalled();
      expect(fn).toHaveBeenLastCalledWith(value);
      spyFunction.mockRestore();
    })

    it('测试 onKeyUpInput 方法', () => {
      const fn = jest.fn()
      const fn1 = jest.fn()
      const e = { keyCode: 13 }
      const warpper = shallow(<Header inputValue={'jest'} undoItems={[]} changeInputValue={fn} changeItems={fn1} />)
      const spyFunction = jest.spyOn(warpper.instance(), 'onKeyUpInput');
      warpper.instance().onKeyUpInput(e);
      expect(spyFunction).toHaveBeenCalled();
      expect(fn).toHaveBeenLastCalledWith('');
      expect(fn1).toHaveBeenCalled();
      spyFunction.mockRestore();
    })
  });

  describe('测试 connect 提供给 Header 的属性', () => {
    // HeaderWap
    const store = mockStore({
      todo: {
        undoItems: [],
        inputValue: ''
      },
      changeInputValue: jest.fn(),
      changeItems: jest.fn()
    })
    const warpper = shallow(<HeaderWap store={store} />).find('Header')
    expect(warpper.prop('undoItems')).toBeTruthy()
    expect(warpper.prop('inputValue')).toBe('')
    expect(warpper.prop('changeInputValue')).toBeTruthy()
    expect(warpper.prop('changeItems')).toBeTruthy()
  });
});
