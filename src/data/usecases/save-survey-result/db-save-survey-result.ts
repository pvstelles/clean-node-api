import { type SaveSurveyResultRepository } from '@/data/protocols/db/survey/save-survey-result-repository'
import { type SurveyResultModel } from '@/domain/models/survey-result'
import { type SaveSurveyResultModel } from '@/domain/usecases/save-survey-result'

export class DbSaveSurveyResult implements SaveSurveyResultRepository {
  constructor (
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository
  ) {}

  async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    await this.saveSurveyResultRepository.save(data)
    return { account_id: '', answers: '', date: new Date(), id: '', survey_id: '' }
  }
}
