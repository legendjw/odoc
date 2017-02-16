import Util from '../../util'
import _capitalize from 'lodash/capitalize'

/**
 * 验证器基类
 */
export default class Validator {
  constructor(selector, config) {
    this._selector = selector
    this._element = Util.fuzzyQuerySelector(selector)
    if (!this.element) {
      throw new Error(`can't find element ${selector}`)
    }
    if (config) {
      Util.configureObj(this, config)
    }
  }

  get selector() {
    return this._selector
  }

  get element() {
    return this._element
  }

  get value() {
    return this.element.value
  }

  get message() {
    return this._message ? this._message : this.defaultMessage
  }

  set message(message) {
    this._message = message
  }

  validate() {
    return false
  }
}
