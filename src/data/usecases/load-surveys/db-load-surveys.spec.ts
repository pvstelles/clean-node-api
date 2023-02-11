import { type LoadSurveysRepository } from '../../protocols/db/survey/load-surveys-repository'
import { type SurveyModel } from '../../../domain/models/survey'
import { DbLoadSurveys } from './db-load-surveys'

const makeFakeSurveys = (): SurveyModel[] => ([
  {
    id: 'any_id',
    question: 'any_question',
    answers: [
      { image: 'any_image', answer: 'any_answer' }
    ],
    date: new Date()
  },
  {
    id: 'other_id',
    question: 'other_question',
    answers: [
      { image: 'other_image', answer: 'other_answer' }
    ],
    date: new Date()
  }
]
)

const makeLoadSurveyRepositoryStub = (): LoadSurveysRepository => {
  class LoadSurveyRepositoryStub implements LoadSurveysRepository {
    async loadAll (): Promise<SurveyModel[]> {
      return await new Promise((resolve) => { resolve(makeFakeSurveys()) })
    }
  }
  return new LoadSurveyRepositoryStub()
}

interface SutyTypes {
  sut: DbLoadSurveys
  loadSurveyRepositoryStub: LoadSurveysRepository
}

const makeSut = (): SutyTypes => {
  const loadSurveyRepositoryStub = makeLoadSurveyRepositoryStub()
  const sut = new DbLoadSurveys(loadSurveyRepositoryStub)
  return {
    sut,
    loadSurveyRepositoryStub
  }
}

describe('DbLoadSurveys', () => {
  test('Should call LoadSurveysRepository', async () => {
    const { sut, loadSurveyRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadSurveyRepositoryStub, 'loadAll')
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })
})
