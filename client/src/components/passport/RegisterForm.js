import React from 'react'
import BaseForm from '../common/base/Form'
import '../../static/css/register.css'

export default class RegisterForm extends BaseForm {
  get rules() {
    return {
      //'organization-name': [
      //  {
      //    validator: 'presence',
      //    message: '请输入组织名称'
      //  }
      //],
      //'user-mobile': [
      //  {
      //    validator: 'presence',
      //    message: '请输入手机号'
      //  }
      //],
      //'user-email': [
      //  {
      //    validator: 'presence',
      //    message: '请输入邮箱'
      //  },
      //  {
      //    validator: 'email',
      //    message: '请输入正确的邮箱'
      //  }
      //],
      //'user-name': [
      //  {
      //    validator: 'presence',
      //    message: '请输入您的名字'
      //  }
      //],
      //'user-password': [
      //  {
      //    validator: 'presence',
      //    message: '请输入密码'
      //  },
      //  {
      //    validator: 'length',
      //    minimum: 6,
      //    message: '密码至少包含6个字符'
      //  }
      //]
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
  }

  render() {
    let buttonClass = 'ui fluid large teal submit button'
    let buttonName = '注册'
    if (this.state.status === 'fetching') {
      buttonClass += " loading"
    }
    else if (this.state.status === 'success') {
      buttonName = '注册成功'
    }
    return (
      <div className="register ui middle aligned center aligned grid">
        <div className="column">
          <h2 className="ui teal image header">
            <div className="content">
               对象云
            </div>
          </h2>
          <form id="register-form" className="ui large form" action="/signup.json" method="post">
            <div className="ui segment">
              <div className={this.state.errors.has('organization-name') ? 'field error' : 'field'}>
                <div className="ui input">
                  <input placeholder="组织名称，常用公司或者团队名称" type="text" name="organization[name]" id="organization-name" />
                </div>
              </div>
              <div className={this.state.errors.has('user-mobile') ? 'field error' : 'field'}>
                <div className="ui input">
                  <input placeholder="手机号" type="text" name="user[mobile]" id="user-mobile" />
                </div>
              </div>
              <div className={this.state.errors.has('user-email') ? 'field error' : 'field'}>
                <div className="ui input">
                  <input placeholder="邮箱" type="text" name="user[email]" id="user-email" />
                </div>
              </div>
              <div className={this.state.errors.has('user-name') ? 'field error' : 'field'}>
                <div className="ui input">
                  <input placeholder="您的名字" type="text" name="user[name]" id="user-name" />
                </div>
              </div>
              <div className={this.state.errors.has('user-password') ? 'field error' : 'field'}>
                <div className="ui input">
                  <input placeholder="密码，至少包含6个字符" type="password" name="user[password]" id="user-password" />
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
            已有对象云账号? <a href="/signin">直接登录</a>
          </div>
        </div>
      </div>
    )
  }
}
