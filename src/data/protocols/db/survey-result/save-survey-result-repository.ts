import { type SurveyResultModel } from '@/domain/models/survey-result'
import { type SaveSurveyResultParams } from '@/domain/usecases/survey/save-survey-result'

export interface SaveSurveyResultRepository {
  save: (data: SaveSurveyResultParams) => Promise<SurveyResultModel>
}
