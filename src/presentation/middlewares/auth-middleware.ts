import { type Middleware } from '../protocols/middleware'
import { type HttpRequest, type HttpResponse } from '../protocols'
import { forbidden, ok } from '../helpers/http/http-helper'
import { AccessDeniedError } from '../errors/access-denied-error'
import { type LoadAccountByToken } from '../../domain/usecases/load-account-by-token'

export class AuthMiddleware implements Middleware {
  constructor (private readonly loadAccountByToken: LoadAccountByToken) {
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await new Promise(resolve => { resolve(null) })
    const accessToken = httpRequest.headers?.['x-access-token']
    if (accessToken) {
      const account = await this.loadAccountByToken.load(accessToken)
      if (account) {
        return ok({ accountId: account.id })
      }
    }
    return forbidden(new AccessDeniedError())
  }
}
