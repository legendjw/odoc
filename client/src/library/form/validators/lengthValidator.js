import Validator from './validator'
import _ from 'lodash/lang'

/**
 * 长度验证器
 */
export default class LengthValidator extends Validator {
  /**
   * @inheritdoc
   */
  get defaultMessage() {
    let message = ''
    if (this.minimum !== undefined) {
      message = `至少包含${this.minimum}个字符`
    }
    else if (this.maxmum !== undefined) {
      message = `最多包含${this.maxmum}个字符`
    }
    else if (this['in'] !== undefined) {
      message = `字符长度必须在${this['in'][0]}到${this['in'][1]}范围之间`
    }
    else if (this.is !== undefined) {
      message = `必须只能包含${this.is}个字符`
    }
    return message
  }

  /**
   * getter 最小长度
   */
  get minimum() {
    return this._minimum
  }

  /**
   * setter 最小长度
   */
  set minimum(value) {
    if (!_.isNumber(value)) {
      throw new Error('attribute `minimum` must be a number')
    }
    this._minimum = value
  }

  /**
   * getter 最大长度
   */
  get maxmum() {
    return this._maxmum
  }

  /**
   * setter 最大长度
   */
  set maxmum(value) {
    if (!_.isNumber(value)) {
      throw new Error('attribute `maxmum` must be a number')
    }
    this._maxmum = value
  }

  /**
   * getter 指定长度范围
   */
  get in() {
    return this._in
  }

  /**
   * setter 指定长度范围
   */
  set in(value) {
    if (!_.isArray(value) || !_.isNumber(value[0]) || !_.isNumber(value[1])) {
      throw new Error('attribute `in` must be a array with two numbers')
    }
    this._in = value
  }

  /**
   * getter 指定长度
   */
  get is() {
    return this._is
  }

  /**
   * setter 指定长度
   */
  set is(value) {
    if (!_.isNumber(value)) {
      throw new Error('attribute `is` must be a number')
    }
    this._is = value
  }

  /**
   * @inheritdoc
   */
  validate() {
    let result = false
    const length = this.value.length
    if (this.minimum !== undefined) {
      result = length >= this.minimum
    }
    else if (this.maxmum !== undefined) {
      result = length <= this.maxmum
    }
    else if (this['in'] !== undefined) {
      result = length >= this['in'][0] && length <= this['in'][1]
    }
    else if (this.is !== undefined) {
      result = length === this.is
    }
    return result
  }
}
