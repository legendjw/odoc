import React, { PropTypes } from 'react'
import FormHeader from './FormHeader'
import FormFields from './FormFields'

/**
 * 表单组件
 */
export default class Form extends React.Component {
  static propTypes = {
    object: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired
  }

  componentDidMount() {
    const { actions } = this.props
    actions.openNew()
  }

  /**
   * 如果表单数据存在则说明之前渲染过，不再重新渲染
   */
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.form ? false : true
  }

  /**
   * 根据指定数量对数据进行分组的数组
   */
  getGroupFields(attributes, eachGroupNumber) {
    var fields = []
    var oneContainer = []
    var moreContainer = []

    let groupMore = (length) => {
      if (moreContainer.length >= length) {
        fields.push(moreContainer)
        moreContainer = []
      }
    }

    let groupOne = () => {
      if (oneContainer.length >= 1 && moreContainer.length === 0) {
        oneContainer.forEach(one => {
          fields.push(one)
        })
        oneContainer = []
      }
    }

    attributes.forEach(attribute => {
      if (attribute.type.separateLine) {
        oneContainer.push(attribute)
      }
      else {
        moreContainer.push(attribute)
      }

      groupMore(eachGroupNumber)
      groupOne()
    })

    groupMore(1)
    groupOne()

    return fields
  }

  renderContent() {
    const { form } = this.props
    const { eachLineFieldNumber = 2 } = form

    let formContent = []

    form.attributes.forEach((category) => {
      formContent.push(<FormHeader key={'form_header_' + category.id} category={category} />)

      const groupFields = this.getGroupFields(category.attributes, eachLineFieldNumber)

      groupFields.forEach((attributes) => {
        formContent.push(<FormFields eachLineFieldNumber={eachLineFieldNumber} attributes={attributes} />)
      })
    })
    return formContent
  }

  render () {
    const { object, form, actions } = this.props
    const formContent = this.renderContent()

    return (
      <form className="ui small form" action={object.path} method="POST">
        {formContent}
      </form>
    )
  }
}
