import Validator from './validator'
import _ from 'lodash/lang'
import isNumeric from 'validator/lib/isNumeric'

/**
 * 数字验证器
 */
export default class NumericalityValidator extends Validator {
  /**
   * @inheritdoc
   */
  get defaultMessage() {
    let message = '不是一个数字'
    if (this.greaterThan !== undefined) {
      message = `必须大于${this.greaterThan}`
    }
    else if (this.greaterThanOrEqualTo !== undefined) {
      message = `必须大于等于${this.greaterThanOrEqualTo}`
    }
    else if (this.equalTo !== undefined) {
      message = `必须等于${this.equalTo}`
    }
    else if (this.lessThan !== undefined) {
      message = `必须小于${this.lessThan}`
    }
    else if (this.lessThanOrEqualTo !== undefined) {
      message = `必须小于等于${this.lessThanOrEqualTo}`
    }
    else if (this.otherThan !== undefined) {
      message = `必须不是${this.otherThan}`
    }
    else if (this.odd !== undefined) {
      message = `必须是奇数`
    }
    else if (this.even !== undefined) {
      message = `必须是偶数`
    }
    return message
  }

  /**
   * getter 仅是整数
   */
  get onlyInteger() {
    return this._onlyInteger
  }

  /**
   * setter 仅是整数
   */
  set onlyInteger(value) {
    if (!_.isBoolean(value)) {
      throw new Error('attribute `onlyInteger` must be a boolean')
    }
    this._onlyInteger = value
  }

  /**
   * getter 大于数
   */
  get greaterThan() {
    return this._greaterThan
  }

  /**
   * setter 大于数
   */
  set greaterThan(value) {
    if (!_.isNumber(value)) {
      throw new Error('attribute `greaterThan` must be a number')
    }
    this._greaterThan = value
  }

  /**
   * getter 大于等于数
   */
  get greaterThanOrEqualTo() {
    return this._greaterThanOrEqualTo
  }

  /**
   * setter 大于等于数
   */
  set greaterThanOrEqualTo(value) {
    if (!_.isNumber(value)) {
      throw new Error('attribute `greaterThan` must be a number')
    }
    this._greaterThanOrEqualTo = value
  }

  /**
   * getter 等于数
   */
  get equalTo() {
    return this._equalTo
  }

  /**
   * setter 等于数
   */
  set equalTo(value) {
    if (!_.isNumber(value)) {
      throw new Error('attribute `equalTo` must be a number')
    }
    this._equalTo = value
  }

  /**
   * getter 小于数
   */
  get lessThan() {
    return this._lessThan
  }

  /**
   * setter 小于数
   */
  set lessThan(value) {
    if (!_.isNumber(value)) {
      throw new Error('attribute `lessThan` must be a number')
    }
    this._lessThan = value
  }

  /**
   * getter 小于等于数
   */
  get lessThanOrEqualTo() {
    return this._lessThanOrEqualTo
  }

  /**
   * setter 小于等于数
   */
  set lessThanOrEqualTo(value) {
    if (!_.isNumber(value)) {
      throw new Error('attribute `lessThanOrEqualTo` must be a number')
    }
    this._lessThanOrEqualTo = value
  }

  /**
   * getter 不等于数
   */
  get otherThan() {
    return this._otherThan
  }

  /**
   * setter 不等于数
   */
  set otherThan(value) {
    if (!_.isNumber(value)) {
      throw new Error('attribute `otherThan` must be a number')
    }
    this._otherThan = value
  }

  /**
   * getter 基数
   */
  get odd() {
    return this._odd
  }

  /**
   * setter 基数
   */
  set odd(value) {
    if (!_.isBoolean(value)) {
      throw new Error('attribute `odd` must be a boolean')
    }
    this._odd = value
  }

  /**
   * getter 偶数
   */
  get even() {
    return this._even
  }

  /**
   * setter 偶数
   */
  set even(value) {
    if (!_.isBoolean(value)) {
      throw new Error('attribute `even` must be a boolean')
    }
    this._even = value
  }

  /**
   * @inheritdoc
   */
  validate() {
    let result = !isNumeric(this.value) ? false : true
    if (!result) {
      return result
    }

    const value = _.toNumber(this.value)

    if (this.greaterThan !== undefined) {
      result = value > this.greaterThan
    }
    else if (this.greaterThanOrEqualTo !== undefined) {
      result = value >= this.greaterThanOrEqualTo
    }
    else if (this.equalTo !== undefined) {
      result = value === this.equalTo
    }
    else if (this.lessThan !== undefined) {
      result = value < this.lessThan
    }
    else if (this.lessThanOrEqualTo !== undefined) {
      result = value <= this.lessThanOrEqualTo
    }
    else if (this.otherThan !== undefined) {
      result = value !== this.otherThan
    }
    else if (this.odd !== undefined && this.odd) {
      result = value % 2 !== 0
    }
    else if (this.even !== undefined && this.even) {
      result = value % 2 === 0
    }

    return result
  }
}
