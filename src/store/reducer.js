import { CHANGE_INPUT_VALUE, CHANGE_ITEMS } from './contants'

const initState = {
  inputValue: '',
  undoItems: []
}

export default (state = initState, action) => {
  const { type, value } = action
  // const newState = {...state}
  switch (type) {
    case CHANGE_INPUT_VALUE:
      return { ...state, inputValue: value }
    case CHANGE_ITEMS:
      return { ...state, undoItems: value }
    default:
      return state
  }

}