import { createStore, combineReducers } from 'redux'
import reducer from './reducer'
import * as actions from './actions'

const reducers = combineReducers({ todo: reducer })

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export { actions, reducer }

export default store