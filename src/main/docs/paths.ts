import { loginPath } from '@/main/docs/paths/login-path'
import { signupPath } from '@/main/docs/paths/signup-path'
import { surveysPath } from '@/main/docs/paths/surveys-path'
import { surveyResultsPath } from '@/main/docs/paths/survey-results-path'

export default {
  '/login': loginPath,
  '/signup': signupPath,
  '/surveys': surveysPath,
  '/surveys/{surveyId}/results': surveyResultsPath
}
