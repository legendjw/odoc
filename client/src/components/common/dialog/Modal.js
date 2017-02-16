import React, { PropTypes } from 'react'
import ModalHeader from './ModalHeader'
import ModalContent from './ModalContent'
import ModalActions from './ModalActions'

/**
 * 弹窗模式框
 */
export default class Tab extends React.Component {
  static propTypes = {
    dialog: PropTypes.object.isRequired,
    content: PropTypes.string.isRequired
  }

  render () {
    const { dialog, size = 'medium', header = false, content, imageContent, actions = [], showClose = true } = this.props

    return (
      <div className={`ui modal ${size}`}>
        {showClose && <i className="close icon"></i>}
        {header && <ModalHeader header={header} />}
        <ModalContent content={content} imageContent={imageContent} />
        {actions && <ModalActions dialog={dialog} actions={actions} />}
      </div>
    )
  }
}
