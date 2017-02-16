import React, { PropTypes } from 'react'
import TableHead from './TableHead'
import TableBody from './TableBody'
import TableFoot from './TableFoot'

/**
 * list table
 */
export default class Table extends React.Component {
  static propTypes = {
    object: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
    page: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    fetchData: PropTypes.func.isRequired
  }

  render () {
    const { object, items, page, isFetching, fetchData } = this.props
    const listAttributes = object.list_attributes

    return isFetching ? (
      <div className="ui active inverted dimmer">
        <div className="ui text large loader"></div>
      </div>
    ) : (
      <table className="ui small basic selectable table">
        <TableHead attributes={listAttributes} />
        <TableBody attributes={listAttributes} items={items} />
        <TableFoot object={object} page={page} fetchData={fetchData} />
      </table>
    )
  }
}
