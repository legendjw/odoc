import Form from '../form'

document.head.innerHTML = `
  <meta name="csrf-param" content="authenticity_token" />
  <meta name="csrf-token" content="zmdgGtse9+4zwndYYxKyD0Yv8ltVcQJhyDqh0xT2dvmsUh6gYXhTdlGefxEllGFtf00cgx5pb6StppiRl9LQWQ==" />
`

document.body.innerHTML = `
  <form class="form" id="test-form" action='/test'>
    <input type="input" name="username" id="username" />
    <input type="input" name="password" id="password" />
  </form>
`

const rules = {
  'username': [
    {
      validator: 'presence',
      message: '请输入手机号/邮箱'
    }
  ],
  'password': [
    {
      validator: 'presence',
      message: '请输入密码'
    }
  ]
}

const form = new Form('#test-form', {rules: rules})

describe('form api test', () => {
  it ('init form', () => {
    expect(document.querySelector('input[name="authenticity_token"]')).toBeInstanceOf(HTMLInputElement)
  })

  it('validate form', () => {
    expect(form.validate()).toBe(false)
    expect(form.errors.has('username')).toBe(true)

    document.getElementById('username').value = 'legendjw'
    document.getElementById('password').value = '123456'
    expect(form.validate()).toBe(true)
    expect(form.errors.size).toBe(0)
  })

  it('submit form', () => {
    expect(form.submit()).toBeInstanceOf(Promise)
  })
})
