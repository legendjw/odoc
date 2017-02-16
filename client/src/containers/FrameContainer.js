import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FrameMenu from '../components/frame/menu/Menu'
import FrameTab from '../components/frame/tab/Tab'
import * as FrameActions from '../actions/frame'
import '../static/css/frame.css'

const FrameContainer = ({menu, tab, actions}) => (
  <div className="ui fluid container">
    <FrameMenu menus={menu.items} isFetching={menu.isFetching} addTab={actions.addTab} fetchMenus={actions.fetchMenus} />
    <FrameTab tabs={tab.items} actions={actions} />
  </div>
)

FrameContainer.propTypes = {
  menu: PropTypes.object.isRequired,
  tab: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  const realState = process.env.REACT_APP_RUN_MODE === 'all' ? state.frame : state
  return {
    menu: realState.menu,
    tab: realState.tab
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(FrameActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FrameContainer)
