import { type SurveyModel } from '@/domain/models/survey'

export interface LoadSurveysById {
  loadById: (id: string) => Promise<SurveyModel>
}
