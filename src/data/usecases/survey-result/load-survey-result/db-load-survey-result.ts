import { type LoadSurveyResult } from '@/domain/usecases/survey/load-survey-result'
import { type LoadSurveyResultRepository } from '@/data/protocols/db/survey-result/load-survey-result-repository'
// import { type SurveyResultModel } from '@/domain/models/survey-result'

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor (
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository
  ) {
  }

  async load (surveyId: string): Promise<any> {
    await this.loadSurveyResultRepository.loadBySurveyId(surveyId)
    return null
  }
}
