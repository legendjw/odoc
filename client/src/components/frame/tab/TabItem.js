import React, { PropTypes } from 'react'

/**
 * 标签菜单项组件
 */
export default class TabItem extends React.Component {
  static propTypes = {
    tab: PropTypes.object.isRequired,
    setTabActive: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.handleDoubleClick = this.handleDoubleClick.bind(this)
    this.handleRemoveClick = this.handleRemoveClick.bind(this)
  }

  handleClick (e) {
    e.preventDefault()
    const { tab } = this.props

    if (!tab.active) {
      this.props.setTabActive(tab)
    }
  }

  handleDoubleClick(e) {
    e.preventDefault()
    const { tab } = this.props

    const frame = document.getElementById('frame-' + tab.id)
    frame.src = frame.src
  }

  handleRemoveClick (e) {
    e.preventDefault()
    e.stopPropagation()

    this.props.removeTab(this.props.tab)
  }

  render () {
    const { tab } = this.props
    const className = tab.hasOwnProperty('active') && tab.active === true ? 'item active' : 'item'
    console.log(tab)

    return (
      <a className={className} onClick={this.handleClick} onDoubleClick={this.handleDoubleClick}>
        {tab.name}
        &nbsp;&nbsp;<i className="remove icon" title="关闭窗口" onClick={this.handleRemoveClick}></i>
      </a>
    )
  }
}
