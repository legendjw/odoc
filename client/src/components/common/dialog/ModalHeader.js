import React, { PropTypes } from 'react'

/**
 * 弹窗模式框头部
 */
export default class ModalHeader extends React.Component {
  static propTypes = {
    header: PropTypes.string.isRequired,
  }

  render () {
    const { header } = this.props

    return (
      <div className="header">
        {header}
      </div>
    )
  }
}
