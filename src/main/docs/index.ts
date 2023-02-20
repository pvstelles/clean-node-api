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
import { forbidden } from '@/main/docs/components/forbidden'
import { surveysSchema } from '@/main/docs/schemas/surveys-schema'
import { surveySchema } from '@/main/docs/schemas/survey-schema'
import { surveyAnswerSchema } from '@/main/docs/schemas/survey-answer-schema'
import { surveysPath } from '@/main/docs/paths/surveys-path'
import { apiKeyAuthSchema } from '@/main/docs/schemas/api-key-auth-schema'
import { signupParamsSchema } from '@/main/docs/schemas/signup-params-schema'
import { signupPath } from '@/main/docs/paths/signup-path'
import { addSurveyParamsSchema } from '@/main/docs/schemas/add-survey-params-schema'
import { surveyResultsPath } from '@/main/docs/paths/survey-results-path'
import { saveSurveyParamsSchema } from '@/main/docs/schemas/save-survey-params-schema'
import { surveyResultSchema } from '@/main/docs/schemas/survey-result-schema'

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
  tags: [{ name: 'Login' }, { name: 'Enquete' }],
  paths: {
    '/login': loginPath,
    '/signup': signupPath,
    '/surveys': surveysPath,
    '/surveys/{surveyId}/results': surveyResultsPath
  },
  schemas: {
    addSurveyParams: addSurveyParamsSchema,
    account: accountSchema,
    loginParams: loginParamsSchema,
    signupParams: signupParamsSchema,
    error: errorSchema,
    serverError: serverErrorSchema,
    unauthorized: unauthorizedSchema,
    notFound: notFoundSchema,
    surveys: surveysSchema,
    survey: surveySchema,
    surveyAnswer: surveyAnswerSchema,
    saveSurveyParams: saveSurveyParamsSchema,
    surveyResult: surveyResultSchema
  },
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema
    },
    badRequest,
    serverError,
    unauthorized,
    notFound,
    forbidden
  }
}
