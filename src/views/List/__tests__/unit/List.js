import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme';
import List from '../../index';
import { reducers, enhancer } from '../../../../store/createStore'

// jest.mock("react-redux", () => ({
//   connect(/* mapStateToProps, mapDispatchToProps */) {
//     return function (WrappedComponent) {
//       function FakeConnect() {
//         return <WrappedComponent />;
//       }
//       const name = WrappedComponent.displayName || WrappedComponent.name || "Component";
//       FakeConnect.displayName = `Connect(${name})`;
//       return FakeConnect;
//     };
//   }
// }));


let store;

beforeEach(() => {
  store = createStore(reducers, enhancer)
})

describe('List 组件', () => {
  it('样式渲染正常', () => {
    const warpper = shallow(<List store={store} />).find('List').dive()
    expect(warpper).toMatchSnapshot()
  })

  // it('初始化列表为空', () => {
  //   const warpper = shallow(<Provider store={store}><List /></Provider>)
  //   // console.log(warpper.prop('value').store.getState().todo.undoItems)
  //   expect((warpper.prop('value').store.getState().todo.undoItems)).toEqual([])
  // })

  it('Header 组件存在 changeInputValue、changeItems、inputValue、undoItems 属性', () => {
    // const warpper = mount(shallow(<Provider store={store}><List /></Provider>).get(0))
    // //包括 redux 注入的 props
    // const ele = warpper.find('Header')
    // // 不包括 redux 注入的 props
    // // const ele = warpper.find('Connect(Header)')
    // console.log(ele.props())
    // axios.get.mockImplementation((...args) => {
    //   if (args[0] === '/init') {
    //     return Promise.resolve({ data: {} })
    //   } else if (args[0] === '/undolist.json') {
    //     return Promise.resolve({ data: [] })
    //   }
    // })
    const warpper = mount(<Provider store={store}><List /></Provider>)
    const ele = warpper.find('Header')
    // const ele = warpper.find('Connect(Header)')
    // console.log(ele.props())
    expect(ele.prop('changeInputValue')).toBeTruthy()
    expect(ele.prop('changeItems')).toBeTruthy()
    expect(ele.prop('inputValue')).toBe('')
    expect(ele.prop('undoItems')).toBeTruthy()

    //## 浅渲染， 只能 find 组件，不能 find 高阶组件
    // 需要 mock react-redux  不包括 redux 注入的 props
    // const warpper = shallow(<List />).first().shallow()
    // const ele = warpper.find('Connect(Header)')
    // console.log(ele.props())

    // 不包括 redux 注入的 props
    // const warpper = shallow(<List store={store} />).find('List').dive()
    // const ele = warpper.find('Connect(Header)')
    // console.log(ele.props())
  })

  it('DList 组件存在 list 属性', () => {
    const warpper = shallow(<List store={store} />).find('List').dive()
    const DList = warpper.find('DList')
    expect(DList.prop('list')).toBeTruthy()
  })
});

