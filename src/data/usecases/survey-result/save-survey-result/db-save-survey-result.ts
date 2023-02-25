import { type SaveSurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result-repository'
import { type SaveSurveyResult, type SaveSurveyResultParams } from '@/domain/usecases/survey/save-survey-result'
import { type LoadSurveyResultRepository } from '@/data/protocols/db/survey-result/load-survey-result-repository'
import { type SurveyResultModel } from '@/domain/models/survey-result'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor (
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository,
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository
  ) {}

  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    await this.saveSurveyResultRepository.save(data)
    return await this.loadSurveyResultRepository.loadBySurveyId(data.surveyId)
  }
}
