import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import Util from './util'
import Modal from '../components/common/dialog/Modal'

/**
 * 通用弹出窗
 */
export default class Dialog {
  /**
   * 打开通用的弹出窗
   */
  static open(settings = {}) {
    const dialog = new Dialog(settings)
    dialog.show()
  }

  /**
   * 打开成功提示的弹出窗
   */
  static success(settings = {}) {
    const defaultSettings = {
      'header': '成功提示',
      'size': 'small',
      'imageContent': '<i class="green checkmark icon" style="font-size: 4rem;"></i>',
      'autoHideTime': 3000
    }
    settings = Object.assign({}, defaultSettings, settings)
    this.open(settings)
  }

  /**
   * 打开错误提示的弹出窗
   */
  static error(settings = {}) {
    const defaultSettings = {
      'header': '错误提示',
      'size': 'small',
      'imageContent': '<i class="red remove icon" style="font-size: 4rem;"></i>',
      'autoHideTime': 3000
    }
    settings = Object.assign({}, defaultSettings, settings)
    this.open(settings)
  }

  /**
   * 打开确认选择的弹出窗
   */
  static confirm(settings) {
    const defaultCallback = function (dialog) {
      dialog.hide()
    }
    const defaultSettings = {
      'header': '确认提示',
      'size': 'small',
      'imageContent': '<i class="yellow warning icon" style="font-size: 4rem;"></i>',
      'actions': [
        {
          name: '确定',
          html_options: {'class': 'primary'},
          callback: settings.onApprove ? settings.onApprove : defaultCallback
        },
        {
          name: '取消',
          callback: settings.onDeny ? settings.onDeny : defaultCallback
        }
      ]
    }
    settings = Object.assign({}, defaultSettings, settings)
    this.open(settings)
  }

  constructor(settings = {}) {
    settings = Object.assign({}, this.defaultSettings, settings)
    this.modalSettings = this.dialogSettings = this.componentSettings = new Map()
    const dialogSettings = new Set(['autoHideTime', 'onBeforeShow', 'onAfterShow', 'onBeforeHide', 'onAfterHide'])
    const componentSettingsFields = new Set(['size', 'header', 'content', 'actions', 'showClose'])

    //分离配置选项
    Object.keys(settings).forEach((key) => {
      if (componentSettingsFields.has(key)) {
        this.componentSettings.set(key, settings[key])
      }
      else if (dialogSettings.has(key)) {
        this.dialogSettings.set(key, settings[key])
      }
      else {
        this.modalSettings.set(key, settings[key])
      }
    })
  }

  /**
   * getter 弹出窗ID
   */
  get id() {
    this._id = this._id || 'dialog-' + Math.random().toString().substr(2,10)
    return this._id
  }

  /**
   * getter 视图层的`modal`对象
   */
  get modal() {
    return this._modal ? this._modal : undefined
  }

  /**
   * getter 弹窗默认使用的`semantic-ui`里的modal设置
   */
  get defaultSettings() {
    return {
      detachable: false,
      closable: false,
      dimmerSettings: {
        opacity: 0.1
      }
    }
  }

  /**
   * getter 自动关闭弹窗的时间
   */
  get autoHideTime() {
    return this.dialogSettings.has('autoHideTime') ? this.dialogSettings.get('autoHideTime') : 0
  }

  /**
   * 显示弹窗
   */
  show() {
    this._show()
    if (this.autoHideTime) {
      this.hide(this.autoHideTime)
    }
  }

  /**
   * 隐藏弹窗
   */
  hide(time = 0) {
    if (time) {
      setTimeout(() => {
        this._hide()
      }, time)
    }
    else {
      this._hide()
    }
  }

  /**
   * 内部显示实现
   */
  _show() {
    this._trigger('onBeforeShow')
    this._renderModal()
    $(this.modal).modal(Util.mapToObj(this.modalSettings)).modal('show')
    this._trigger('onAfterShow')
  }

  /**
   * 内部隐藏实现
   */
  _hide() {
    this._trigger('onBeforeHide')
    $(this.modal).modal('hide')
    this._trigger('onAfterHide')
  }

  /**
   * 渲染视图层的`modal`
   */
  _renderModal() {
    let div = document.createElement('div')
    div.setAttribute('id', this.id)
    document.body.appendChild(div)
    const dialogContainer = document.getElementById(this.id)

    ReactDOM.render(
      <Modal dialog={this} {...Util.mapToObj(this.componentSettings)} />,
      dialogContainer
    )
    this._modal = div.querySelector('.ui.modal')
  }

  /**
   * 触发指定事件
   */
  _trigger(eventName) {
    if (this.dialogSettings.has(eventName)) {
      const eventCallback = this.dialogSettings.get(eventName)
      eventCallback.call(this)
    }
  }
}
