import {
  type Controller,
  type HttpRequest,
  type HttpResponse,
  type LoadSurveyById
} from './save-survey-result-controller-protocols'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById
  ) {
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const survey = await this.loadSurveyById.loadById(httpRequest.params.survey_id)
      if (!survey) {
        return forbidden(new InvalidParamError('survey_id'))
      }
      return ok({})
    } catch (e) {
      return serverError(e)
    }
  }
}
