import React, { PropTypes } from 'react'
import NumberConverter from 'number-to-words'

/**
 * 表单字段包裹组件
 */
export default class FormField extends React.Component {
  static propTypes = {
    fieldNumber: PropTypes.number,
    wide: PropTypes.number
  }

  get numberClass() {
    const { fieldNumber = 1 } = this.props
    return fieldNumber <= 1 ? 'field' : NumberConverter.toWords(fieldNumber) + ' fields'
  }

  get wideClass() {
    const { wide } = this.props
    return wide ? NumberConverter.toWords(wide) + ' wide' : ''
  }

  render () {
    const { children } = this.props

    return (
      <div className={this.wideClass + ' ' + this.numberClass}>
        {children}
      </div>
    )
  }
}
