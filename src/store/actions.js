import axios from 'axios'
import 'cross-fetch/polyfill'
import { CHANGE_INPUT_VALUE, CHANGE_ITEMS, INIT_DATA } from './contants'

const actionsBuilder = (type) => (value) => ({
  type,
  value
})

export const getInitData = actionsBuilder(INIT_DATA)

export const changeInputValue = actionsBuilder(CHANGE_INPUT_VALUE)

export const changeItems = actionsBuilder(CHANGE_ITEMS)

export const initData = () => {
  return (dispatch) => {
    axios.get('/init').then(res => {
      // console.log(res);
      dispatch({
        type: INIT_DATA,
        value: res.data
      })
    }).catch(e => {
      // console.log(e)
      // dispatch({
      //   type: INIT_DATA,
      //   value: {}
      // })
    })
  }
}

// 这里引入了 redux-thunk 所以 action 可以返回一个函数
export const getItems = () => {
  return (dispatch) => {
    return axios.get('/undolist.json').then(res => {
      // console.log(res);
      // const actions = changeItems(res.data)
      // dispatch(actions)
      dispatch({
        type: CHANGE_ITEMS,
        value: res.data
      })
    }).catch(e => {
      // console.log(e)
      // dispatch({
      //   type: CHANGE_ITEMS,
      //   value: []
      // })
    })
  }
}