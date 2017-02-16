import Util from '../util'
import Validator from './validators/validator'
import * as validators from './validators'
import Errors from './errors'
import fetch from 'isomorphic-fetch'
import mime from 'mime-types'
import _isString from 'lodash/isString'
import _capitalize from 'lodash/capitalize'

/**
 * 表单辅助类
 */
export default class Form {
  constructor(selector, config) {
    this._form = document.querySelector(selector)
    if (!this.form) {
      throw new Error(`can't find form ${selector}`)
    }
    this._rules = {}
    this._errors = new Errors()
    if (config) {
      Util.configureObj(this, config)
    }
    this._fillCsrfToken()
  }

  /**
   * 获取表单对象
   */
  get form() {
    return this._form
  }

  /**
   * 获取字段验证规则
   */
  get rules() {
    return this._rules
  }

  /**
   * 设置字段验证规则
   */
  set rules(rules) {
    this._rules = rules
  }

  /**
   * 获取表单字段错误对象
   *
   * @return {Errors}
   */
  get errors() {
    return this._errors
  }

  /**
   * 验证表单属性是否通过验证
   *
   * @return {Boolean}
   */
  validate() {
    let validators = this._createValidators()
    this.errors.clear()
    validators.forEach(validator => {
      if (!validator.validate()) {
        this.errors.add(validator.selector, validator.message)
      }
    })
    return this.errors.size === 0
  }

  /**
   * 提交表单
   *
   * return {Promise}
   */
  submit(settings = {}) {
    const defaultSettings = {
      url: '',
      type: 'POST',
      dataType: '',
      header: {}
    }
    settings = Object.assign({}, defaultSettings, settings)
    const method = this.form.hasAttribute('method') ? this.form.getAttribute('method').toUpperCase() : settings.type.toUpperCase()
    const url = this.form.hasAttribute('action') ? this.form.getAttribute('action') : settings.url
    let fetchSettings = {
      credentials: 'include'
    }
    let header = Object.assign({}, settings.header)

    let dataMime
    header['Accept'] = settings.dataType && (dataMime = mime.lookup(settings.dataType)) ? dataMime : '*/*'

    if (method === 'POST') {
      fetchSettings['body'] =  new FormData(this.form)
      //header['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
      //fetchSettings['body'] = serialize(this.form, {empty: true})
    }

    fetchSettings['method'] = method
    fetchSettings['headers'] = new Headers(header)

    return fetch(url, fetchSettings)
  }

  /**
   * 创建指定验证器
   */
  _createValidator(validator, selector, config) {
    let validatorClass = _capitalize(validator) + 'Validator'
    if (!validators[validatorClass]) {
      throw new Error(`unsupported validator ${validatorClass}`)
    }
    return new validators[validatorClass](selector, config)
  }

  /**
   * 根据验证规则创建所有的验证器
   */
  _createValidators() {
    let validators = []
    Object.keys(this.rules).forEach(selector => {
      this.rules[selector].forEach(config => {
        let validatorInstance
        if (_isString(config)) {
          validatorInstance = this._createValidator(config, selector)
        }
        else {
          let cloneConfig = Object.assign({}, config)
          let validator = cloneConfig.validator
          delete cloneConfig.validator
          validatorInstance = this._createValidator(validator, selector, cloneConfig)
        }
        validators.push(validatorInstance)
      })
    })
    return validators
  }

  /**
   * 给表单填充csrf验证隐藏域
   */
  _fillCsrfToken() {
    const csrfParam = document.querySelector('meta[name="csrf-param"]')
    const csrfToken = document.querySelector('meta[name="csrf-token"]')
    if (csrfParam && csrfToken) {
      let crsfInput = document.createElement('input')
      crsfInput.setAttribute('type', 'hidden')
      crsfInput.setAttribute('name', csrfParam.getAttribute('content'))
      crsfInput.setAttribute('value', csrfToken.getAttribute('content'))
      this._form.appendChild(crsfInput)
    }
  }
}
