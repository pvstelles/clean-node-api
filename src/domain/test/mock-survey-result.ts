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
export const mockSurveyResultModel = (): SurveyResultModel => ({
  surveyId: 'any_survey_id',
  question: 'any_question',
  date: new Date(),
  answers: [
    {
      answer: 'any_answer',
      count: 1,
      percent: 50
    },
    {
      answer: 'other_answer',
      image: 'any_image',
      count: 1,
      percent: 50
    }
  ]
})
