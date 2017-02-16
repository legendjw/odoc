import React, { PropTypes } from 'react'

/**
 * 主框架菜单项组件
 */
export default class MenuItem extends React.Component {
  static propTypes = {
    menu: PropTypes.object.isRequired
  }

  handleClick (e) {
    const { menu } = this.props

    e.preventDefault()

    this.props.addTab({
      id: menu.id,
      name: menu.name,
      url: menu.url,
      active: true
    })
  }

  render () {
    const { menu } = this.props

    return <a className="item" href={menu.url} onClick={(e) => this.handleClick(e)}>{menu.name}</a>
  }
}
