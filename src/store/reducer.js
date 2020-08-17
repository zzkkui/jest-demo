import { CHANGE_INPUT_VALUE, CHANGE_ITEMS, INIT_DATA } from './contants'

export const initState = {
  inputValue: '',
  undoItems: [],
  data: {}
}

export default (state = initState, action) => {
  const { type, value } = action
  // const newState = {...state}
  switch (type) {
    case INIT_DATA:
      return { ...state, data: value }
    case CHANGE_INPUT_VALUE:
      return { ...state, inputValue: value }
    case CHANGE_ITEMS:
      return { ...state, undoItems: value }
    default:
      return state
  }

}