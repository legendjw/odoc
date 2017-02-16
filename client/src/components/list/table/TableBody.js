import React, { PropTypes } from 'react'

/**
 * list table body
 */
export default class TableBody extends React.Component {
  render () {
    const { attributes, items } = this.props

    return (
      <tbody>
        {items.map((item, index) =>
          <tr key={'table_body_tr_' + item.id}>
            <td>{++index}</td>
            {attributes.map(attribute =>
              <td key={'table_body_td_' + item.id + attribute.id}>{item[attribute.id]}</td>
            )}
          </tr>
        )}
      </tbody>
    )
  }
}
