import { ValidationComposite } from './validation-composite'
import { MissingParamError } from '../../errors'
import { type Validation } from './validation'

interface SutTypes {
  sut: ValidationComposite
  validationStub: Validation
}
const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}
const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const sut = new ValidationComposite([validationStub])
  return {
    validationStub,
    sut
  }
}
describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('any_field'))
  })
})
