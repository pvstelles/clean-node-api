import MockDate from 'mockdate'
import { type SurveyResultModel } from '@/domain/models/survey-result'
import { type SaveSurveyResultModel } from '@/domain/usecases/save-survey-result'
import { type SaveSurveyResultRepository } from '@/data/protocols/db/survey/save-survey-result-repository'
import { DbSaveSurveyResult } from '@/data/usecases/save-survey-result/db-save-survey-result'

const makeFakeSurveyResultData = (): SaveSurveyResultModel => {
  return {
    account_id: 'any_account_id',
    survey_id: 'any_survey_id',
    answer: 'any_answer',
    date: new Date()
  }
}

const makeFakeSurveyResult = (): SurveyResultModel => Object.assign({}, makeFakeSurveyResultData(), { id: 'any_id' })

const makeSaveSurveyResultModel = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
      await new Promise(resolve => { resolve(null) })
      return makeFakeSurveyResult()
    }
  }
  return new SaveSurveyResultRepositoryStub()
}

type SutTypes = {
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository
  sut: DbSaveSurveyResult
}

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = makeSaveSurveyResultModel()
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub)
  return {
    sut, saveSurveyResultRepositoryStub
  }
}

describe('DbSaveSurveyResult UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('Should call SaveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save')
    const surveyResultData = makeFakeSurveyResultData()
    await sut.save(surveyResultData)
    expect(saveSpy).toHaveBeenCalledWith(surveyResultData)
  })
  test('Should throw if SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.save(makeFakeSurveyResult())
    await expect(promise).rejects.toThrow()
  })

  test('Should return Survey on success', async () => {
    const { sut } = makeSut()
    const surveyResult = await sut.save(makeFakeSurveyResultData())
    expect(surveyResult).toEqual(makeFakeSurveyResult())
  })
})
