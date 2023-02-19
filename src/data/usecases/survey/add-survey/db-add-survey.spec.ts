import { DbAddSurvey } from './db-add-survey'
import { type AddSurveyParams } from '@/domain/usecases/survey/add-survey'
import { type AddSurveyRepository } from '../../../protocols/db/survey/add-survey-repository'
import MockDate from 'mockdate'

const makeSurveyData = (): AddSurveyParams => {
  return {
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }],
    date: new Date()
  }
}

type SutTypes = {
  addSurveyRepositoryStub: AddSurveyRepository
  sut: DbAddSurvey
}

const makeSut = (): SutTypes => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (surveyData: AddSurveyParams): Promise<void> {
      await new Promise(resolve => { resolve(null) })
    }
  }
  const addSurveyRepositoryStub = new AddSurveyRepositoryStub()
  const sut = new DbAddSurvey(addSurveyRepositoryStub)
  return {
    sut, addSurveyRepositoryStub
  }
}

describe('DbAddSurvey UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('Should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add')
    const surveyData = makeSurveyData()
    await sut.add(surveyData)
    expect(addSpy).toHaveBeenCalledWith(surveyData)
  })

  test('Should throw if AddSurveyRepository.add throws', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    jest.spyOn(addSurveyRepositoryStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.add(makeSurveyData())
    await expect(promise).rejects.toThrow()
  })
})
