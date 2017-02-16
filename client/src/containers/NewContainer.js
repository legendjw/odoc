import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ListActions from '../actions/list'
import * as NewActions from '../actions/new'
import Form from '../components/common/form/Form'

const Actions = Object.assign({}, ListActions, NewActions)

class NewContainer extends React.Component {
  static propTypes = {
    object: PropTypes.object.isRequired,
    newData: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }

  render() {
    const { object, newData, actions } = this.props

    return (
      <div id="new-container" style={{display: 'none'}}>
        {newData.form.attributes.length > 0 && <Form object={object} form={newData.form} actions={actions} />}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const realState = process.env.REACT_APP_RUN_MODE === 'all' ? state.page : state
  return {
    newData: realState.new,
    object: realState.object
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewContainer)
