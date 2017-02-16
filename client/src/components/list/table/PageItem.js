import React, { PropTypes } from 'react'

/**
 * list table page item
 */
export default class PageItem extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    currentPage: PropTypes.number.isRequired,
    fetchData: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (e) {
    e.preventDefault()

    const {item, fetchData } = this.props
    fetchData(item.url)
  }

  render () {
    const { item, currentPage } = this.props
    const active = item.name === currentPage ? 'active' : ''

    return (
      <a className={'item ' + active} href={item.url} onClick={this.handleClick}>{item.name}</a>
    )
  }
}
