import React, { PropTypes } from 'react'

/**
 * list table header
 */
export default class TableHead extends React.Component {
  static propTypes = {
    attributes: PropTypes.array.isRequired
  }

  render () {
    const { attributes } = this.props

    return (
      <thead>
        <tr>
          <th>
            <div className="ui fitted checkbox">
              <input type="checkbox" /> <label></label>
            </div>
          </th>

          {attributes.map(item =>
            <th key={'table_head_' + item.id}>{item.name}</th>
          )}

        </tr>
      </thead>
    )
  }
}
