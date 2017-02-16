import 'babel-polyfill'
import fetch from 'isomorphic-fetch'
import { createActions } from 'redux-actions'
import Dialog from '../../library/dialog'

export const { receiveNew, requestNew } = createActions({
  RECEIVE_NEW: (json) => ({form: json})
}, 'REQUEST_NEW')

/**
 * 获取新增操作所需数据
 */
export const fetchNew = (url) => dispatch => {
  dispatch(requestNew())
  return fetch(url, {credentials: 'include'})
    .then(response => response.json())
    .then(json => dispatch(receiveNew(json)))
}

/**
 * 打开新增表单
 */
export const openNew = () => dispatch => {
  const formHtml = document.querySelector('#new-container').innerHTML

  return Dialog.open({
    'header': '表单提交',
    'content': formHtml,
    'actions': [
      {
        id: 'submit',
        html_options: {'class': 'primary'},
        name: '提交'
      },
      {
        id: 'cancel',
        html_options: {'class': 'cancel'},
        name: '取消'
      }
    ]
  })
}
