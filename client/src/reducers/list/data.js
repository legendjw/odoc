import { handleActions } from 'redux-actions'

export const data = handleActions({
  REQUEST_DATA: (state, action) => {
    return Object.assign({}, state, {
      isFetching: true
    })
  },
  RECEIVE_DATA: (state, action) => {
    return Object.assign({}, state, {
      isFetching: false,
      ...action.payload.data
    })
  }
}, {
  isFetching: false,
  items: [],
  page: {}
})
