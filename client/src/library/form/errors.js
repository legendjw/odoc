import _isString from 'lodash/isString'

/**
 * 表单字段错误类
 */
export default class Errors {
  constructor(errors = new Map()) {
    this._errors = errors
  }

  /**
   * 获取错误消息
   *
   * @return {Map}
   */
  get messages() {
    return this._errors
  }

  /**
   * 获取以数组为数据结构的全部错误消息
   *
   * @return {Array}
   */
  get fullMessages() {
    let fullMessages = []
    this._errors.forEach((messages, selector) => {
      messages.forEach(message => {
        fullMessages.push(message)
      })
    })
    return fullMessages
  }

  /**
   * 是否含有指定选择器的错误
   *
   * @return {Boolean}
   */
  has(selector) {
    return this._errors.has(selector)
  }

  /**
   * 获取指定选择器的错误
   *
   * @return {Array}
   */
  get (selector) {
    return this._errors.get(selector)
  }

  /**
   * 返回错误数量
   *
   * @return {Number}
   */
  get size() {
    return this.fullMessages.length
  }

  /**
   * 新增一个选择器错误
   *
   * @return {this}
   */
  add(selector, messages) {
    messages = _isString(messages) ? [messages] : messages

    if (this.has(selector)) {
      this.get(selector).push(...messages)
    }
    else {
      this._errors.set(selector, messages)
    }
    return this
  }

  /**
   * 删除一个指定的选择器错误
   *
   * @return {this}
   */
  delete(selector) {
    if (this.has(selector)) {
      this._errors.delete(selector)
    }
    return this
  }

  /**
   * 清空所有的错误
   *
   * @return {this}
   */
  clear() {
    this._errors.clear()
    return this
  }
}
