import { combineReducers } from 'redux'
import { object } from '../common/object'
import { data } from '../list/data'
import { newReducer } from '../new/new'

export default combineReducers({
  object,
  list: combineReducers({
    data
  }),
  'new': newReducer
})
