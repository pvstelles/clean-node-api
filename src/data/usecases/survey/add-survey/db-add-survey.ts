import { type AddSurvey, type AddSurveyParams } from '@/domain/usecases/survey/add-survey'
import { type AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'

export class DbAddSurvey implements AddSurvey {
  constructor (private readonly addSurveyRepository: AddSurveyRepository) {
  }

  async add (addSurveyModel: AddSurveyParams): Promise<void> {
    await this.addSurveyRepository.add(addSurveyModel)
  }
}
