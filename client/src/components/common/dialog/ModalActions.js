import React, { PropTypes } from 'react'

/**
 * 弹窗模式框动作按钮
 */
export default class ModalActions extends React.Component {
  static propTypes = {
    dialog: PropTypes.object.isRequired,
    actions: PropTypes.array.isRequired
  }

  render () {
    const { dialog, actions } = this.props
    const buttonDefaultClass = 'ui button'
    const buttons = actions.map(item => {
      let htmlOptions = Object.assign({}, item.html_options)
      if (htmlOptions['class']) {
        htmlOptions['className'] = buttonDefaultClass + ' ' + htmlOptions['class']
        delete htmlOptions['class']
      }
      else {
        htmlOptions['className'] = buttonDefaultClass
      }
      if (item.callback) {
        htmlOptions['onClick'] = () => {
          return item.callback.call(dialog)
        }
      }
      return (
        <div key={'modal_actions_' + item.name} {...htmlOptions}>
            {item.name}
            {item.icon && <i className={item.icon + ' icon'}></i> }
        </div>
      )
    })

    return (
      <div className="actions">
        {buttons}
      </div>
    )
  }
}
