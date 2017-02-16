import Validator from './validator'
import isEmail from 'validator/lib/isEmail'

/**
 * 邮箱验证器
 */
export default class EmailValidator extends Validator {
  /**
   * @inheritdoc
   */
  get defaultMessage() {
    return '邮箱格式错误'
  }

  /**
   * @inheritdoc
   */
  validate() {
    return isEmail(this.value)
  }
}
