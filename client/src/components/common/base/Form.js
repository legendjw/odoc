import React, { PropTypes } from 'react'
import Form from '../../../library/form'
import Errors from '../../../library/form/errors'

/**
 * 通用表单基类组件
 */
export default class BaseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: 'default',
      errors: new Errors()
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this._form = new Form('.form', {rules: this.rules})
    this.inputFocus()
  }

  inputFocus() {
    window.$("input:first").trigger('focus')
  }

  handleSubmit(e) {
    const isValidate = this._form.validate()
    this.setState({errors: this._form.errors})

    if (isValidate) {
      this._form.submit({dataType: 'json'})
        .then(response => this.onRequestSuccess(response))
        .catch(e => this.onRequestError(e))
    }

    e.preventDefault()
  }

  onRequestError(e) {
    throw new Error(e)
  }
}
