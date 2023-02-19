import { type SaveSurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result-repository'
import { type SurveyResultModel } from '@/domain/models/survey-result'
import { type SaveSurveyResultParams } from '@/domain/usecases/survey/save-survey-result'

export class DbSaveSurveyResult implements SaveSurveyResultRepository {
  constructor (
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository
  ) {}

  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    const survey = await this.saveSurveyResultRepository.save(data)
    return survey
  }
}
