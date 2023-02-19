import { type SaveSurveyResultParams } from '@/domain/usecases/survey/save-survey-result'
import { type SurveyResultModel } from '@/domain/models/survey-result'

export const mockSurveyResultData = (): SaveSurveyResultParams => {
  return {
    accountId: 'any_account_id',
    surveyId: 'any_survey_id',
    answer: 'any_answer',
    date: new Date()
  }
}
export const mockSurveyResultModel = (): SurveyResultModel => Object.assign({}, mockSurveyResultData(), { id: 'any_id' })
