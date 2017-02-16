import React, { PropTypes } from 'react'
import BaseForm from '../common/base/Form'
import '../../static/css/login.css'

/**
 * 登录表单
 */
export default class LoginForm extends BaseForm {
  get rules() {
    return {
      'session-username': [
        {
          validator: 'presence',
          message: '请输入手机号/邮箱'
        }
      ],
      'session-password': [
        {
          validator: 'presence',
          message: '请输入密码'
        }
      ]
    }
  }

  onRequestSuccess(response) {
    if (response.status === 201) {
      this.setState({status: 'success'})
      const location = response.headers.get('Location')
      if (location) window.location.href = location
    }
    else {
      this.setState({status: 'error'})

    }
   // if (json.status == 1) {
   //   this.setState({status: 'success'})
   //   window.location.href = json.url
   // }
   // else {
   //   this.setState({status: 'error'})
   //   this._form.errors.add('username-password', json.message)
   //   this.setState({errors: this._form.errors})
   // }
  }

  render () {
    let buttonClass = 'ui fluid large teal submit button'
    let buttonName = '登录'
    if (this.state.status === 'fetching') {
      buttonClass += " loading"
    }
    else if (this.state.status === 'success') {
      buttonName = '登录成功'
    }

    return (
      <div className="login ui middle aligned center aligned grid">
        <div className="column">
          <h2 className="ui teal image header">
            <div className="content">
               对象云
            </div>
          </h2>
          <form id="login-form" className="ui large form" action="/sessions.json" method="post">
            <div className="ui stacked segment">
              <div className={this.state.errors.messages.has('session-username') ? 'field error' : 'field'}>
                <div className="ui left icon input">
                  <i className="user icon"></i>
                  <input placeholder="手机号/邮箱" type="text" name="session[username]" id="session-username" />
                </div>
              </div>
              <div className={this.state.errors.messages.has('session-password') ? 'field error' : 'field'}>
                <div className="ui left icon input">
                  <i className="lock icon"></i>
                  <input placeholder="密码" type="password" name="session[password]" id="session-password" />
                </div>
              </div>
              <div className={buttonClass} onClick={this.handleSubmit}>
                {buttonName}
              </div>
            </div>

            <div className="ui error message" style={{display: this.state.errors.messages.size === 0 ? 'none' : 'block'}}>
              <ul className="list">
                {this.state.errors.fullMessages.map((message, index) =>
                  <li key={index}>{message}</li>
                )}
              </ul>
            </div>
          </form>
          <div className="ui message">
            还没有对象云账号? <a href="/signup">注册</a>
          </div>
        </div>
      </div>
    )
  }
}
