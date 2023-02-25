import { type SurveyModel } from '@/domain/models/survey'
import { type AddSurveyParams } from '@/domain/usecases/survey/add-survey'

export const mockSurveyModel = (): SurveyModel => ({
  id: 'any_id',
  question: 'any_question',
  answers: [
    { image: 'any_image', answer: 'any_answer1' },
    { image: 'any_image', answer: 'any_answer2' }
  ],
  date: new Date()
})
export const mockSurveysModel = (): SurveyModel[] => ([
  {
    id: 'any_id',
    question: 'any_question',
    answers: [
      { image: 'any_image', answer: 'any_answer' }
    ],
    date: new Date()
  },
  {
    id: 'other_id',
    question: 'other_question',
    answers: [
      { image: 'other_image', answer: 'other_answer' }
    ],
    date: new Date()
  }
])
export const mockAddSurveyData = (): AddSurveyParams => {
  return {
    question: 'any_question',
    answers: [
      { image: 'any_image', answer: 'any_answer' },
      { image: 'any_image_two', answer: 'any_answer_two' }
    ],
    date: new Date()
  }
}
