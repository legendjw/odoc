import { handleActions } from 'redux-actions'

export const newReducer = handleActions({
  REQUEST_NEW: (state, action) => {
    return Object.assign({}, state, {
      isFetching: true
    })
  },
  RECEIVE_NEW: (state, action) => {
    return Object.assign({}, state, {
      isFetching: false,
      form: action.payload.form
    })
  }
}, {
  isFetching: false,
  form: {
    attributes: []
  }
})
