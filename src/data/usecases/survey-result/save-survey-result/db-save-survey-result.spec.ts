import MockDate from 'mockdate'
import { type SaveSurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result-repository'
import { DbSaveSurveyResult } from '@/data/usecases/survey-result/save-survey-result/db-save-survey-result'
import { throwError } from '@/domain/test'
import { mockSurveyResultData } from '@/domain/test/mock-survey-result'
import { mockSaveSurveyResultRepository } from '@/data/test/mock-db-survey-result'
import { type LoadSurveyResultRepository } from '@/data/protocols/db/survey-result/load-survey-result-repository'
import { mockLoadSurveyResultRepository } from '@/data/test'

type SutTypes = {
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository
  loadSurveyResultRepositoryStub: LoadSurveyResultRepository
  sut: DbSaveSurveyResult
}

const makeSut = (): SutTypes => {
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository()
  const saveSurveyResultRepositoryStub = mockSaveSurveyResultRepository()
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub, loadSurveyResultRepositoryStub)
  return { sut, saveSurveyResultRepositoryStub, loadSurveyResultRepositoryStub }
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
    const surveyResultData = mockSurveyResultData()
    await sut.save(surveyResultData)
    expect(saveSpy).toHaveBeenCalledWith(surveyResultData)
  })
  test('Should throw if SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockImplementationOnce(throwError)
    const promise = sut.save(mockSurveyResultData())
    await expect(promise).rejects.toThrow()
  })
  test('Should call LoadSurveyResultRepository with correct values', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    const loadBySurveyIdSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
    const surveyResultData = mockSurveyResultData()
    await sut.save(surveyResultData)
    expect(loadBySurveyIdSpy).toHaveBeenCalledWith(surveyResultData.surveyId)
  })
  test('Should return Survey on success', async () => {
    const { sut } = makeSut()
    await sut.save(mockSurveyResultData())
  })
  test('Should throw if LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockImplementationOnce(throwError)
    const promise = sut.save(mockSurveyResultData())
    await expect(promise).rejects.toThrow()
  })
})
