import Validator from '../validators/validator'
import * as validators from '../validators'
import isNumeric from 'validator/lib/isNumeric'

document.body.innerHTML = `
  <form class="form" id="test-form" action='/test'>
    <input type="input" name="username" id="username" />
    <input type="input" name="password" id="password" />
  </form>
`

describe('Validators test', () => {
  const selector = 'username'
  const element = document.querySelector('#username')

  it('test Validator api', () => {
    const validator = new Validator(selector)
    expect(validator.element).toEqual(element)
    expect(validator.value).toEqual(element.value)
  })

  it('test PresenceValidator', () => {
    const validator = new validators['PresenceValidator'](selector)
    expect(validator.validate()).toBe(false)
    element.value = 'admin'
    expect(validator.validate()).toBe(true)
  })

  it('test EmailValidator', () => {
    const validator = new validators['EmailValidator'](selector)
    element.value = 'error email'
    expect(validator.validate()).toBe(false)
    element.value = 'admin@duixiangyun.com'
    expect(validator.validate()).toBe(true)
  })

  it('test LengthValidator', () => {
    let validator
    validator = new validators['LengthValidator'](selector)
    expect(validator.validate()).toBe(false)

    validator = new validators['LengthValidator'](selector, {minimum: 5})
    element.value = '12345'
    expect(validator.validate()).toBe(true)
    element.value = '1234'
    expect(validator.validate()).toBe(false)

    validator = new validators['LengthValidator'](selector, {maxmum: 5})
    element.value = '12345'
    expect(validator.validate()).toBe(true)
    element.value = '123456'
    expect(validator.validate()).toBe(false)

    validator = new validators['LengthValidator'](selector, {in: [2, 5]})
    element.value = '1'
    expect(validator.validate()).toBe(false)
    element.value = '12'
    expect(validator.validate()).toBe(true)
    element.value = '123456'
    expect(validator.validate()).toBe(false)

    validator = new validators['LengthValidator'](selector, {is: 5})
    element.value = '12345'
    expect(validator.validate()).toBe(true)
    element.value = '123'
    expect(validator.validate()).toBe(false)
  })

  it('test NumericalityValidator', () => {
    let validator
    validator = new validators['NumericalityValidator'](selector)
    expect(validator.validate()).toBe(true)
    element.value = '0'
    expect(validator.validate()).toBe(true)
    element.value = '1234'
    expect(validator.validate()).toBe(true)
    element.value = '1234aaa'
    expect(validator.validate()).toBe(false)

    validator = new validators['NumericalityValidator'](selector, {greaterThan: 5})
    element.value = '6'
    expect(validator.validate()).toBe(true)
    element.value = '5'
    expect(validator.validate()).toBe(false)

    validator = new validators['NumericalityValidator'](selector, {greaterThanOrEqualTo: 5})
    element.value = '6'
    expect(validator.validate()).toBe(true)
    element.value = '5'
    expect(validator.validate()).toBe(true)
    element.value = '4'
    expect(validator.validate()).toBe(false)

    validator = new validators['NumericalityValidator'](selector, {equalTo: 5})
    element.value = '5'
    expect(validator.validate()).toBe(true)
    element.value = '1'
    expect(validator.validate()).toBe(false)

    validator = new validators['NumericalityValidator'](selector, {lessThan: 5})
    element.value = '4'
    expect(validator.validate()).toBe(true)
    element.value = '5'
    expect(validator.validate()).toBe(false)

    validator = new validators['NumericalityValidator'](selector, {lessThanOrEqualTo: 5})
    element.value = '4'
    expect(validator.validate()).toBe(true)
    element.value = '5'
    expect(validator.validate()).toBe(true)
    element.value = '6'
    expect(validator.validate()).toBe(false)

    validator = new validators['NumericalityValidator'](selector, {otherThan: 5})
    element.value = '4'
    expect(validator.validate()).toBe(true)
    element.value = '5'
    expect(validator.validate()).toBe(false)

    validator = new validators['NumericalityValidator'](selector, {odd: true})
    element.value = '1'
    expect(validator.validate()).toBe(true)
    element.value = '2'
    expect(validator.validate()).toBe(false)

    validator = new validators['NumericalityValidator'](selector, {even: true})
    element.value = '2'
    expect(validator.validate()).toBe(true)
    element.value = '1'
    expect(validator.validate()).toBe(false)

  })
})
