import React, { PropTypes } from 'react'
import OperationButton from './OperationButton'

/**
 * list operations
 */
export default class Operation extends React.Component {
  static propTypes = {
    operations: PropTypes.array.isRequired
  }

  render () {
    const { operations, actions } = this.props

    return (
      <div id="operations-buttons-container" className="ui mini basic buttons">
        {operations.map(item =>
          <OperationButton key={'list_operations_' + item.id} operation={item} actions={actions} />
        )}
      </div>
    )
  }
}
