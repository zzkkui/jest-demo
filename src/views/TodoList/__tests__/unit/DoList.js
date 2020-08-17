
import React from 'react';
import { shallow, mount } from 'enzyme';
import DoList from '../../components/DoList';
import { findTestWrapper } from '../../../../utils/testUtils'

const listData = [{
  value: 'jest',
  isFocus: true,
  isChecked: true
}, {
  value: 'TDD',
  isFocus: true,
  isChecked: true
}, {
  value: 'react',
  isFocus: false,
  isChecked: false
}]

describe('DoList 组件', () => {

  it('样式渲染正常', () => {
    const warpper = mount(<DoList list={listData} />)
    const listItem = findTestWrapper(warpper, 'do-list-item')
    expect(listItem.length).toBe(2)
    expect(warpper).toMatchSnapshot()
  })

  it('数据为空时样式渲染正常', () => {
    const warpper = shallow(<DoList list={[]} />)
    expect(warpper).toMatchSnapshot()
  })
});


