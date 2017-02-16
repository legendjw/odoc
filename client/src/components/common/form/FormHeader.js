import React, { PropTypes } from 'react'

/**
 * 表单头部组件
 */
export default class FormHeader extends React.Component {
  static propTypes = {
    category: PropTypes.object.isRequired
  }

  render () {
    const { category } = this.props

    return (
      <h5 className="ui dividing header">{category.name}</h5>
    )
  }
}
