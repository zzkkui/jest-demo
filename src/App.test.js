// import React from 'react';
// import ReactDOM from 'react-dom';
// // import { render } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   // const { getByText } = render(<App />);
//   // const linkElement = getByText(/123/i);
//   // expect(linkElement).toBeInTheDocument();
//   const div = document.createElement('div')
//   ReactDOM.render(<App />, div)
//   const container = div.getElementsByClassName('App')
//   expect(container.length).toBe(1)
// });

import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  // mount 集成测试适合，会把 App 组件内部子组件 也进行渲染测试（更耗性能）
  // shallow 浅渲染，只会渲染 App 组件，App 内部组件只是用标记代替，单元测试
  const warpper = shallow(<App />)
  const container = warpper.find('[data-test="container"]')
  // console.log(warpper.debug())
  // expect(warpper.find('[data-test="container"]').length).toBe(1)
  // expect(warpper.find('[data-test="container"]').prop('title')).toBe('pkpk')
  // toExist 需要安装 jest-enzyme，同时需要配置 setupFilesAfterEnv './node_modules/jest-enzyme/lib/index.js'
  expect(container).toExist()

  // expect(container.length).toBe(1)
  // const warpper = shallow(<App />)
  // // 组件的快照 适用于那些纯文本或不怎么需要改动的组件（公共组件等）
  // expect(warpper).toMatchSnapshot()
})
