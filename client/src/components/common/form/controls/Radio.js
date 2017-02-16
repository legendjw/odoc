import React, { PropTypes } from 'react'
import Component from './Component'

/**
 * 表单单选控件组件
 */
export default class Text extends Component {

  renderOptions() {
    const { options } = this.props
    const optionsElements = Object.keys(options).map(key => {
      return (
        <div className="field">
          <div className="ui radio checkbox">
            <input type="radio" name="fruit" value="{key}" class="hidden" />
            <label>{options[key]}</label>
          </div>
        </div>
      )
    })
    return optionsElements
  }

  render() {
    const options = this.renderOptions()

    return (
      <div className="inline fields">
        {options}
      </div>
    )
  }
}
