import React, { PropTypes } from 'react'

/**
 * 弹窗模式框内容
 */
export default class ModalHeader extends React.Component {
  static propTypes = {
    content: PropTypes.string.isRequired
  }

  render () {
    const { content, imageContent } = this.props

    if (imageContent) {
      return (
        <div className="image content">
          {imageContent && <div className="image" dangerouslySetInnerHTML={{__html: imageContent}}></div>}
          <div className="description" dangerouslySetInnerHTML={{__html: content}}>
          </div>
        </div>
      )
    }
    else {
      return (
        <div className="content" dangerouslySetInnerHTML={{__html: content}}>
        </div>
      )
    }
  }
}
