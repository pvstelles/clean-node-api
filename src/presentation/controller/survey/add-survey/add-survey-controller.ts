import { type Controller, type HttpRequest, type HttpResponse } from '@/presentation/protocols'
import { type Validation } from '@/validation/protocols'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http/http-helper'
import { type AddSurvey } from '@/domain/usecases/survey/add-survey'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey
  ) {
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { question, answers } = httpRequest.body
      await this.addSurvey.add({ question, answers, date: new Date() })
      return noContent()
    } catch (e) {
      return serverError(e)
    }
  }
}
