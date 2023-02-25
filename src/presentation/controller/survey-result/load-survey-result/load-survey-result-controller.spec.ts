import {
  LoadSurveyResultController
} from '@/presentation/controller/survey-result/load-survey-result/load-survey-result-controller'
import { type HttpRequest } from '@/presentation/protocols'
import { mockLoadSurveyByIdRepositoryStub } from '@/data/test'
import { type LoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_survey_id'
  }
})
type SutTypes = {
  sut: LoadSurveyResultController
  loadSurveyByIdStub: LoadSurveyById
}
const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = mockLoadSurveyByIdRepositoryStub()
  const sut = new LoadSurveyResultController(loadSurveyByIdStub)
  return { loadSurveyByIdStub, sut }
}
describe('LoadSurveyResultController', () => {
  test('Should call LoadSurveyById with correct value', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
    await sut.handle(makeFakeRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id')
  })
})
