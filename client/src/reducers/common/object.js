import { handleActions } from 'redux-actions'

export const object = handleActions({
  REQUEST_OBJECT: (state, action) => {
    return Object.assign({}, state, {
      isFetching: true
    })
  },
  RECEIVE_OBJECT: (state, action) => {
    return Object.assign({}, state, {
      isFetching: false,
      ...action.payload.object
    })
  }
}, {
  isFetching: false,
  operations: [], 
  list_attributes: []
})
