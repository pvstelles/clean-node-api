import { loginPath } from './paths/login-path'
import { accountSchema } from '@/main/docs/schemas/account-schema'
import { loginParamsSchema } from '@/main/docs/schemas/login-params-schema'
import { errorSchema } from '@/main/docs/schemas/error-schema'
import { badRequest } from '@/main/docs/components/bad-request'
import { serverError } from '@/main/docs/components/server-error'
import { unauthorized } from '@/main/docs/components/unauthorized'
import { notFound } from '@/main/docs/components/not-found'
import { serverErrorSchema } from '@/main/docs/schemas/server-error-schema'
import { unauthorizedSchema } from '@/main/docs/schemas/unauthorized'
import { notFoundSchema } from '@/main/docs/schemas/not-found-schema'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node API',
    description: 'Api de Boilerplate',
    version: '1.0.0'
  },
  license: {
    name: 'GPL-3.0-or-later',
    url: 'https://spdx.org/licenses/GPL-3.0-or-later.html'
  },
  servers: [
    { url: '/api' }
  ],
  tags: [{
    name: 'Login'
  }],
  paths: {
    '/login': loginPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    error: errorSchema,
    serverError: serverErrorSchema,
    unauthorized: unauthorizedSchema,
    notFound: notFoundSchema
  },
  components: {
    badRequest,
    serverError,
    unauthorized,
    notFound
  }
}
