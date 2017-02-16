import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import URL from 'url-parse'
import * as ObjectActions from '../actions/common/object'
import * as ListActions from '../actions/list'
import * as NewActions from '../actions/new'
import Operation from '../components/list/operation/Operation'
import Search from '../components/list/search/Search'
import Filter from '../components/list/search/Filter'
import Table from '../components/list/table/Table'
import '../static/css/list.css'

const Actions = Object.assign({}, ObjectActions, ListActions, NewActions)

class ListContainer extends React.Component {
  static propTypes = {
    object: PropTypes.object.isRequired,
    list: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }

  componentDidMount() {
    const { actions } = this.props
    const currentUrl = new URL(window.location.href, true)
    const url = currentUrl.pathname.split('/')
    let fetchObjectUrl = ''
    let fetchDataUrl = ''

    if (url[1] == 'models') {
      fetchObjectUrl = `/models/${url[2]}/object.json`
      fetchDataUrl = `/models/${url[2]}.json`
    }
    else {
      fetchObjectUrl = `/${url[1]}/object.json`
      fetchDataUrl = `/${url[1]}.json`
    }

    actions.fetchObject(fetchObjectUrl).then(() => {
      return actions.fetchData(fetchDataUrl)
    })
  }

  render() {
    const { object, list, actions } = this.props
    const { data } = list
    const isFetching = object.isFetching || data.isFetching

    return (
      <div className="ui fluid container">
        <div id="operations-container">
          <Operation operations={object.operations ? object.operations : []} actions={actions} />
          <Search />
          <Filter />
        </div>
        <div id="table-container">
          <Table isFetching={isFetching} object={object} items={data.items} page={data.page} fetchData={actions.fetchData} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const realState = process.env.REACT_APP_RUN_MODE === 'all' ? state.page : state
  return {
    object: realState.object,
    list: realState.list
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListContainer)
