import { type HttpRequest, type Validation } from './add-survey-controller-protocols'
import { AddSurveyController } from './add-survey-controller'

const makeFakeRequest = (): HttpRequest => {
  return {
    body: {
      question: 'any_question',
      answers: [{
        image: 'any_image',
        answer: 'any_answer'
      }]
    }
  }
}
describe('Add Survey Controller', () => {
  test('Should call Validation with correct values', async () => {
    class ValidationStub implements Validation {
      validate (input: any): Error | null {
        return null
      }
    }
    const validationStub = new ValidationStub()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const sut = new AddSurveyController(validationStub)
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
