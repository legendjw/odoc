import Validator from './validator'
import isEmpty from 'validator/lib/isEmpty'

/**
 * 存在验证器
 */
export default class PresenceValidator extends Validator {
  get defaultMessage() {
    return '不能为空'
  }

  validate() {
    return !isEmpty(this.value.trim())
  }
}
