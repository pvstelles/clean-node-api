import { type LoadSurveyResult } from '@/domain/usecases/survey/load-survey-result'
import { type SurveyResultModel } from '@/domain/models/survey-result'
import { mockSurveyResultModel } from '@/domain/test'

export const mockLoadSurveyResult = (): LoadSurveyResult => {
  class LoadSurveyResultStub implements LoadSurveyResult {
    async load (surveyId: string): Promise<SurveyResultModel> {
      return await Promise.resolve(mockSurveyResultModel())
    }
  }
  return new LoadSurveyResultStub()
}
