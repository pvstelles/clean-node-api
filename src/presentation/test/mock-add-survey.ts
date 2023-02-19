import { type AddSurvey, type AddSurveyParams } from '@/domain/usecases/survey/add-survey'

export const mockAddSurvey = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add (data: AddSurveyParams): Promise<void> {
      await new Promise(resolve => { resolve('') })
    }
  }
  return new AddSurveyStub()
}
