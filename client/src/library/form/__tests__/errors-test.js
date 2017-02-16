import Errors from '../errors'

let errorMap = new Map([
  ['name', ['用户名不能为空', '用户名必须是正确邮箱']],
  ['password', ['密码不能为空']]
])
const errors = new Errors(errorMap)

describe('Errors api test', () => {
  it('get messages', () => {
    expect(errors.messages).toBe(errorMap)
  })

  it('get fullMessages', () => {
    expect(errors.fullMessages).toEqual(['用户名不能为空', '用户名必须是正确邮箱', '密码不能为空'])
  })

  it ('has', () => {
    expect(errors.has('name')).toBe(true)
    expect(errors.has('error')).toBe(false)
  })

  it ('get', () => {
    expect(errors.get('name')).toEqual(['用户名不能为空', '用户名必须是正确邮箱'])
  })

  it('size', () => {
    expect(errors.size).toBe(3)
  })

  it('add', () => {
    let message = '用户名必须是电话'
    expect(errors.add('name', message).get('name')).toContain(message)
    expect(errors.add('email', message).has('email')).toBe(true)
  })

  it('delete', () => {
    expect(errors.delete('name').has('name')).toBe(false)
  })

  it('clear', () => {
    expect(errors.clear().messages.size).toBe(0)
  })
})
