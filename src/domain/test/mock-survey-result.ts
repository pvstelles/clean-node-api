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
  surveyId: 'any_id',
  question: 'any_question',
  date: new Date(),
  answers: [
    {
      answer: 'any_answer1',
      image: 'any_image',
      count: 0,
      percent: 0
    },
    {
      answer: 'any_answer2',
      image: 'any_image',
      count: 0,
      percent: 0
    }
  ]
})
