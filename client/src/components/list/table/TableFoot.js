import React, { PropTypes } from 'react'
import Page from './Page'

/**
 * list table footer
 */
export default class TableHead extends React.Component {
  static propTypes = {
    object: PropTypes.object.isRequired,
    page: PropTypes.object.isRequired,
    fetchData: PropTypes.func.isRequired
  }

  render () {
    const { object, page, fetchData } = this.props

    return (
      <tfoot>
        <tr>
          <th colSpan={object.list_attributes.length + 1}>
            <Page page={page} fetchData={fetchData} />
          </th>
        </tr>
      </tfoot>
    )
  }
}
