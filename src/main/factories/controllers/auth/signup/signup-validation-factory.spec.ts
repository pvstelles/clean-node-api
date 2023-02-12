import { makeSignUpValidation } from './signup-validation-factory'
import { ValidationComposite, RequiredFieldValidation, CompareFieldsValidation, EmailValidation } from '@/validation/validators'
import { type Validation, type EmailValidator } from '@/validation/protocols'

jest.mock('../../../../../validation/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}
describe('SignUpValidation Factory', () => {
  test('Should call ValidateComposite with all validations ', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
