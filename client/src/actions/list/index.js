import 'babel-polyfill'
import fetch from 'isomorphic-fetch'
import { createActions } from 'redux-actions'

export const { receiveData, requestData } = createActions({
  RECEIVE_DATA: json => ({data: json})
}, 'REQUEST_DATA')

export const fetchData = url => dispatch => {
  dispatch(requestData())
  return fetch(url, {credentials: 'include'})
    .then(response => response.json())
    .then(json => dispatch(receiveData(json)))
}
