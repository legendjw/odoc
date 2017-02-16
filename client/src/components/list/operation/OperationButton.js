import React, { PropTypes } from 'react'

/**
 * 列表页面操作按钮
 */
export default class OperationButton extends React.Component {
  static propTypes = {
    operation: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      'fetchCache': []
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    const { operation, actions } = this.props
    const firstUpperId = operation.id[0].toUpperCase() + operation.id.slice(1)
    const fetchMethodName = 'fetch' + firstUpperId
    const openMethodName = 'open' + firstUpperId

    if (this.state.fetchCache.includes(operation.id)) {
      actions[openMethodName](operation.url)
    }
    else {
      actions[fetchMethodName](operation.url)

      this.setState((prevState, props) => ({
        'fetchCache': [...prevState.fetchCache, operation.id]
      }))
    }
  }

  render () {
    const { operation } = this.props

    return (
      <div className="ui button" onClick={this.handleClick}>{operation.name}</div>
    )
  }
}
