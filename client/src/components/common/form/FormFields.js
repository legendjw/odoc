import React, { PropTypes } from 'react'
import FormField from './FormField'
import * as Controls from './controls'
import _capitalize from 'lodash/capitalize'
import _isArray from 'lodash/isArray'

/**
 * 表单字段包裹组组件
 * 主要负责渲染一组表单字段
 */
export default class FormFields extends React.Component {
  static propTypes = {
    attributes: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.object
    ])
  }

  /**
   * 根据字段信息获取指定控件
   */
  getControl(attribute) {
    const capType = _capitalize(attribute.type.id)
    if (Controls.hasOwnProperty(capType)) {
      return Controls[capType]
    }
    else {
      throw new Error('unsupported control `' + capType +'`')
    }
  }

  /**
   * 渲染单个字段
   */
  renderField(attribute) {
    const control = this.getControl(attribute)

    const labelElement = React.createElement('label', null, attribute.name)
    const controlElement = React.createElement(control, attribute.type)

    return [labelElement, controlElement]
  }

  /**
   * 渲染一组字段
   */
  renderFields() {
    const { attributes } = this.props
    let fields = []

    if (_isArray(attributes)) {
      attributes.forEach(attribute => {
        const fieldElements = this.renderField(attribute)

        fields.push(React.createElement(FormField, null, ...fieldElements))
      })
    }
    else {
      fields = this.renderField(attributes)
    }
    return fields
  }

  render () {
    const { eachLineFieldNumber, attributes } = this.props
    const fields = this.renderFields()
    const fieldNumber = _isArray(attributes) ? eachLineFieldNumber : 1

    return (
      <FormField fieldNumber={fieldNumber}>
        {fields}
      </FormField>
    )
  }
}
