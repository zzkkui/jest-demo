
import React from 'react';
import { shallow } from 'enzyme';
import DoList from '../../components/DoList';
// import { findTestWrapper } from '../../../../utils/testUtils'

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
    const warpper = shallow(<DoList list={listData} />)
    expect(warpper).toMatchSnapshot()
  })

  it('数据为空时样式渲染正常', () => {
    const warpper = shallow(<DoList list={[]} />)
    expect(warpper).toMatchSnapshot()
  })
});


