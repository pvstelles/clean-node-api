import { type Controller, type HttpRequest, type HttpResponse } from '../../protocols'
import { type Validation } from '../../../validation/protocols'
import { badRequest } from '../../helpers/http/http-helper'

export class AddSurveyController implements Controller {
  constructor (private readonly validation: Validation) {
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }
    await new Promise(resolve => {
      resolve(null)
    })
    return { body: {}, statusCode: 200 }
  }
}
