import { addSurveyParamsSchema } from '@/main/docs/schemas/add-survey-params-schema'
import { accountSchema } from '@/main/docs/schemas/account-schema'
import { loginParamsSchema } from '@/main/docs/schemas/login-params-schema'
import { signupParamsSchema } from '@/main/docs/schemas/signup-params-schema'
import { errorSchema } from '@/main/docs/schemas/error-schema'
import { serverErrorSchema } from '@/main/docs/schemas/server-error-schema'
import { unauthorizedSchema } from '@/main/docs/schemas/unauthorized'
import { notFoundSchema } from '@/main/docs/schemas/not-found-schema'
import { surveysSchema } from '@/main/docs/schemas/surveys-schema'
import { surveySchema } from '@/main/docs/schemas/survey-schema'
import { surveyAnswerSchema } from '@/main/docs/schemas/survey-answer-schema'
import { saveSurveyParamsSchema } from '@/main/docs/schemas/save-survey-params-schema'
import { surveyResultSchema } from '@/main/docs/schemas/survey-result-schema'
import { surveyResultAnswerSchema } from '@/main/docs/schemas/survey-result-answer-schema'

export default {
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
  surveyResult: surveyResultSchema,
  surveyResultAnswer: surveyResultAnswerSchema
}
