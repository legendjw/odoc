import 'babel-polyfill'
import fetch from 'isomorphic-fetch'
import { createActions } from 'redux-actions'

export const { receiveObject, requestObject } = createActions({
  RECEIVE_OBJECT: (json) => ({object: json})
}, 'REQUEST_OBJECT')

export const fetchObject = (url) => dispatch => {
  dispatch(requestObject())
  return fetch(url, {credentials: 'include'})
    .then(response => response.json())
    .then(json => dispatch(receiveObject(json)))
}
