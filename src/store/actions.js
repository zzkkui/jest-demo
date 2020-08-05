import { CHANGE_INPUT_VALUE, CHANGE_ITEMS } from './contants'

export const changeInputValue = value => ({
  type: CHANGE_INPUT_VALUE,
  value
})

export const changeItems = value => ({
  type: CHANGE_ITEMS,
  value
})