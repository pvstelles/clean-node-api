import { type Controller, type HttpRequest, type HttpResponse } from '../../protocols'
import { type Validation } from '../../../validation/protocols'

export class AddSurveyController implements Controller {
  constructor (private readonly validation: Validation) {
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httpRequest.body)
    await new Promise(resolve => {
      resolve(null)
    })
    return { body: {}, statusCode: 200 }
  }
}
