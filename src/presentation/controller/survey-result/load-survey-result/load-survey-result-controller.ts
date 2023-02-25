import { type Controller, type HttpRequest, type HttpResponse } from '@/presentation/protocols'
import { ok } from '@/presentation/helpers/http/http-helper'
import { type LoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id'

export class LoadSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById
  ) {
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadSurveyById.loadById(httpRequest.params.surveyId)
    return await Promise.resolve(ok(''))
  }
}
