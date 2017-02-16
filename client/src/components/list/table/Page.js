import React, { PropTypes } from 'react'
import PageItem from './PageItem'

/**
 * list table page
 */
export default class Page extends React.Component {
  static propTypes = {
    page: PropTypes.object.isRequired,
    fetchData: PropTypes.func.isRequired
  }

  render () {
    const { page, fetchData } = this.props

    return (
      <div className="ui mini right floated pagination menu">
        <a className="item">共 {page.total_count} 条 / {page.total_pages} 页</a>
        {page.items && page.items.map(item =>
          <PageItem key={'table_page_item_' + item.name} item={item} currentPage={page.current_page} fetchData={fetchData} />
        )}
      </div>
    )
  }
}
