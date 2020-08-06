import axios from 'axios'
import { CHANGE_INPUT_VALUE, CHANGE_ITEMS } from './contants'

const actionsBuilder = (type) => (value) => ({
  type,
  value
})

export const changeInputValue = actionsBuilder(CHANGE_INPUT_VALUE)

export const changeItems = actionsBuilder(CHANGE_ITEMS)

// 这里引入了 redux-thunk 所以 action 可以返回一个函数
export const getItems = () => {
  return (dispatch) => {
    return axios.get('/undolist.json').then(res => {
      // const actions = changeItems(res.data)
      // dispatch(actions)
      dispatch({
        type: CHANGE_ITEMS,
        value: res.data
      })
    }).catch(e => {
      // console.log(e)
      dispatch({
        type: CHANGE_ITEMS,
        value: []
      })
    })
  }
}