import { type LoadSurveys } from '@/domain/usecases/survey/load-surveys'
import { type SurveyModel } from '@/domain/models/survey'
import { mockSurveysModel } from '@/domain/test'

export const mockLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return await new Promise((resolve, reject) => { resolve(mockSurveysModel()) })
    }
  }
  return new LoadSurveysStub()
}
