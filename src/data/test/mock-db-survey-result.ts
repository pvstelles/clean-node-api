import { type SaveSurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result-repository'
import { type SaveSurveyResultParams } from '@/domain/usecases/survey/save-survey-result'
import { mockSurveyResultModel } from '@/domain/test'

export const mockSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultParams): Promise<void> {
      await new Promise(resolve => { resolve(mockSurveyResultModel()) })
    }
  }
  return new SaveSurveyResultRepositoryStub()
}
