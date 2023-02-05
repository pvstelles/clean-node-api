import { type Controller, type HttpRequest, type HttpResponse } from '../../presentation/protocols'

export class LogControllerDecorator implements Controller {
  private readonly controller: Controller
  constructor (controller: Controller) {
    this.controller = controller
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse: HttpResponse = {
      statusCode: 200,
      body: {
        name: 'teste'
      }
    }
    await this.controller.handle(httpRequest)
    return httpResponse
  }
}
