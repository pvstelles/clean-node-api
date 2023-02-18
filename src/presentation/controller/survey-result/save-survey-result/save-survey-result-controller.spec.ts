import { SaveSurveyResultController } from './save-survey-result-controller'
import { type HttpRequest, type SurveyModel, type LoadSurveyById } from './save-survey-result-controller-protocols'

const makeFakeSurvey = (): SurveyModel => ({
  id: 'any_id',
  question: 'any_question',
  answers: [
    { image: 'any_image', answer: 'any_answer' }
  ],
  date: new Date()
})
const makeFakeRequest = (): HttpRequest => {
  return {
    params: {
      survey_id: 'any_survey_id'
    }
  }
}

const makeLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById (id: string): Promise<SurveyModel> {
      return await new Promise((resolve, reject) => { resolve(makeFakeSurvey()) })
    }
  }
  return new LoadSurveyByIdStub()
}
type SutType = {
  sut: SaveSurveyResultController
  loadSurveyByIdStub: LoadSurveyById
}
const makeSut = (): SutType => {
  const loadSurveyByIdStub = makeLoadSurveyById()
  const sut = new SaveSurveyResultController(loadSurveyByIdStub)
  return {
    sut,
    loadSurveyByIdStub
  }
}

describe('Save Survey Result Controller', () => {
  test('Should call LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
    await sut.handle(makeFakeRequest())
    expect(loadByIdSpy).toBeCalledWith('any_survey_id')
  })
})
