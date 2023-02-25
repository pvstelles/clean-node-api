import { type AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import { type AddSurveyParams } from '@/domain/usecases/survey/add-survey'
import { type LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'
import { type SurveyModel } from '@/domain/models/survey'
import { mockSurveyModel, mockSurveysModel } from '@/domain/test/mock-survey'
import { type LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'
import { type LoadSurveyResultRepository } from '@/data/protocols/db/survey-result/load-survey-result-repository'
import { type SurveyResultModel } from '@/domain/models/survey-result'
import { mockSurveyResultModel } from '@/domain/test'

export const mockAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (surveyData: AddSurveyParams): Promise<void> {
      await new Promise(resolve => { resolve(null) })
    }
  }
  return new AddSurveyRepositoryStub()
}
export const mockLoadSurveyByIdRepositoryStub = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById (): Promise<SurveyModel> {
      return await new Promise((resolve) => { resolve(mockSurveyModel()) })
    }
  }
  return new LoadSurveyByIdRepositoryStub()
}
export const mockLoadSurveyRepositoryStub = (): LoadSurveysRepository => {
  class LoadSurveyRepositoryStub implements LoadSurveysRepository {
    async loadAll (): Promise<SurveyModel[]> {
      return await new Promise((resolve) => { resolve(mockSurveysModel()) })
    }
  }
  return new LoadSurveyRepositoryStub()
}

export const mockLoadSurveyResultRepository = (): LoadSurveyResultRepository => {
  class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
    async loadBySurveyId (surveyId: string): Promise<SurveyResultModel> {
      return await Promise.resolve(mockSurveyResultModel())
    }
  }
  return new LoadSurveyResultRepositoryStub()
}
